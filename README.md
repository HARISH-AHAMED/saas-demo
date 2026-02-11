# SaaS Blog & Dashboard - Deployment Guide

This guide explains how to deploy your frontend to **GitHub Pages** and connect it to your live backend.

## 1. Prerequisites
- Create a Public GitHub repository for your project.
- Deploy your backend (Node.js/Express) to a platform like Render, Railway, or Heroku.
- Note your **Live Backend API URL** (e.g., `https://your-backend-api.onrender.com/api`).

## 2. Prepare for GitHub Pages
The project is already configured with:
- `HashRouter` for stable static routing.
- Relative base paths (`base: './'`) in `vite.config.js`.
- Environment variable support for the API URL.

## 3. Pushing to GitHub
Open your terminal in the root directory and run:

```bash
git init
git add .
git commit -m "Initial commit - Prepare for deployment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 4. Deploying the Frontend
You have two main options for GitHub Pages:

### Option A: Manual Deploy from `dist` folder (Fastest)
1. Ensure you have run: `npm run build`
2. Push your code to GitHub.
3. Go to your GitHub Repository **Settings** > **Pages**.
4. Under **Build and deployment** > **Source**, select **GitHub Actions** OR **Deploy from a branch**.
5. If using "Deploy from a branch", you usually need the `dist` folder on a specific branch (like `gh-pages`). You can use the `gh-pages` package:
   ```bash
   npm install -D gh-pages
   # Add this to package.json scripts: "deploy": "gh-pages -d dist"
   npm run deploy
   ```

### Option B: Automatic Deploy via GitHub Actions (Recommended)
GitHub can automatically build and deploy every time you push. I've prepared the project for this.
- Go to **Settings** > **Pages**.
- Select **GitHub Actions** as the source.
- GitHub provides templates for "Static HTML" or "Vite". Choose the Vite template.

## 5. Important: Setting the API URL
Since GitHub Pages is static, your environment variables must be available at **build time**.
- If deploying with GitHub Actions, add `VITE_API_URL` to your repository **Secrets** or **Variables** (Settings > Secrets and variables > Actions).
- If deploying manually, ensure your `.env` file has the live API URL before running `npm run build`.

## Admin Credentials (Demo)
- **Email**: `admin@example.com`
- **Password**: `admin123`
