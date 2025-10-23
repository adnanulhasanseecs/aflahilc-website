# Git automation script for Aflah website (PowerShell)
# Usage: .\git-push.ps1 "Your commit message here"

param(
    [Parameter(Mandatory=$true)]
    [string]$CommitMessage
)

Write-Host "Aflah Website Git Automation" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "Commit message: $CommitMessage" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "Error: Not in aflah-website directory" -ForegroundColor Red
    Write-Host "Please run this script from the aflah-website folder" -ForegroundColor Yellow
    exit 1
}

# Check git status
Write-Host "Checking git status..." -ForegroundColor Blue
git status --porcelain

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Git status check failed" -ForegroundColor Red
    exit 1
}

# Add all changes
Write-Host ""
Write-Host "Adding all changes..." -ForegroundColor Blue
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to add files" -ForegroundColor Red
    exit 1
}

# Commit changes
Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Blue
git commit -m $CommitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to commit" -ForegroundColor Red
    exit 1
}

# Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Blue
git push origin master

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to push to GitHub" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Success! Changes pushed to GitHub" -ForegroundColor Green
Write-Host "Repository: https://github.com/adnanulhasanseecs/aflahilc-website" -ForegroundColor Cyan
Write-Host "Actions: https://github.com/adnanulhasanseecs/aflahilc-website/actions" -ForegroundColor Cyan
Write-Host ""
Write-Host "GitHub Actions will now run automatically..." -ForegroundColor Yellow
Write-Host "Website will be deployed to GitHub Pages" -ForegroundColor Yellow
Write-Host "Live URL: https://adnanulhasanseecs.github.io/aflahilc-website" -ForegroundColor Cyan
Write-Host "Custom Domain: https://aflah-ilc.com (after DNS propagation)" -ForegroundColor Cyan