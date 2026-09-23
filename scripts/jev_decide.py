import os
import json
import urllib.request

api_key = os.environ.get("OPENROUTER_API_KEY")
if not api_key:
    # Try reading from registry/user environment
    import winreg
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Environment") as key:
            api_key, _ = winreg.QueryValueEx(key, "OPENROUTER_API_KEY")
    except Exception:
        pass

if not api_key:
    print(json.dumps({"error": "No OPENROUTER_API_KEY found"}))
    exit(1)

body = {
    "model": "typesafe/jev-1.13",
    "state": "Build Batch 1 math curriculum topics 11 to 13 (Sequences, Quadratic function, Transformations) with Core-4 Bento, CKE authenticity, and Mafs plots",
    "questions": {
        "subagent_model": {
            "type": "choice",
            "instructions": "Pick cheapest model sufficient for this task complexity",
            "criteria": {
                "flash_lite": "Trivial: simple lookups, short reads, text formatting, one-line edits",
                "flash": "Standard: code edits, multi-file research, file operations, tests",
                "inherit": "Complex: architecture decisions, large refactors, multi-step planning",
                "pro": "Critical: deep reasoning, novel algorithms, security analysis, production bugs"
            }
        },
        "skill": {
            "type": "choice",
            "instructions": "Pick the single most relevant skill or none",
            "criteria": {
                "education-agent-skills": "Evidence-based pedagogical intelligence library, microlearning, worked examples, error diagnosis",
                "design-system-audit": "Audits visual design, design token consistency, layout spacing, color contrast",
                "none": "No specific skill needed"
            }
        }
    }
}

req = urllib.request.Request(
    "https://openrouter.ai/api/alpha/decisions",
    data=json.dumps(body).encode("utf-8"),
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
)

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print(json.dumps(res, indent=2))
except Exception as e:
    print(json.dumps({"error": str(e)}))
