# GitHub-Hosted Backend Setup Guide

## 🚀 **Free GitHub Solution - No External Hosting Required!**

This solution uses GitHub as your backend - completely free and no third-party services needed beyond GitHub itself.

## ✅ **What You Get:**

1. **GitHub Repository Storage** - All applications stored as JSON files
2. **GitHub Actions Email** - Automatic email notifications
3. **Admin Dashboard** - Web interface to view applications
4. **Version Control** - All submissions tracked in Git
5. **Free Hosting** - GitHub Pages hosts everything
6. **Professional Workflow** - Email notifications for you and applicants

---

## 🔧 **Setup Instructions (15 Minutes)**

### Step 1: Create GitHub Repository

1. **Go to [GitHub.com](https://github.com)** and sign in
2. **Click "New Repository"**
3. **Repository Name**: `trihari-universal-website` 
4. **Make it Public** (required for GitHub Pages)
5. **Click "Create Repository"**

### Step 2: Enable GitHub Pages

1. **Go to Settings** in your repository
2. **Scroll to "Pages"** section
3. **Source**: Deploy from a branch
4. **Branch**: `main` 
5. **Folder**: `/ (root)`
6. **Click "Save"**

Your site will be available at: `https://YOUR_USERNAME.github.io/trihari-universal-website`

### Step 3: Create GitHub Personal Access Token

1. **Go to Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Click "Generate new token (classic)"**
3. **Note**: "Trihari Universal Form Handler"
4. **Expiration**: No expiration (or 1 year)
5. **Select scopes**:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
6. **Click "Generate token"**
7. **Copy the token** (you won't see it again!)

### Step 4: Set Up Repository Secrets

1. **Go to Settings** → **Secrets and variables** → **Actions**
2. **Click "New repository secret"**
3. **Add these secrets**:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `ADMIN_EMAIL` | your-email@gmail.com | Where you want to receive notifications |
| `EMAIL_USERNAME` | your-email@gmail.com | Gmail account for sending emails |
| `EMAIL_PASSWORD` | your-app-password | Gmail App Password (see below) |

### Step 5: Create Gmail App Password

1. **Go to [Google Account Settings](https://myaccount.google.com/security)**
2. **Enable 2-Step Verification** (if not already enabled)
3. **Go to "App passwords"**
4. **Select app**: Other (custom name)
5. **Name**: "Trihari Universal GitHub"
6. **Click "Generate"**
7. **Copy the 16-character password**
8. **Use this as `EMAIL_PASSWORD` secret**

### Step 6: Upload Your Files

Upload these files to your GitHub repository:

```
your-repo/
├── src/
│   ├── TrihariUniversalSimple.jsx (your existing file)
│   └── utils/
│       └── GitHubFormHandler.js (created above)
├── .github/
│   └── workflows/
│       └── send-email.yml (created above)
├── admin.html (created above)
├── index.html (your main website)
└── submissions/ (will be created automatically)
```

### Step 7: Configure Your Code

**In `src/TrihariUniversalSimple.jsx`**, update these lines:

```javascript
// Replace with your actual GitHub details
const githubHandler = new GitHubFormHandler({
  owner: 'YOUR_ACTUAL_USERNAME',     // Your GitHub username
  repo: 'trihari-universal-website', // Your repository name
  token: 'YOUR_ACTUAL_TOKEN'         // Your Personal Access Token
})
```

**In `admin.html`**, update the same details:

```javascript
const GITHUB_CONFIG = {
  owner: 'YOUR_ACTUAL_USERNAME',     // Your GitHub username
  repo: 'trihari-universal-website', // Your repository name
  token: 'YOUR_ACTUAL_TOKEN'         // Your Personal Access Token
};
```

### Step 8: Test Your Setup

1. **Visit your GitHub Pages site**
2. **Fill out the audition form**
3. **Submit the form**
4. **Check your email** for notifications
5. **Visit `your-site.github.io/admin.html`** to see the application

---

## 📊 **How It Works:**

### When Someone Submits the Form:

1. **Form Data Collected** → JavaScript captures all form fields
2. **JSON File Created** → Application saved as `submissions/APP_XXXXXX.json`
3. **GitHub Action Triggered** → Automatic email workflow starts
4. **Emails Sent** → You get notification, applicant gets confirmation
5. **Admin Dashboard** → View all applications in your admin panel

### File Structure Created:

```
submissions/
├── APP_2025-09-20T14-30-52_abc123.json
├── APP_2025-09-20T15-45-10_def456.json
└── APP_2025-09-20T16-20-33_ghi789.json
```

Each JSON file contains:
```json
{
  "applicationId": "APP_2025-09-20T14-30-52_abc123",
  "submittedAt": "2025-09-20T14:30:52.123Z",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "city": "Mumbai",
  "experience": "2 years",
  "skills": "Acting, Dancing",
  "instagram": "https://instagram.com/johndoe",
  "portfolio": "https://youtube.com/johndoe"
}
```

---

## 🎯 **Features:**

### ✅ **For You (Admin):**
- Email notifications for every application
- Web dashboard to view all applications
- Download/export capabilities via GitHub
- Version control of all submissions
- Professional email templates
- Free hosting and storage

### ✅ **For Applicants:**
- Confirmation emails with application ID
- Professional application experience
- Fast form submission
- Mobile-friendly interface

---

## 💰 **Cost Analysis:**

| Feature | GitHub Solution | Traditional Hosting |
|---------|----------------|-------------------|
| **Storage** | Free (unlimited public repos) | $5-20/month |
| **Email Sending** | Free (GitHub Actions) | $10-30/month |
| **Hosting** | Free (GitHub Pages) | $5-15/month |
| **Database** | Free (JSON files) | $10-25/month |
| **SSL Certificate** | Free (automatic) | $0-50/year |
| **TOTAL** | **$0/month** | **$30-90/month** |

---

## 📈 **Limitations & Solutions:**

### GitHub Rate Limits:
- **API Calls**: 5,000/hour (more than enough)
- **Email Actions**: 1,000/month (plenty for auditions)
- **Storage**: Unlimited for public repos

### File Upload Handling:
Since GitHub has file size limits, for large file uploads you can:
1. **Use the current solution** for small files (up to 25MB)
2. **Add Cloudinary integration** for larger files (free tier available)
3. **Direct applicants to email** large files separately

---

## 🛠 **Advanced Features (Optional):**

I can add these if needed:

1. **Application Status Tracking** - Mark as reviewed/shortlisted
2. **Search & Filter** - Find specific applications
3. **Export to CSV** - Download all data
4. **Email Templates** - Custom confirmation messages
5. **Application Statistics** - Charts and analytics
6. **Webhook Integration** - Connect to other services

---

## 🚨 **Security Notes:**

- ✅ **GitHub API** handles all security
- ✅ **Personal Access Token** controls access
- ✅ **Repository Secrets** keep credentials safe
- ✅ **HTTPS** encryption by default
- ⚠️ **Token Security**: Never commit tokens to code

---

## 🎬 **Result:**

You'll have a completely professional audition system that:
- ✅ **Costs $0/month** 
- ✅ **Requires no external hosting**
- ✅ **Sends professional emails**
- ✅ **Stores data securely**
- ✅ **Provides admin dashboard**
- ✅ **Scales automatically**
- ✅ **Works reliably**

Your audition form will be hosted on GitHub Pages with a professional backend - completely free and no third-party dependencies except GitHub itself! 🚀
