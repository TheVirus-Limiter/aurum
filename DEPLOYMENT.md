# GitHub Pages Deployment Guide for Aurum Sleep

## Prerequisites
- GitHub account
- Git installed on your computer
- Node.js 18+ installed

## Step-by-Step Deployment Instructions

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click "New repository" or go to https://github.com/new
3. Set repository name as: `aurum`
4. Set owner as: `thevirus-limiter`
5. Make it public (required for free GitHub Pages)
6. Initialize with README if desired
7. Click "Create repository"

### 2. Upload Your Code
\`\`\`bash
# Clone the repository
git clone https://github.com/thevirus-limiter/aurum.git
cd aurum

# Copy all your project files to this directory
# (Copy all files from your current project folder)

# Add all files to git
git add .
git commit -m "Initial commit: Aurum Sleep website"
git push origin main
\`\`\`

### 3. Enable GitHub Pages and Actions
1. Go to your repository: https://github.com/thevirus-limiter/aurum
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. **IMPORTANT**: Go to Settings → Actions → General
6. Under "Workflow permissions", select "Read and write permissions"
7. Check "Allow GitHub Actions to create and approve pull requests"
8. Click "Save"

### 4. Configure Repository Settings
1. In repository Settings → General
2. Ensure the repository is public
3. In Settings → Actions → General
4. Ensure "Allow all actions and reusable workflows" is selected
5. **CRITICAL**: Set workflow permissions to "Read and write permissions"

### 5. Deploy
The GitHub Action will automatically:
- Install dependencies
- Build the Next.js project
- Export static files
- Deploy to GitHub Pages

Your site will be available at: **https://thevirus-limiter.github.io/aurum**

### 6. Manual Deployment (Alternative)
If you prefer manual deployment:

\`\`\`bash
# Build the project
npm run build

# The static files will be in the 'out' directory
# Upload the contents of 'out' directory to gh-pages branch
\`\`\`

## Important Notes
- The site is configured for the `/aurum` subdirectory
- All internal links and assets are configured to work with this path
- Changes to the main branch will automatically trigger redeployment
- First deployment may take 5-10 minutes to become available
- **Repository must have "Read and write permissions" for Actions**

## Troubleshooting
- **Permission denied error**: Go to Settings → Actions → General → Workflow permissions → Select "Read and write permissions"
- If deployment fails, check the Actions tab for error logs
- Ensure all file paths use relative paths or the configured base path
- Verify that the repository is public for free GitHub Pages
- Make sure GitHub Actions is enabled in repository settings
