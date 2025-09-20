# EmailJS Setup Guide for Trihari Universal Audition Form

## 🚀 **What's Been Done:**
✅ EmailJS package installed  
✅ Form code updated to use EmailJS  
✅ Professional email template structure ready  
✅ Form validation and error handling added  

## 📧 **EmailJS Setup (5 Minutes)**

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

### Step 2: Connect Your Email Service
1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (Recommended)
   - **Outlook** 
   - **Yahoo**
   - **Custom SMTP**

4. **For Gmail:**
   - Click **"Gmail"**
   - Click **"Connect Account"** 
   - Sign in to your Gmail account
   - Grant permissions
   - Your service will be created automatically

5. **Copy your Service ID** (looks like: `service_xxxxxxx`)

### Step 3: Create Email Template
1. Click **"Email Templates"**
2. Click **"Create New Template"**
3. **Template Name**: `Trihari Universal Audition Application`
4. **Copy and paste this template**:

```
Subject: New Audition Application - {{full_name}}

Dear {{to_name}},

You have received a new audition application through your website!

=== APPLICANT DETAILS ===
Name: {{full_name}}
Email: {{email}}
Phone: {{phone}}
City: {{city}}
Date of Birth: {{date_of_birth}}
Gender: {{gender}}

=== PROFILE INFORMATION ===
Experience Level: {{experience}}
Primary Skills: {{skills}}
Instagram Profile: {{instagram}}
Portfolio/YouTube: {{portfolio}}

=== APPLICATION INFO ===
Submitted on: {{application_date}} at {{application_time}}

---
This application was submitted through your Trihari Universal website audition form.

Reply directly to this email to contact the applicant: {{reply_to}}

Best regards,
Trihari Universal Website
```

5. Click **"Save"**
6. **Copy your Template ID** (looks like: `template_xxxxxxx`)

### Step 4: Get Your Public Key
1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. **Copy your Public Key** (looks like: `xxxxxxxxxxxxxxx`)

### Step 5: Update Your Website Code
In your `TrihariUniversalSimple.jsx` file, find these lines and replace the placeholders:

```javascript
// Send email via EmailJS
await emailjs.send(
  'YOUR_SERVICE_ID',    // Replace with your Service ID (step 2)
  'YOUR_TEMPLATE_ID',   // Replace with your Template ID (step 3)
  templateParams,
  'YOUR_PUBLIC_KEY'     // Replace with your Public Key (step 4)
)
```

**Example after replacement:**
```javascript
await emailjs.send(
  'service_abc123',
  'template_xyz789', 
  templateParams,
  'your_public_key_here'
)
```

### Step 6: Test Your Form
1. Save your changes and refresh your website
2. Fill out the audition form with test data
3. Submit the form
4. Check your email inbox for the application!

---

## 📋 **Email Template Variables Used:**

| Variable | Description | Source |
|----------|-------------|---------|
| `{{full_name}}` | Applicant's name | Form field |
| `{{email}}` | Applicant's email | Form field |
| `{{phone}}` | Phone number | Form field |
| `{{city}}` | City of residence | Form field |
| `{{date_of_birth}}` | Date of birth | Form field |
| `{{gender}}` | Gender selection | Form field |
| `{{experience}}` | Experience level | Form field |
| `{{skills}}` | Primary skills | Form field |
| `{{instagram}}` | Instagram profile | Form field |
| `{{portfolio}}` | Portfolio/YouTube link | Form field |
| `{{application_date}}` | Submission date | Auto-generated |
| `{{application_time}}` | Submission time | Auto-generated |
| `{{reply_to}}` | Reply email address | Same as applicant email |

---

## 🎯 **Features Your Form Now Has:**

✅ **Direct Email Delivery** - Applications go straight to your inbox  
✅ **Professional Templates** - Organized, easy-to-read format  
✅ **Loading States** - Button shows "SENDING..." during submission  
✅ **Error Handling** - Graceful error messages if something fails  
✅ **Form Reset** - Automatically clears after successful submission  
✅ **No Storage** - No third-party data storage concerns  
✅ **Free Tier** - 200 emails/month included  
✅ **Reply Functionality** - Reply directly to applicant's email  

---

## 🔒 **Privacy & Security:**

- ✅ **No data storage** - EmailJS doesn't store form data
- ✅ **Direct delivery** - Goes straight to your email
- ✅ **Secure transmission** - HTTPS encryption
- ✅ **Spam protection** - EmailJS includes basic spam filtering

---

## 📊 **EmailJS Free Tier Limits:**

- **200 emails/month** - Perfect for auditions
- **Unlimited templates** 
- **Unlimited services**
- **Basic analytics**

**Paid plans start at $15/month for 1,000 emails if you need more**

---

## 🚨 **Important Notes:**

1. **Check Spam Folder** - First few emails might go to spam
2. **Add to Contacts** - Add your EmailJS service email to contacts
3. **Test Thoroughly** - Test with different email providers
4. **Monitor Usage** - Check your EmailJS dashboard for usage stats

---

## 🛠 **Troubleshooting:**

**Form not sending:**
- Verify all 3 IDs are correct (Service, Template, Public Key)
- Check browser console for error messages
- Ensure EmailJS service is connected properly

**Emails not arriving:**
- Check spam/junk folders
- Verify email service connection in EmailJS dashboard
- Test with different email addresses

**Template not formatting:**
- Check all variable names match exactly (case-sensitive)
- Verify template is saved properly in EmailJS

---

Your audition form is now ready to send professional email notifications directly to your inbox! 🎬✨
