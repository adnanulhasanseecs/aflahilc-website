# Git Automation Scripts

This directory contains automated scripts to make git operations easier for the Aflah website project.

## Available Scripts

### 1. PowerShell Script (Recommended for Windows)
```powershell
.\git-push.ps1 "Your commit message here"
```

### 2. Batch Script (Windows)
```cmd
git-push.bat "Your commit message here"
```

### 3. Bash Script (Linux/Mac)
```bash
./git-push.sh "Your commit message here"
```

## What These Scripts Do

1. **Check Directory**: Ensures you're in the correct project directory
2. **Show Status**: Displays current git status
3. **Add Changes**: Automatically adds all modified files
4. **Commit**: Commits changes with your provided message
5. **Push**: Pushes to GitHub master branch
6. **Show Results**: Displays success message and relevant URLs

## Usage Examples

```powershell
# Fix a bug
.\git-push.ps1 "Fix linting errors in social impact pages"

# Add new feature
.\git-push.ps1 "Add custom domain support for GitHub Pages"

# Update content
.\git-push.ps1 "Update testimonials and contact information"
```

## Benefits

- ✅ **One Command**: Single command to commit and push
- ✅ **Error Handling**: Checks for common issues
- ✅ **Visual Feedback**: Clear status messages
- ✅ **URLs**: Shows relevant GitHub and deployment URLs
- ✅ **Cross-Platform**: Works on Windows, Linux, and Mac

## After Running

Once you run any of these scripts:

1. **GitHub Actions** will automatically trigger
2. **Tests** will run (type check, linting, build)
3. **Deployment** will happen to GitHub Pages
4. **Website** will be live at: `https://adnanulhasanseecs.github.io/aflahilc-website`
5. **Custom Domain** will work at: `https://aflah-ilc.com` (after DNS propagation)

## Troubleshooting

- **"Not in aflah-website directory"**: Make sure you're in the project root folder
- **"Git status check failed"**: Check your git configuration
- **"Failed to push"**: Check your internet connection and GitHub access
