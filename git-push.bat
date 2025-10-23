@echo off
REM Git automation script for Aflah website (Windows Batch)
REM Usage: git-push.bat "Your commit message here"

if "%~1"=="" (
    echo ❌ Error: Please provide a commit message
    echo Usage: git-push.bat "Your commit message here"
    exit /b 1
)

set COMMIT_MESSAGE=%~1

echo 🌿 Aflah Website Git Automation
echo ================================
echo 📝 Commit message: %COMMIT_MESSAGE%
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Not in aflah-website directory
    echo Please run this script from the aflah-website folder
    exit /b 1
)

REM Check git status
echo 📊 Checking git status...
git status --porcelain
if errorlevel 1 (
    echo ❌ Error: Git status check failed
    exit /b 1
)

REM Add all changes
echo.
echo 📁 Adding all changes...
git add .
if errorlevel 1 (
    echo ❌ Error: Failed to add files
    exit /b 1
)

REM Commit changes
echo.
echo 💾 Committing changes...
git commit -m "%COMMIT_MESSAGE%"
if errorlevel 1 (
    echo ❌ Error: Failed to commit
    exit /b 1
)

REM Push to GitHub
echo.
echo 🚀 Pushing to GitHub...
git push origin master
if errorlevel 1 (
    echo ❌ Error: Failed to push to GitHub
    exit /b 1
)

echo.
echo ✅ Success! Changes pushed to GitHub
echo 🔗 Repository: https://github.com/adnanulhasanseecs/aflahilc-website
echo 📋 Actions: https://github.com/adnanulhasanseecs/aflahilc-website/actions
echo.
echo ⏳ GitHub Actions will now run automatically...
echo 🌐 Website will be deployed to GitHub Pages
echo 🔗 Live URL: https://adnanulhasanseecs.github.io/aflahilc-website
echo 🎯 Custom Domain: https://aflah-ilc.com (after DNS propagation)
