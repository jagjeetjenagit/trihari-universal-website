# Step-by-Step Google Form Creation Guide

## Quick Setup Instructions

### Step 1: Create the Form
1. Go to [forms.google.com](https://forms.google.com)
2. Click the **"+ Blank"** button to create a new form
3. Change the title from "Untitled form" to: **Trihari Universal Audition Form**
4. Add description: **Submit your profile for casting opportunities with Trihari Universal. Shortlisted candidates will be contacted.**

### Step 2: Add Form Questions (Copy & Paste Ready)

#### Question 1: Full Name
- **Question Type**: Short answer
- **Question**: Full Name
- **Required**: ✅ Yes
- **Description**: Enter your complete legal name

#### Question 2: City
- **Question Type**: Short answer  
- **Question**: City
- **Required**: ✅ Yes
- **Description**: Current city of residence (e.g., Mumbai, Hyderabad, Chennai)

#### Question 3: Email Address
- **Question Type**: Short answer
- **Question**: Email Address
- **Required**: ✅ Yes
- **Validation**: Response validation → Email address
- **Description**: We'll use this to contact you if shortlisted

#### Question 4: Phone Number
- **Question Type**: Short answer
- **Question**: Phone Number
- **Required**: ✅ Yes
- **Description**: Include country code (e.g., +91 9876543210)

#### Question 5: Date of Birth
- **Question Type**: Date
- **Question**: Date of Birth
- **Required**: ❌ No
- **Description**: Optional - helps us match age-appropriate roles

#### Question 6: Gender
- **Question Type**: Multiple choice
- **Question**: Gender
- **Required**: ❌ No
- **Options**:
  - Male
  - Female
  - Non-Binary
  - Prefer not to say

#### Question 7: Experience Level
- **Question Type**: Multiple choice
- **Question**: Acting/Performance Experience
- **Required**: ✅ Yes
- **Options**:
  - 0 years (Beginner)
  - 1 year
  - 2 years
  - 3 years
  - 4 years
  - 5+ years
  - 10+ years (Professional)

#### Question 8: Primary Skills
- **Question Type**: Short answer
- **Question**: Primary Skills & Talents
- **Required**: ✅ Yes
- **Description**: List your main skills (e.g., Acting, Dancing, Voice-over, Stunts, Singing)

#### Question 9: Instagram Profile
- **Question Type**: Short answer
- **Question**: Instagram Profile
- **Required**: ❌ No
- **Validation**: Response validation → Regular expression → Pattern: `https://.*instagram.com/.*`
- **Description**: Your Instagram handle or profile URL (optional)

#### Question 10: Portfolio/YouTube
- **Question Type**: Short answer
- **Question**: Portfolio or YouTube Link
- **Required**: ❌ No
- **Validation**: Response validation → Regular expression → Pattern: `https://.*`
- **Description**: Link to your portfolio, YouTube channel, or demo reel (optional)

#### Question 11: File Upload
- **Question Type**: File upload
- **Question**: Headshot or Resume
- **Required**: ❌ No
- **Settings**:
  - Allow only specific file types: ✅
  - File types: Images (JPG, PNG, GIF) and PDFs
  - Maximum file size: 10 MB
  - Maximum files: 1
- **Description**: Upload your headshot or acting resume (Max 10MB, JPG/PNG/PDF)

### Step 3: Configure Form Settings

1. Click the **Settings** ⚙️ icon at the top
2. **General Settings**:
   - ✅ Collect email addresses
   - ✅ Limit to 1 response per person
   - ✅ Allow response editing after submit

3. **Responses Settings**:
   - ✅ Get email notifications for new responses
   - ✅ Publish and show link to respond again

### Step 4: Customize Appearance (Optional)

1. Click the **Customize theme** 🎨 icon
2. Choose a dark/professional theme that matches your website
3. Upload your Trihari Universal logo as header image (optional)

### Step 5: Get Your Form IDs

#### A. Get Form ID:
1. Click **Send** button
2. Click **Link** tab
3. Copy the URL - extract the ID from this format:
   ```
   https://docs.google.com/forms/d/e/[FORM_ID_HERE]/viewform
   ```

#### B. Get Field Entry IDs:
1. Click the **⋮** (three dots) menu → **Get pre-filled link**
2. Fill in test data for each field:
   - Full Name: "Test User"
   - City: "Mumbai"  
   - Email: "test@example.com"
   - Phone: "+91 9876543210"
   - Date of Birth: Select any date
   - Gender: Select "Male"
   - Experience: Select "2 years"
   - Skills: "Acting, Dancing"
   - Instagram: "https://instagram.com/testuser"
   - Portfolio: "https://youtube.com/testchannel"

3. Click **Get link**
4. Copy the generated URL and extract entry IDs

### Step 6: Update Your Website Code

Replace these placeholders in your `TrihariUniversalSimple.jsx` file:

```javascript
// Replace YOUR_FORM_ID with your actual form ID
const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse'

// Replace these entry IDs with your actual ones
const fields = {
  'entry.XXXXXXXX': formData.get('fullName'),     // Full Name entry ID
  'entry.YYYYYYYY': formData.get('city'),        // City entry ID  
  'entry.ZZZZZZZZ': formData.get('email'),       // Email entry ID
  'entry.AAAAAAAA': formData.get('phone'),       // Phone entry ID
  'entry.BBBBBBBB': formData.get('dob'),         // Date of Birth entry ID
  'entry.CCCCCCCC': formData.get('gender'),      // Gender entry ID
  'entry.DDDDDDDD': formData.get('experience'),  // Experience entry ID
  'entry.EEEEEEEE': formData.get('skills'),      // Skills entry ID
  'entry.FFFFFFFF': formData.get('instagram'),   // Instagram entry ID
  'entry.GGGGGGGG': formData.get('portfolio'),   // Portfolio entry ID
}
```

### Step 7: Test Your Form

1. Save your website changes
2. Fill out your audition form on the website
3. Check Google Forms responses to verify data is received
4. Test email notifications

## Pro Tips:

- **Response Sheet**: Click the Google Sheets icon in Responses to automatically create a spreadsheet
- **Analytics**: Google Forms provides basic analytics on response patterns
- **Notifications**: Set up email notifications to get instant alerts for new applications
- **Backup**: Download responses periodically as CSV for backup

## Troubleshooting:

- **Form not submitting**: Check that all entry IDs match exactly
- **Fields missing**: Ensure field names in your code match Google Form questions
- **File uploads not working**: Verify file upload settings in Google Forms

Your form will be live immediately after creation and can handle unlimited responses!
