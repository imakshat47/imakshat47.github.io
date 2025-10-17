import requests, json, os, pathlib
from datetime import datetime, UTC

# ================================================================
# ⚙️ Setup
# ================================================================
token = os.getenv("GH_TOKEN") or os.getenv("GITHUB_TOKEN")
headers = {"Authorization": f"Bearer {token}"} if token else {}
api_dir = pathlib.Path("api")
api_dir.mkdir(exist_ok=True)
print_log = []

def safe_load_json(file_path, default=None):
    """Safely load JSON file, return default on error."""
    if file_path.exists() and file_path.stat().st_size > 0:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            pass
    return default or {}

# ================================================================
# 👥 1. Visitor Counter
# ================================================================
visitor_file = api_dir / "visitors.json"
visitors = safe_load_json(visitor_file, {"count": 0, "last_visit": None})

visitors["count"] = visitors.get("count", 0) + 1
visitors["last_visit"] = datetime.now(UTC).isoformat()

with open(visitor_file, "w", encoding="utf-8") as f:
    json.dump(visitors, f, indent=2)
print_log.append("Visitor")

# ================================================================
# 📊 2. GitHub Stats Snapshot
# ================================================================
username = "imakshat47"

# --- REST API ---
user_data = requests.get(f"https://api.github.com/users/{username}", headers=headers).json()
repos_data = requests.get(f"https://api.github.com/users/{username}/repos?per_page=100", headers=headers).json()
stars = sum(r.get("stargazers_count", 0) for r in repos_data if isinstance(r, dict))

# --- GraphQL API for commit count ---
commits = 0
if token:
    graphql_query = {
        "query": """
        {
          viewer {
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
        """
    }
    try:
        gql = requests.post("https://api.github.com/graphql", json=graphql_query, headers=headers).json()
        commits = (
            gql.get("data", {})
               .get("viewer", {})
               .get("contributionsCollection", {})
               .get("contributionCalendar", {})
               .get("totalContributions", 0)
        )
    except Exception:
        commits = 0

# --- Create stats snapshot ---
stats = {
    "public_repos": user_data.get("public_repos", 0),
    "stars": stars,
    "followers": user_data.get("followers", 0),
    "following": user_data.get("following", 0),
    "commits_this_year": commits,
    "location": user_data.get("location", ""),
    "company": user_data.get("company", ""),
    "blog": user_data.get("blog", ""),
    "bio": user_data.get("bio", ""),
    "last_updated": datetime.now(UTC).isoformat(),
}

with open(api_dir / "stats.json", "w", encoding="utf-8") as f:
    json.dump(stats, f, indent=2)
print_log.append("Stats")

# ================================================================
# 📈 3. Weekly Stats History (7-day trend)
# ================================================================
history_file = api_dir / "stats-history.json"
history = safe_load_json(history_file, {})

# Determine weekday name (Mon–Sun)
weekday = datetime.now(UTC).strftime("%A")

# Save snapshot under weekday key
history[weekday] = {
    "date": datetime.now(UTC).strftime("%Y-%m-%d"),
    # "stars": stats["stars"],
    # "followers": stats["followers"],
    # "public_repos": stats["public_repos"],
    "commits_this_year": stats["commits_this_year"],
}

# Keep only 7 unique days (Mon–Sun)
if len(history) > 7:
    for key in list(history.keys())[:len(history) - 7]:
        history.pop(key)

with open(history_file, "w", encoding="utf-8") as f:
    json.dump(history, f, indent=2)
print_log.append("History")

# ================================================================
# 📄 4. Resume Auto-Update
# ================================================================
resume_dir = pathlib.Path("resume")
resume_dir.mkdir(exist_ok=True)
resume_list_file = resume_dir / "resume-list.json"

resumes = []
for file in sorted(resume_dir.glob("*.pdf")):
    resumes.append({
        "name": file.stem.replace("_", " ").title(),
        "file": file.name,
        "last_modified": datetime.fromtimestamp(file.stat().st_mtime, UTC).isoformat(),
    })

with open(resume_list_file, "w", encoding="utf-8") as f:
    json.dump(resumes, f, indent=2)
print_log.append("Resume")

# ================================================================
# ✅ Done
# ================================================================
print(f"✅ {' | '.join(print_log)} updated successfully!")
