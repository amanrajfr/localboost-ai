---
description: How to deploy LocalBoost AI frontend to Vercel
---

# Deploy to Vercel

## Prerequisites
- All code changes must be committed and pushed to GitHub (`main` branch)
- Vercel project "dist" is connected to `amanrajfr/localboost-ai` on GitHub

## Vercel Dashboard Settings (already configured — DO NOT change)
These settings are configured in the Vercel dashboard and should NOT be changed:
- **Root Directory**: `mobile`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Other

## How to Deploy

### Step 1: Make your code changes
Edit files in the `mobile/` folder as needed.

### Step 2: Commit and push
```bash
// turbo
git add -A
```
```bash
git commit -m "your commit message"
```
```bash
git push origin main
```

### Step 3: Vercel auto-deploys
Once you push to `main`, Vercel will **automatically** detect the change and start a new deployment. You do NOT need to click "Redeploy" manually.

### Step 4: Verify
Go to https://vercel.com → your project → Deployments tab to see the build status.

## Troubleshooting

### "Build Failed" on Vercel
1. Check the **Build Logs** in the Vercel dashboard for the exact error
2. Common issues:
   - Missing dependency → run `npm install <package>` in the `mobile/` folder, commit, and push
   - Build command error → check `mobile/package.json` `scripts.build` is `expo export -p web --clear`

### Changes not showing on the live site
1. Make sure you **committed AND pushed** your changes: `git status` should show clean
2. Check the Vercel Deployments tab — the latest deployment should show "Ready" status
3. Hard refresh the browser with `Ctrl + Shift + R` to bypass browser cache

### NEVER do these things
- ❌ Do NOT create a `vercel.json` in the repo root — it conflicts with dashboard settings
- ❌ Do NOT use `vercel deploy` CLI commands — always push to GitHub and let Vercel auto-deploy
- ❌ Do NOT click "Redeploy" on old CLI-based deployments — only Git-triggered deployments work correctly
- ❌ Do NOT change Vercel dashboard build settings unless you know exactly what you're doing
