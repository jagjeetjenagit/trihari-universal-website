# 🔐 GitHub Secrets - Production Deployment Setup

## 🎯 **Update Required for Your New Configurations**

Your `.env` file has updated credentials that need to be added to GitHub Secrets for production deployment.

## 🌐 **Step 1: Go to GitHub Repository Settings**

**URL**: `https://github.com/jagjeetjenagit/trihari-universal-website/settings/secrets/actions`

**OR Manual Navigation**:
1. Go to your repository: `github.com/jagjeetjenagit/trihari-universal-website`
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**

## 🔑 **Step 2: Add/Update These Secrets**

Click **"New repository secret"** for each:

### **Google Sheets Integration:**
```
Secret Name: VITE_GOOGLE_SHEETS_URL
Secret Value: https://script.google.com/macros/s/AKfycbxFQuJ4sExTHC-nJlrE45lQFeedWQcuLPzRpBsjM6tkmPT97E5Z-0ByAFrRFQG1Er_B/exec
```

### **EmailJS Configuration:**
```
Secret Name: REACT_APP_EMAILJS_SERVICE_ID
Secret Value: service_boc9xs9

Secret Name: REACT_APP_EMAILJS_TEMPLATE_ID
Secret Value: template_l4q45nh

Secret Name: REACT_APP_EMAILJS_PUBLIC_KEY
Secret Value: AObLVQHs8Fd4OSv_P
```

### **Cloudinary Configuration:**
```
Secret Name: VITE_CLOUDINARY_CLOUD_NAME
Secret Value: dllmmfiba

Secret Name: VITE_CLOUDINARY_UPLOAD_PRESET
Secret Value: audition_photos
```

## 📋 **Step 3: Verify All Secrets**

After adding, you should see these 6 secrets:
- ✅ `VITE_GOOGLE_SHEETS_URL`
- ✅ `REACT_APP_EMAILJS_SERVICE_ID`
- ✅ `REACT_APP_EMAILJS_TEMPLATE_ID`
- ✅ `REACT_APP_EMAILJS_PUBLIC_KEY`
- ✅ `VITE_CLOUDINARY_CLOUD_NAME`
- ✅ `VITE_CLOUDINARY_UPLOAD_PRESET`

## 🚀 **Step 4: Deploy**

After updating secrets:
1. **Commit and push** your latest changes
2. **GitHub Actions** will automatically deploy with new environment variables
3. **Production site** will use your own services

## 🎯 **Production URLs**

- **Live Site**: `https://jagjeetjenagit.github.io/trihari-universal-website/`
- **Form will submit to**: Your Google Sheets + Your EmailJS + Your Cloudinary

---

**Your audition platform is ready for production with all your own service accounts!** 🎬✨
