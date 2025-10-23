#!/bin/bash
# Git automation script for Aflah website
# Usage: ./git-push.sh "Your commit message here"

# Check if commit message is provided
if [ $# -eq 0 ]; then
    echo "❌ Error: Please provide a commit message"
    echo "Usage: ./git-push.sh \"Your commit message here\""
    exit 1
fi

COMMIT_MESSAGE="$1"

echo "🌿 Aflah Website Git Automation"
echo "================================"
echo "📝 Commit message: $COMMIT_MESSAGE"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in aflah-website directory"
    echo "Please run this script from the aflah-website folder"
    exit 1
fi

# Check git status
echo "📊 Checking git status..."
git status --porcelain

if [ $? -ne 0 ]; then
    echo "❌ Error: Git status check failed"
    exit 1
fi

# Add all changes
echo ""
echo "📁 Adding all changes..."
git add .

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to add files"
    exit 1
fi

# Commit changes
echo ""
echo "💾 Committing changes..."
git commit -m "$COMMIT_MESSAGE"

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to commit"
    exit 1
fi

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push origin master

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to push to GitHub"
    exit 1
fi

echo ""
echo "✅ Success! Changes pushed to GitHub"
echo "🔗 Repository: https://github.com/adnanulhasanseecs/aflahilc-website"
echo "📋 Actions: https://github.com/adnanulhasanseecs/aflahilc-website/actions"
echo ""
echo "⏳ GitHub Actions will now run automatically..."
echo "🌐 Website will be deployed to GitHub Pages"
echo "🔗 Live URL: https://adnanulhasanseecs.github.io/aflahilc-website"
echo "🎯 Custom Domain: https://aflah-ilc.com (after DNS propagation)"
