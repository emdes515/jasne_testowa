$key = $env:OPENROUTER_API_KEY
if (-not $key) {
    $key = [System.Environment]::GetEnvironmentVariable("OPENROUTER_API_KEY", "User")
}
if (-not $key) {
    $key = [System.Environment]::GetEnvironmentVariable("OPENROUTER_API_KEY", "Process")
}

$headers = @{
    "Authorization" = "Bearer $key"
    "Content-Type"  = "application/json"
}

$criteria = @{
    "education_agent_skills" = "Pedagogical intelligence, student error diagnosis, active recall"
    "dynamic_learning_ui"    = "Build dynamic learning interfaces, step-by-step scaffolds for EdTech"
    "none"                   = "No specific skill needed"
}

$body = @{
    model     = "typesafe/jev-1.13"
    state     = "Transform math curriculum to strict 5-task didactic matrix across all 21 topics: replace tasks with authentic CKE tasks, numeric inputs, and open proof/calc tasks from CKE database and json archives, then compile and test"
    questions = @{
        subagent_model = @{
            type         = "choice"
            instructions = "Pick cheapest model sufficient for this task complexity"
            criteria     = @{
                flash_lite = "Trivial: simple lookups, short reads, text formatting, one-line edits"
                flash      = "Standard: code edits, multi-file research, file operations, tests"
                inherit    = "Complex: architecture decisions, large refactors, multi-step planning"
                pro        = "Critical: deep reasoning, novel algorithms, security analysis, production bugs"
            }
        }
        skill = @{
            type         = "choice"
            instructions = "Pick the single most relevant skill or none"
            criteria     = $criteria
        }
    }
} | ConvertTo-Json -Depth 10 -Compress

try {
    $resp = Invoke-RestMethod -Uri "https://openrouter.ai/api/alpha/decisions" -Method POST -Headers $headers -Body $body
    $resp | ConvertTo-Json -Depth 5
} catch {
    Write-Output "ERROR: $($_.Exception.Message)"
}
