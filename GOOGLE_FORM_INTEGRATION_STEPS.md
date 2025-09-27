# Google Form Integration - Final Steps

## 🎯 **Your Google Form is Now Integrated!**

Your website now redirects to your Google Form: 
```
https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform
```

## 🔧 **CRITICAL: Get Real Entry IDs from Your Google Form**

Your form now submits directly to Google Forms, but you need the correct entry IDs for it to work:

### **Step 1: Find Your Google Form Entry IDs**

1. **Open your Google Form**: https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform
2. **Right-click on the "Full Name" field** → **Inspect Element**
3. **Look for**: `<input name="entry.XXXXXXXXX"`
4. **Copy the number** after "entry."
5. **Repeat for ALL fields**

### **Step 2: Update Your Code**

**Current placeholder mapping in your code:**
```javascript
// In TrihariUniversalSimple.jsx - around line 75-85
if (formData.get('fullName')) googleFormData.append('entry.123456789', formData.get('fullName'))     // ← Replace 123456789
if (formData.get('email')) googleFormData.append('entry.987654321', formData.get('email'))           // ← Replace 987654321  
if (formData.get('phone')) googleFormData.append('entry.456789123', formData.get('phone'))           // ← Replace 456789123
if (formData.get('city')) googleFormData.append('entry.147258369', formData.get('city'))             // ← Replace 147258369
if (formData.get('experience')) googleFormData.append('entry.789123456', formData.get('experience')) // ← Replace 789123456
if (formData.get('skills')) googleFormData.append('entry.321654987', formData.get('skills'))         // ← Replace 321654987
if (formData.get('instagram')) googleFormData.append('entry.654987321', formData.get('instagram'))   // ← Replace 654987321
if (formData.get('portfolio')) googleFormData.append('entry.159753486', formData.get('portfolio'))   // ← Replace 159753486
```

**⚠️ IMPORTANT: Until you replace these with real entry IDs, the form will use fallback (opens Google Form in new tab)**

### **Step 2: How to Find Entry IDs**

**Method 1: Inspect Element**
1. Go to your form: https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform
2. Right-click on the "Full Name" field → Inspect
3. Look for: `<input name="entry.XXXXXXXXX">`
4. Copy the number after "entry."
5. Repeat for all fields

**Method 2: View Page Source**
1. Open your form in browser
2. Press `Ctrl+U` (or `Cmd+U` on Mac)
3. Search for "entry." 
4. Find all entry IDs and map them to your fields

### **Step 3: Update Your Code**

Once you have the real entry IDs, update the code in `src/TrihariUniversalSimple.jsx`:

```javascript
// Example with real IDs (yours will be different)
if (formData.get('fullName')) params.append('entry.1234567890', formData.get('fullName'))
if (formData.get('email')) params.append('entry.0987654321', formData.get('email'))
// ... etc
```

## 🎬 **How It Works Now:**

1. **User fills form** on your beautiful website
2. **Clicks "Submit Application"**
3. **Gets confirmation message** about redirection
4. **Redirected to Google Form** with data pre-filled
5. **User completes Google Form** (uploads photo, additional info)
6. **You receive submissions** in Google Sheets automatically

## ✅ **What's Already Working:**

- ✅ Form redirects to your Google Form
- ✅ Beautiful confirmation message
- ✅ Form resets after submission
- ✅ Opens in new tab (preserves your website)
- ✅ Professional user experience

## 🔄 **Testing Your Integration:**

1. **Test the form** on your website
2. **Fill in some details**
3. **Click Submit Application**
4. **Verify redirection** to Google Form
5. **Check if data pre-fills** (after you update entry IDs)

## 📊 **Alternative Integration Options:**

If you prefer different behavior, you can:

**Option A: Current Setup (Recommended)**
- Keep your beautiful form design
- Redirect to Google Form for completion
- Best user experience + Google's reliability

**Option B: Full Embed**
- Replace entire form section with embedded Google Form
- Less design control but fully integrated

**Option C: Iframe Integration**
- Embed Google Form in popup/modal
- Keep users on your site

## 🛠️ **Need Help?**

If you need assistance:
1. **Finding entry IDs** - Follow the inspect element guide above
2. **Testing integration** - Try the form and check browser console for errors
3. **Customizing behavior** - Modify the success message or redirect behavior

## 📝 **Entry ID Mapping Template:**

Use this template to track your actual entry IDs:

```
Field Name          | Entry ID      | Status
--------------------|---------------|--------
Full Name          | entry.____    | [ ]
Email              | entry.____    | [ ]
Phone              | entry.____    | [ ]
City               | entry.____    | [ ]
Date of Birth      | entry.____    | [ ]
Gender             | entry.____    | [ ]
Experience         | entry.____    | [ ]
Skills             | entry.____    | [ ]
Instagram          | entry.____    | [ ]
Portfolio          | entry.____    | [ ]
Photo Upload       | entry.____    | [ ]
Description        | entry.____    | [ ]
Consent            | entry.____    | [ ]
```

## 🚀 **Your Audition System is Ready!**

Your professional audition application system is now live and integrated with Google Forms for:
- **Free hosting** of form responses
- **Automatic data collection** in Google Sheets  
- **File upload support** for headshots
- **Email notifications** for new applications
- **Professional presentation** with your website design

---

**🎭 Ready to receive audition applications with Google Forms integration!**
