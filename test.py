import requests, json, os, pathlib
from datetime import datetime, UTC
token = os.getenv("GH_TOKEN")
headers = {"Authorization": f"Bearer {token}"}
# ===============================
# 1. VISITOR COUNTER
# ===============================
visitor_file = pathlib.Path("api/visitors.json")
visitor_file.parent.mkdir(exist_ok=True)
visitors_data = {"count": 0, "last_visit": None}
if visitor_file.exists() and visitor_file.stat().st_size > 0:
    try:
        with open(visitor_file) as vf:
          visitors_data = json.load(vf)
    except json.JSONDecodeError:
        visitors_data = {"count": 0, "last_visit": None}
visitors_data["count"] = visitors_data.get("count", 0) + 1
visitors_data["last_visit"] = datetime.now(UTC).isoformat()
with open(visitor_file, "w") as f:
    json.dump(visitors_data, f, indent=2)

# ===============================
# 2. GITHUB STATS
# ===============================
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
r = requests.post("https://api.github.com/graphql", json={"query": query}, headers=headers).json()
commits = 0
if r.get("data") and r["data"]["viewer"]["contributionsCollection"]["contributionCalendar"].get("totalContributions") is not None:
    commits = r["data"]["viewer"]["contributionsCollection"]["contributionCalendar"]["totalContributions"]
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
with open("api/stats.json", "w") as f:
    json.dump(stats, f, indent=2)