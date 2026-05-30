$ErrorActionPreference = "Continue"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Pattern = 'https?://[^"''\)\]\s`]+'
$IgnoredPatterns = @(
  "YOUR_NAME",
  "api\.example\.com",
  "^https://api\.openai\.com$"
)

function Test-IgnoredUrl {
  param([string]$Url)
foreach ($pattern in $IgnoredPatterns) {
    if ($Url -match $pattern) {
      return $true
    }
  }
  return $false
}

$Urls = Get-ChildItem -LiteralPath $Root -Recurse -File |
  Where-Object {
    $_.FullName -notmatch "\\\.git\\" -and
    $_.FullName -notmatch "\\docs\\link-audit\.md$" -and
    $_.FullName -notmatch "\\scripts\\check-links\.ps1$"
  } |
  Select-String -Pattern $Pattern -AllMatches |
  ForEach-Object { $_.Matches.Value.TrimEnd(".", ",", ";", ":") } |
  Where-Object { -not (Test-IgnoredUrl $_) } |
  Sort-Object -Unique

$Results = foreach ($url in $Urls) {
  Start-Sleep -Milliseconds 250
  $status = $null
  $ok = $false
  $errorMessage = ""
  try {
    $response = Invoke-WebRequest -Uri $url -Method Head -MaximumRedirection 5 -TimeoutSec 20 -UseBasicParsing
    $status = [int]$response.StatusCode
    $ok = $status -ge 200 -and $status -lt 400
  } catch {
    try {
      $response = Invoke-WebRequest -Uri $url -Method Get -MaximumRedirection 5 -TimeoutSec 20 -UseBasicParsing
      $status = [int]$response.StatusCode
      $ok = $status -ge 200 -and $status -lt 400
    } catch {
      $errorMessage = $_.Exception.Message
      if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
        $status = [int]$_.Exception.Response.StatusCode
        if ($status -eq 429) {
          $ok = $true
          $errorMessage = "Rate limited; endpoint was not marked as broken."
        }
      }
    }
  }

  [pscustomobject]@{
    ok = $ok
    status = $status
    url = $url
    error = $errorMessage
  }
}

$Results | Sort-Object ok, status, url | Format-Table -AutoSize -Wrap
$Failed = @($Results | Where-Object { -not $_.ok })
Write-Output ""
Write-Output "TOTAL=$($Results.Count) FAILED=$($Failed.Count)"
if ($Failed.Count -gt 0) {
  exit 1
}
