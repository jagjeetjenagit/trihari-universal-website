# Google Forms Integration Guide
## Complete Setup for Trihari Universal Audition Form

This guide will help you create a Google Form for your audition applications and integrate it seamlessly with your website.

---

## 🎯 **Why Google Forms?**

✅ **Free & Reliable** - No hosting costs, Google's infrastructure  
✅ **Easy Setup** - No coding required for form creation  
✅ **Automatic Responses** - Built-in email confirmations  
✅ **Data Management** - Responses saved in Google Sheets  
✅ **Mobile Friendly** - Works perfectly on all devices  
✅ **Spam Protection** - Google's built-in security  

---

## 📋 **Step 1: Create Your Google Form**

### **1.1 Access Google Forms**
1. Go to [forms.google.com](https://forms.google.com)
2. Sign in with your Google account (use your business account if available)
3. Click **"+ Blank"** to create a new form

### **1.2 Set Up Form Basics**
1. **Form Title**: "Trihari Universal - Audition Application"
2. **Description**: "Submit your profile for casting opportunities. Professional applications only."
3. **Choose a theme**: Select a professional color scheme (recommend blue to match your website)

### **1.3 Add Form Fields**
Create these fields in order to match your current form:

```
📝 FIELD 1: Full Name
Type: Short answer
Required: ✅ Yes
Validation: None

📧 FIELD 2: Email Address  
Type: Short answer
Required: ✅ Yes
Validation: Email address

📱 FIELD 3: Phone Number
Type: Short answer
Required: ✅ Yes
Validation: Regular expression
Pattern: ^[\+]?[1-9][\d]{0,15}$
Error text: "Please enter a valid phone number"

🎂 FIELD 4: Age
Type: Short answer
Required: ✅ Yes
Validation: Number, Greater than 16, Less than 65

📅 FIELD 5: Years of Experience
Type: Multiple choice
Required: ✅ Yes
Options:
○ Less than 1 year
○ 1 year
○ 2 years
○ 3 years
○ 4 years
○ 5+ years
○ 10+ years

🎭 FIELD 6: Primary Skills
Type: Short answer
Required: ✅ Yes
Placeholder: "Acting, Dancing, Voiceover, Stunts..."

📷 FIELD 7: Instagram Profile
Type: Short answer
Required: ❌ No
Validation: Regular expression
Pattern: ^https://www\.instagram\.com/.*
Error text: "Please enter a valid Instagram URL"

🎬 FIELD 8: Portfolio/Reel URL
Type: Short answer
Required: ❌ No
Validation: URL

� FIELD 9: Upload Your Photo/Headshot
Type: File upload
Required: ✅ Yes
File types: Images only (JPEG, PNG, GIF, BMP, WebP)
Max file size: 10 MB
Max files: 1
Description: "Upload a clear headshot or recent photo of yourself"

�📝 FIELD 10: Tell us about yourself
Type: Paragraph
Required: ✅ Yes
Description: "Describe your experience, goals, and what makes you unique (max 500 words)"

✅ FIELD 11: Consent & Confirmation
Type: Multiple choice
Required: ✅ Yes
Options:
○ I confirm my details are accurate and consent to be contacted for casting opportunities
```

---

## ⚙️ **Step 2: Configure Form Settings**

### **2.1 General Settings**
1. Click **Settings** (gear icon) at top right
2. **General Tab**:
   - ✅ Collect email addresses
   - ✅ Limit to 1 response (prevents spam)
   - ❌ Edit after submit (keep disabled for applications)

### **2.2 Presentation Settings**
1. **Presentation Tab**:
   - ✅ Show progress bar
   - ✅ Shuffle question order (❌ keep disabled for logical flow)
   - **Confirmation message**: 
   ```
   🎬 Thank you for your audition application!
   
   Your submission has been received successfully. We will review your profile and contact you if you are shortlisted for our upcoming projects.
   
   Application submitted: [Current date/time]
   
   Follow us on Instagram @trihariuniversal for updates!
   
   - Trihari Universal Team
   ```

### **2.3 Response Settings**
1. **Responses Tab**:
   - ✅ Collect email addresses
   - ✅ Allow response editing (❌ disable for applications)
   - ✅ See summary charts and text responses

---

## 🔗 **Step 3: Get Form Links & IDs**

### **3.1 Get the Form URL**
1. Click **Send** button (top right)
2. Click the **Link** tab
3. ✅ Check "Shorten URL" 
4. **Copy the URL** - it will look like: `https://forms.gle/abc123xyz789`

### **3.2 Get Entry IDs for Pre-filling**
For advanced integration, you need the field IDs:

1. **Open your form in edit mode**
2. **Right-click on each field** → **Inspect Element**
3. **Look for**: `name="entry.XXXXXXXXX"`
4. **Record these IDs**:

```javascript
// Example Entry IDs (yours will be different)
const FORM_ENTRIES = {
  fullName: 'entry.123456789',
  email: 'entry.987654321', 
  phone: 'entry.456789123',
  age: 'entry.789123456',
  experience: 'entry.321654987',
  skills: 'entry.654987321',
  instagram: 'entry.147258369',
  portfolio: 'entry.963852741',
  description: 'entry.258147369',
  consent: 'entry.159753486'
};
```

---

## 🌐 **Step 4: Website Integration Options**

### **Option A: Direct Redirect (Recommended)**
Replace your form submission with a redirect to Google Forms:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  
  // Redirect to Google Form with pre-filled data
  const baseUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform';
  const params = new URLSearchParams({
    'entry.123456789': formData.get('fullName'),
    'entry.987654321': formData.get('email'),
    'entry.456789123': formData.get('phone'),
    // Add other fields...
  });
  
  window.open(`${baseUrl}?${params.toString()}`, '_blank');
};
```

### **Option B: Embed Form (Full Integration)**
Replace your entire form section with an embedded Google Form:

```jsx
<div className="w-full max-w-4xl mx-auto">
  <iframe 
    src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
    width="100%" 
    height="1200"
    frameBorder="0"
    marginHeight="0" 
    marginWidth="0"
    className="rounded-lg shadow-lg"
  >
    Loading Google Form...
  </iframe>
</div>
```

### **Option C: Hybrid Approach (Best UX)**
Keep your beautiful form design, submit to Google Forms in background:

```javascript
const submitToGoogleForms = async (formData) => {
  const formURL = 'https://docs.google.com/forms/u/0/d/e/YOUR_FORM_ID/formResponse';
  
  const data = new FormData();
  data.append('entry.123456789', formData.fullName);
  data.append('entry.987654321', formData.email);
  // Add other fields...
  
  try {
    await fetch(formURL, {
      method: 'POST',
      body: data,
      mode: 'no-cors'
    });
    
    // Show success message
    alert('✅ Application submitted successfully!');
  } catch (error) {
    console.error('Submission error:', error);
    // Fallback to direct form URL
    window.open('https://forms.gle/YOUR_FORM_ID', '_blank');
  }
};
```

---

## 📊 **Step 5: Response Management**

### **5.1 View Responses**
1. In your Google Form, click **Responses** tab
2. See individual responses or summary charts
3. Export to Google Sheets for advanced analysis

### **5.2 Set Up Google Sheets Integration**
1. In Responses tab, click **Create Spreadsheet** 
2. Choose "Create a new spreadsheet"
3. Name it: "Trihari Universal - Audition Applications"
4. All responses will automatically populate the sheet

### **5.3 Enable Email Notifications**
1. In Google Sheets, go to **Tools** → **Notification Rules**
2. Set up notifications for:
   - ✅ Any changes (new submissions)
   - ✅ Email daily summary
   - ✅ Email immediately

---

## 🎨 **Step 6: Customize Form Appearance**

### **6.1 Theme Customization**
1. Click **Customize Theme** (palette icon)
2. **Header**: Upload Trihari Universal logo
3. **Theme Color**: Use blue (#3B82F6) to match website
4. **Background**: Choose professional background
5. **Font**: Select clean, readable font (Roboto recommended)

### **6.2 Add Form Description**
```
🎬 TRIHARI UNIVERSAL AUDITIONS

We are a leading production house creating cinematic stories with bold visuals. Submit your profile to be considered for our upcoming film and commercial projects.

📋 APPLICATION REQUIREMENTS:
• Complete all required fields
• Provide accurate contact information  
• Include your best work samples
• Professional applications only

⏰ RESPONSE TIME: 
We review applications weekly and contact shortlisted candidates within 2-3 weeks.

📧 QUESTIONS? Contact us at trihariuniversal@gmail.com
```

---

## 🔧 **Step 7: Advanced Features**

### **7.1 Add Logic & Branching**
For advanced forms, you can add conditional logic:
1. Click on a question
2. Click **More options** (⋮)
3. Select **Go to section based on answer**
4. Create different paths based on responses

### **7.2 File Upload Setup**
For the photo/headshot upload field:

**How to Add File Upload:**
1. Click **"+"** to add a new question
2. Select **"File upload"** from question types
3. **Question**: "Upload Your Photo/Headshot"
4. **Description**: "Upload a clear headshot or recent photo of yourself"

**Configure Upload Settings:**
1. Click **"File upload settings"** 
2. **File types**: Select "Specific file types" → Check only "Images"
3. **Allowed formats**: JPEG, PNG, GIF, BMP, WebP
4. **Maximum file size**: 10 MB (recommended for photos)
5. **Maximum number of files**: 1
6. **Mark as Required**: ✅ Yes

**Important Notes:**
- Files are automatically stored in your Google Drive
- A folder "Form Responses" will be created automatically
- You'll get direct links to uploaded images in your response sheet
- Images are virus-scanned by Google automatically
- Applicants need a Google account to upload files (or you can allow anonymous uploads)

### **7.3 Response Validation**
Ensure quality submissions:
```
• Email validation: Built-in
• Phone validation: Custom regex pattern  
• URL validation: Built-in for portfolio links
• Required fields: Mark essential fields as required
• Character limits: Set minimum/maximum lengths
```

---

## 📱 **Step 8: Testing Your Form**

### **8.1 Test Form Functionality**
1. **Preview your form**: Click eye icon
2. **Submit test application**: Use dummy data
3. **Check responses**: Verify data appears correctly
4. **Test on mobile**: Ensure mobile responsiveness
5. **Test email notifications**: Confirm you receive alerts

### **8.2 Integration Testing**
1. **Test website integration**: Verify redirect/embed works
2. **Test pre-filling**: Check if form data populates correctly
3. **Test error handling**: Ensure fallbacks work
4. **Test across browsers**: Chrome, Firefox, Safari, Edge

---

## 🚀 **Step 9: Launch & Monitor**

### **9.1 Go Live**
1. **Update your website** with new form integration
2. **Test end-to-end flow** from website to form submission
3. **Announce on social media** that applications are open
4. **Monitor for first few submissions** to catch any issues

### **9.2 Ongoing Management**
- **Weekly review** of new applications
- **Respond to applicants** within promised timeframe
- **Export data regularly** to backup applications
- **Update form fields** as needed for different projects
- **Monitor spam submissions** and adjust settings if needed

---

## 🔍 **Troubleshooting Common Issues**

### **Issue 1: Form Not Loading**
```
Problem: Embedded form shows "Loading..." forever
Solution: Check iframe src URL, ensure form is set to "Public"
```

### **Issue 2: Pre-fill Not Working**
```
Problem: Form fields not pre-populating
Solution: Double-check entry IDs, ensure field names match
```

### **Issue 3: Responses Not Appearing**
```
Problem: Submissions not showing in responses
Solution: Check form sharing settings, ensure responses are being collected
```

### **Issue 4: Mobile Display Issues**
```
Problem: Form looks broken on mobile
Solution: Set iframe width to 100%, adjust height, test on actual devices
```

### **Issue 5: File Upload Problems**
```
Problem: Users can't upload images or files
Solutions: 
- Ensure "Allow file uploads" is enabled in form settings
- Check if users have Google accounts (required for file uploads)
- Verify file size limits (max 1GB per file, 10GB total per form)
- Enable "Anonymous file uploads" if needed
```

### **Issue 6: File Upload Alternatives**
```
If Google Forms file upload doesn't work for your needs:
Alternative 1: Ask users to upload images to Google Drive and share the link
Alternative 2: Request Instagram profile links instead of direct photo uploads
Alternative 3: Use a third-party service like Typeform (paid) for better file handling
```

---

## 📈 **Analytics & Insights**

### **Response Analytics**
Google Forms provides built-in analytics:
- **Response rate**: Track submission trends
- **Completion rate**: See where applicants drop off
- **Popular answers**: Identify common skills/experience levels
- **Geographic data**: See where applicants are located

### **Google Sheets Analysis**
Export data for advanced analysis:
```
• Pivot tables for experience breakdown
• Charts for skill distribution  
• Conditional formatting for priority applicants
• Filter and sort capabilities
• Integration with other Google Workspace tools
```

---

## 💡 **Pro Tips**

### **For Better Response Rates**
1. **Keep it concise** - Only ask essential questions
2. **Mobile-first design** - Most users will apply on mobile
3. **Clear instructions** - Explain what you're looking for
4. **Progress indicator** - Show completion progress
5. **Professional branding** - Use your logo and colors

### **For Quality Applications**
1. **Required fields** - Mark essential information as required
2. **Validation rules** - Ensure proper email/phone formats
3. **Character limits** - Set appropriate min/max lengths
4. **Clear descriptions** - Explain what you want in each field
5. **Examples provided** - Show sample answers where helpful

### **For Easy Management**  
1. **Descriptive titles** - Name form clearly for easy finding
2. **Organized folders** - Keep forms organized in Google Drive
3. **Regular exports** - Backup data regularly
4. **Team sharing** - Share with relevant team members
5. **Response notifications** - Set up email alerts for new submissions

---

## 🎬 **Final Implementation**

Once your Google Form is ready, you can:

1. **Replace current form** completely with Google Forms
2. **Keep current design** and redirect to Google Forms on submit
3. **Hybrid approach** with your design + Google Forms backend

**Recommended**: Keep your beautiful form design and redirect to Google Forms - this gives you the best of both worlds!

---

## 📞 **Need Help?**

If you need assistance with:
- Setting up the Google Form
- Integrating with your website  
- Customizing the form appearance
- Managing responses and data

Contact the development team or refer to [Google Forms Help Center](https://support.google.com/docs/topic/9055404).

---

**🎭 Ready to launch your professional audition application system with Google Forms!**
