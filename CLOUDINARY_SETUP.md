# 📸 Cloudinary Photo Upload Setup

## 🎯 **Current Status:**
- ✅ Cloudinary package installed
- ✅ Upload code implemented
- ⚠️ **Currently using demo settings** (limited functionality)

## 🚀 **Complete Setup (5 minutes):**

### Step 1: Create Free Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Get 25GB storage + 25GB bandwidth free

### Step 2: Get Your Credentials
In your Cloudinary dashboard, you'll see:
```
Cloud Name: your_cloud_name
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz123456
```

### Step 3: Create Upload Preset
1. Go to **Settings** → **Upload**
2. Click **Add upload preset**
3. Set **Preset name**: `audition_photos`
4. Set **Signing Mode**: `Unsigned`
5. Set **Folder**: `auditions`
6. **Save**

### Step 4: Update Your Code
In `src/TrihariUniversalSimple.jsx`, replace these lines:

```javascript
// CURRENT (demo settings):
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/demo/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'ml_default'

// REPLACE WITH YOUR SETTINGS:
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'audition_photos'
```

## ✅ **What You'll Get:**

### 📧 **Email with Actual Photos:**
```
📷 2 PHOTO(S) UPLOADED:

1. headshot.jpg (2.1 MB)
🔗 View Photo: https://res.cloudinary.com/your_cloud/image/upload/v1234567890/auditions/headshot.jpg

2. portfolio.png (1.8 MB)
🔗 View Photo: https://res.cloudinary.com/your_cloud/image/upload/v1234567890/auditions/portfolio.png

✅ Click the links above to view the actual photos!
```

### 🎯 **Benefits:**
- ✅ **Direct photo URLs** in emails
- ✅ **Automatic optimization** (faster loading)
- ✅ **Organized storage** in auditions folder
- ✅ **25GB free storage**
- ✅ **Professional image management**

## 🧪 **Test Now:**
Even with demo settings, you can test the upload functionality:
1. Submit form with photos
2. Check if photos upload successfully
3. See photo URLs in email

## 🔧 **Production Ready:**
Once you add your Cloudinary credentials:
- ✅ Unlimited uploads to your account
- ✅ Professional photo management
- ✅ Direct photo viewing in emails
- ✅ Automatic backups

**Set up Cloudinary to get actual photo URLs in your audition emails!** 📸✨
