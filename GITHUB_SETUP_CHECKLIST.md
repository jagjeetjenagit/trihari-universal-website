# GitHub Setup Checklist for Trihari Universal

## 🚀 **Quick Setup Guide** (15 minutes)

### ✅ **Step 1: Create GitHub Repository** (2 minutes)

1. **Go to [GitHub.com](https://github.com)** and sign in
2. **Click "New Repository"** (green button)
3. **Repository name**: `trihari-universal-website`
4. **Description**: `Trihari Universal - Cinematic Production House Website`
5. **Make it Public** ✅ (required for free GitHub Pages)
6. **Don't initialize** with README/gitignore (we already have them)
7. **Click "Create Repository"**

### ✅ **Step 2: Push Your Code** (2 minutes)

Copy and run these commands in your terminal:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/trihari-universal-website.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### ✅ **Step 3: Enable GitHub Pages** (1 minute)

1. **Go to Settings** tab in your repository
2. **Scroll to "Pages"** section (left sidebar)
3. **Source**: Deploy from a branch
4. **Branch**: `main` 
5. **Folder**: `/ (root)`
6. **Click "Save"**

Your site will be available at: `https://YOUR_USERNAME.github.io/trihari-universal-website`

### ✅ **Step 4: Create Personal Access Token** (3 minutes)

1. **Click your profile picture** → **Settings**
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **"Generate new token (classic)"**
4. **Note**: "Trihari Universal Form Handler"
5. **Expiration**: No expiration
6. **Scopes**: Check ✅ `repo` and ✅ `workflow`
7. **Generate token** and **COPY IT** (you won't see it again!)

### ✅ **Step 5: Set Up Repository Secrets** (3 minutes)

In your repository:
1. **Settings** → **Secrets and variables** → **Actions**
2. **"New repository secret"** for each:

| Secret Name | Value | Example |
|-------------|--------|---------|
| `ADMIN_EMAIL` | your-email@gmail.com | admin@trihariuniversal.com |
| `EMAIL_USERNAME` | your-email@gmail.com | notifications@trihariuniversal.com |
| `EMAIL_PASSWORD` | gmail-app-password | abcd efgh ijkl mnop |

### ✅ **Step 6: Gmail App Password** (3 minutes)

1. **[Google Account Security](https://myaccount.google.com/security)**
2. **Enable 2-Step Verification** (if not enabled)
3. **"App passwords"** → **Select app**: Other (custom)
4. **Name**: "Trihari Universal GitHub"
5. **Generate** and copy the 16-character password
6. **Use this as `EMAIL_PASSWORD` secret**

### ✅ **Step 7: Update Your Code** (1 minute)

In `src/TrihariUniversalSimple.jsx`, find and update:

```javascript
// Replace YOUR_GITHUB_USERNAME with your actual username
owner: 'YOUR_ACTUAL_USERNAME',     
repo: 'trihari-universal-website', 
token: 'YOUR_ACTUAL_TOKEN'         
```

In `admin.html`, update the same details.

---

## 🎯 **After Setup Complete:**

### Test Your Form:
1. **Visit**: `https://YOUR_USERNAME.github.io/trihari-universal-website`
2. **Fill out audition form** and submit
3. **Check your email** for notification
4. **Visit admin dashboard**: `https://YOUR_USERNAME.github.io/trihari-universal-website/admin.html`

### You'll Have:
- ✅ **Professional website** hosted on GitHub Pages
- ✅ **Working audition form** with email notifications  
- ✅ **Admin dashboard** to view applications
- ✅ **Zero hosting costs** - completely free!
- ✅ **Professional email system** 
- ✅ **Secure application storage**

---

## 🚨 **Important Notes:**

- **Never commit your token** to code - always use secrets
- **Test with different email addresses** to verify delivery
- **Check spam folders** for first few emails
- **Applications are stored** in `submissions/` folder

---

## 🎬 **Next Steps:**

1. **Share your website URL** with casting directors
2. **Monitor applications** via admin dashboard  
3. **Download application data** from GitHub repository
4. **Scale as needed** - GitHub handles everything automatically

**Your professional audition system is ready! 🚀**
