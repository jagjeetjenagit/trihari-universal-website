# 📸 Cloudinary Setup Guide for Trihari Universal

This guide will help you set up Cloudinary for handling photo uploads in your audition form.

## 🎯 What is Cloudinary?

Cloudinary is a cloud-based service that provides image and video management capabilities. It handles:
- Image uploads and storage
- Automatic image optimization
- Image transformations and resizing
- CDN delivery for fast loading
- Secure URL generation

## 🚀 Step 1: Create Cloudinary Account

1. **Sign Up**: Go to [cloudinary.com](https://cloudinary.com) and create a free account
2. **Verify Email**: Check your email and verify your account
3. **Login**: Access your Cloudinary dashboard

## 🔧 Step 2: Get Your Credentials

Once logged in, go to your **Dashboard**. You'll see:

```
Cloud Name: your_cloud_name
API Key: your_api_key  
API Secret: your_api_secret
```

## ⚙️ Step 3: Create Upload Preset

1. **Navigate**: Go to **Settings** → **Upload** → **Upload presets**
2. **Create New**: Click **"Add upload preset"**
3. **Configure**:
   - **Preset name**: `audition_photos`
   - **Signing Mode**: `Unsigned` (for client-side uploads)
   - **Folder**: `auditions` (organizes uploads)
   - **Resource Type**: `Auto`
   - **Access Mode**: `Public`

### 📋 Recommended Settings:

```
Upload Preset Name: audition_photos
Signing Mode: Unsigned
Folder: auditions
Max file size: 10MB
Allowed formats: jpg, png, pdf
Quality: Auto
Format: Auto
Transformation: 
  - Width: 1200 (max width)
  - Height: 1200 (max height)
  - Crop: limit (maintain aspect ratio)
```

## 🔐 Step 4: Update Environment Variables

Update your `.env` file with your Cloudinary credentials:

```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=audition_photos

# Optional - for server-side operations
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🌐 Step 5: Update GitHub Secrets

For production deployment, add these secrets to GitHub:

**Go to**: `https://github.com/jagjeetjenagit/trihari-universal-website/settings/secrets/actions`

**Add**:
- `VITE_CLOUDINARY_CLOUD_NAME` = `your_cloud_name`
- `VITE_CLOUDINARY_UPLOAD_PRESET` = `audition_photos`

## 💻 Step 6: Update Your Code

Your current code should work with these updates. The relevant section is:

```javascript
// Cloudinary configuration - YOUR ACCOUNT
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'audition_photos'
```

Update to use environment variables:

```javascript
// Cloudinary configuration from environment
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'audition_photos'
```

## 🧪 Step 7: Test Upload

1. **Start Dev Server**: `npm run dev`
2. **Fill Form**: Go to audition form
3. **Upload Photo**: Select a photo under 10MB
4. **Submit**: Check if upload works
5. **Verify**: Check your Cloudinary dashboard for the uploaded image

## 🔍 Troubleshooting

### ❌ Upload Fails
- **Check Preset**: Ensure `audition_photos` preset exists and is `Unsigned`
- **Check Credentials**: Verify cloud name is correct
- **Check File Size**: Ensure file is under 10MB
- **Check Format**: Ensure file is JPG, PNG, or PDF

### ❌ CORS Errors
- **Unsigned Preset**: Make sure your preset is set to `Unsigned`
- **Browser Console**: Check for specific error messages

### ❌ Files Not Organized
- **Folder Setting**: Ensure your preset has folder set to `auditions`

## 📁 Current Implementation

Your current code structure:

```
auditions/
├── photo1.jpg
├── photo2.png
└── document.pdf
```

Each upload gets:
- ✅ Automatic optimization
- ✅ CDN delivery
- ✅ Secure URLs
- ✅ Organized in `auditions` folder
- ✅ 10MB size limit protection

## 🎯 Benefits

- **Free Tier**: 25GB storage, 25GB monthly bandwidth
- **Automatic Optimization**: Images are automatically compressed
- **Global CDN**: Fast delivery worldwide
- **Transformations**: Resize, crop, format conversion on-the-fly
- **Security**: Secure URLs and access controls

## 📊 Current Settings in Code

```javascript
// Your current configuration
Cloud URL: https://api.cloudinary.com/v1_1/dn78mntyo/image/upload
Upload Preset: audition_photos (with ml_default fallback)
Folder: auditions
Max Size: 10MB
Accepted: image/*, application/pdf
```

## 🔄 Next Steps

1. ✅ Create Cloudinary account
2. ✅ Get credentials from dashboard  
3. ✅ Create `audition_photos` unsigned preset
4. ✅ Update `.env` file with your credentials
5. ✅ Add GitHub secrets for production
6. ✅ Test upload functionality
7. ✅ Monitor uploads in Cloudinary dashboard

## 💡 Pro Tips

- **Monitor Usage**: Check your Cloudinary dashboard for usage stats
- **Optimize Presets**: Set appropriate image transformations to save bandwidth
- **Backup**: Cloudinary keeps your images safe, but consider additional backups for critical data
- **Analytics**: Use Cloudinary's analytics to monitor upload patterns

---

**Need Help?** 
- Cloudinary Documentation: [cloudinary.com/documentation](https://cloudinary.com/documentation)
- Support: Available through Cloudinary dashboard
- Current Implementation: Working with fallback to `ml_default` preset

Your audition form is ready to handle professional photo uploads! 🎬✨
