import requests, json, os, pathlib
from datetime import datetime, UTC

# ===========================================
# Setup
# ===========================================
token = os.getenv("GH_TOKEN") or os.getenv("GITHUB_TOKEN")
headers = {"Authorization": f"Bearer {token}"} if token else {}

api_dir = pathlib.Path("api")
api_dir.mkdir(exist_ok=True)

# ===========================================
# 1. Visitor Counter
# ===========================================
visitor_file = api_dir / "visitors.json"
visitors = {"count": 0, "last_visit": None}

if visitor_file.exists() and visitor_file.stat().st_size > 0:
    try:
        with open(visitor_file) as vf:
            visitors = json.load(vf)
    except json.JSONDecodeError:
        visitors = {"count": 0, "last_visit": None}

visitors["count"] = visitors.get("count", 0) + 1
visitors["last_visit"] = datetime.now(UTC).isoformat()

with open(visitor_file, "w") as f:
    json.dump(visitors, f, indent=2)

# ===========================================
# 2. GitHub Stats Snapshot
# ===========================================
user = requests.get("https://api.github.com/users/imakshat47", headers=headers).json()
repos = requests.get("https://api.github.com/users/imakshat47/repos?per_page=100", headers=headers).json()
stars = sum(r.get("stargazers_count", 0) for r in repos if isinstance(r, dict))

query = """
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
commits = 0
if token:  # GraphQL requires authentication
    graphql = requests.post("https://api.github.com/graphql", json={"query": query}, headers=headers).json()
    try:
        commits = graphql["data"]["viewer"]["contributionsCollection"]["contributionCalendar"]["totalContributions"]
    except Exception:
        commits = 0

stats = {
    "public_repos": user.get("public_repos", 0),
    "stars": stars,
    "followers": user.get("followers", 0),
    "following": user.get("following", 0),
    "commits_this_year": commits,
    "location": user.get("location", ""),
    "company": user.get("company", ""),
    "blog": user.get("blog", ""),
    "bio": user.get("bio", ""),
    "last_updated": datetime.now(UTC).isoformat()
}

with open(api_dir / "stats.json", "w") as f:
    json.dump(stats, f, indent=2)

# ===========================================
# 3. Append to Stats History
# ===========================================
history_file = api_dir / "stats-history.json"
history = []

if history_file.exists() and history_file.stat().st_size > 0:
    try:
        with open(history_file) as hf:
            history = json.load(hf)
    except json.JSONDecodeError:
        history = []

snapshot = stats.copy()
snapshot["date"] = datetime.now(UTC).strftime("%Y-%m-%d")

# Avoid duplicate entries for same date
if not any(entry.get("date") == snapshot["date"] for entry in history):
    history.append(snapshot)

with open(history_file, "w") as f:
    json.dump(history, f, indent=2)

print("✅ Visitors, Stats, and History updated!")
