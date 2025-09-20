# Self-Hosted PHP Backend Setup Guide

## 🎯 **Complete Independence - No Third Party Services!**

This solution gives you 100% control with no external dependencies. Everything runs on your own hosting.

## ✅ **What's Included:**

1. **PHP Backend** (`audition_handler.php`) - Handles form submissions
2. **File Upload Support** - Headshots/resumes stored on your server
3. **CSV Database** - All applications saved to spreadsheet
4. **Email Notifications** - Automatic emails to you and applicants
5. **Security Features** - Input sanitization and file validation
6. **Application IDs** - Unique tracking numbers for each submission

---

## 🚀 **Setup Instructions (10 Minutes)**

### Step 1: Get Web Hosting

You need a web hosting service that supports PHP. Great options:

**Budget Options ($3-10/month):**
- Hostinger
- Namecheap
- Bluehost
- SiteGround

**All include:**
- ✅ PHP support
- ✅ Email functionality
- ✅ File upload capabilities
- ✅ cPanel/control panel

### Step 2: Upload Backend Files

1. **Connect to your hosting** (via cPanel File Manager or FTP)
2. **Create folder structure:**
   ```
   your-domain.com/
   ├── backend/
   │   ├── audition_handler.php
   │   ├── .htaccess
   │   └── uploads/auditions/ (will be created automatically)
   ```

3. **Upload the files** I created:
   - `backend/audition_handler.php`
   - `backend/.htaccess`

### Step 3: Configure the PHP Script

Edit `audition_handler.php` and update these settings:

```php
// Line 19: Replace with your email
$ADMIN_EMAIL = 'your-actual-email@gmail.com';

// Line 20: Update your company name
$WEBSITE_NAME = 'Trihari Universal';
```

### Step 4: Update Your Website Code

In your `TrihariUniversalSimple.jsx`, find line with the fetch URL and replace:

```javascript
// Replace 'your-domain.com' with your actual domain
const response = await fetch('https://your-actual-domain.com/backend/audition_handler.php', {
```

**Example:**
```javascript
const response = await fetch('https://trihariuniversal.com/backend/audition_handler.php', {
```

### Step 5: Test Your Setup

1. **Upload your changes**
2. **Visit your website**
3. **Fill out the audition form**
4. **Submit and check:**
   - ✅ You receive an email notification
   - ✅ Applicant gets confirmation email
   - ✅ Data is saved to `audition_applications.csv`
   - ✅ Files uploaded to `uploads/auditions/`

---

## 📧 **Email Configuration**

Most hosting providers have email pre-configured. If emails aren't working:

1. **Check your hosting email settings**
2. **Verify your domain email is set up**
3. **Add this to the PHP script** if needed:

```php
// Advanced email configuration (if needed)
ini_set('SMTP', 'your-smtp-server.com');
ini_set('smtp_port', '587');
ini_set('sendmail_from', 'noreply@yourdomain.com');
```

---

## 📊 **Data Management**

### Viewing Applications

Your applications are saved in `audition_applications.csv`:

```csv
Application ID,Submission Date,Full Name,Email,Phone,City,...
APP_20250920_143052_abc123,2025-09-20 14:30:52,John Doe,john@email.com,...
```

### Download Methods

1. **cPanel File Manager** - Download CSV directly
2. **FTP Client** - Download via FileZilla, WinSCP, etc.
3. **Custom Admin Panel** - I can create one if needed

### File Uploads

Uploaded files are stored in: `uploads/auditions/`
- Organized by date
- Safe filenames generated automatically
- 10MB file size limit

---

## 🔒 **Security Features**

✅ **Input Sanitization** - All form data cleaned  
✅ **File Type Validation** - Only images and PDFs allowed  
✅ **File Size Limits** - 10MB maximum  
✅ **Directory Protection** - .htaccess prevents direct access  
✅ **SQL Injection Safe** - No database queries used  
✅ **XSS Protection** - HTML entities escaped  

---

## 📈 **Features Your Form Now Has:**

### For You (Admin):
- ✅ **Email notifications** for every application
- ✅ **CSV spreadsheet** with all data
- ✅ **File uploads** stored on your server
- ✅ **Application IDs** for tracking
- ✅ **Complete data ownership**
- ✅ **No monthly fees** (beyond hosting)

### For Applicants:
- ✅ **Confirmation emails** with application ID
- ✅ **File upload capability** for headshots
- ✅ **Professional experience**
- ✅ **Instant feedback** on submission

---

## 💰 **Cost Comparison:**

| Solution | Monthly Cost | Setup Time | Control Level |
|----------|-------------|------------|---------------|
| **Self-Hosted PHP** | $3-10 | 10 mins | 100% |
| Google Forms | Free | 5 mins | 0% |
| EmailJS | $0-15 | 5 mins | 30% |
| Formspree | $0-10 | 2 mins | 20% |

---

## 🛠 **Advanced Features (Optional)**

I can add these if needed:

1. **Admin Dashboard** - Web interface to view applications
2. **Email Templates** - Custom HTML email designs
3. **Auto-Responders** - Follow-up emails
4. **Application Status** - Track application progress
5. **Search & Filter** - Find specific applications
6. **Export Options** - Multiple file formats

---

## 🚨 **Troubleshooting:**

**Form not submitting:**
- Check the fetch URL matches your domain exactly
- Verify PHP files uploaded correctly
- Check browser console for errors

**Emails not arriving:**
- Verify hosting provider email is configured
- Check spam folders
- Test with different email addresses

**File uploads failing:**
- Check folder permissions (755)
- Verify hosting upload limits
- Ensure file types are allowed

**CSV not updating:**
- Check file permissions
- Verify PHP can write files
- Look for PHP error logs

---

## 🎯 **Next Steps:**

1. **Choose your hosting provider**
2. **Upload the PHP files**
3. **Configure your email and domain**
4. **Update your website code**
5. **Test with a real application**

You'll have a completely independent, professional audition system that you own and control entirely! 🎬✨

**Need help with any step?** I can assist with hosting setup, code customization, or adding advanced features.
