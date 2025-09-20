# Google Forms Backend Integration Setup

## Overview
Your audition form has been configured to submit data to Google Forms while maintaining your beautiful custom design. Here's how to complete the setup:

## Step 1: Create a Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Click "Blank" to create a new form
3. Title it "Trihari Universal Audition Form"

## Step 2: Add Form Fields

Create these exact fields in your Google Form (the order doesn't matter):

### Basic Details Section:
1. **Full Name** (Short answer, Required)
2. **City** (Short answer, Required)  
3. **Email Address** (Short answer, Required)
4. **Phone Number** (Short answer, Required)
5. **Date of Birth** (Date)
6. **Gender** (Multiple choice: Male, Female, Non-Binary, Prefer not to say)

### Profile Section:
7. **Experience** (Multiple choice: 0 years, 1 year, 2 years, 3 years, 4 years, 5+ years, 10+ years, Required)
8. **Primary Skills** (Short answer, Required)
9. **Instagram Profile** (Short answer)
10. **YouTube / Portfolio Link** (Short answer)

### File Upload:
11. **Headshot / Document** (File upload - set to accept images and PDFs)

## Step 3: Get Your Form ID and Field IDs

1. Click the **Send** button in your Google Form
2. Click the **Link** tab
3. Copy the URL - it will look like:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSe_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform
   ```
4. The part after `/d/e/` and before `/viewform` is your **FORM_ID**

### To get Field IDs:
1. In your Google Form, click the **three dots menu** (⋮) in the top right
2. Select **Get pre-filled link**
3. Fill in some test data for each field
4. Click **Get link** at the bottom
5. Copy the generated URL
6. The URL will contain field IDs like `entry.123456789=value`

Example pre-filled URL:
```
https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=pp_url&entry.123456789=Test+Name&entry.987654321=test@email.com&entry.555666777=9876543210
```

## Step 4: Update Your Code

Open your `TrihariUniversalSimple.jsx` file and find the `handleFormSubmit` function. Replace the placeholder values:

1. **Replace `YOUR_FORM_ID`** with your actual form ID
2. **Replace each `YOUR_FIELD_NAME_FIELD_ID`** with the corresponding entry numbers

### Example:
```javascript
const fields = {
  'entry.123456789': formData.get('fullName'),     // Full Name field
  'entry.987654321': formData.get('email'),       // Email field  
  'entry.555666777': formData.get('phone'),       // Phone field
  'entry.444333222': formData.get('city'),        // City field
  'entry.111222333': formData.get('dob'),         // Date of Birth field
  'entry.888999000': formData.get('gender'),      // Gender field
  'entry.777888999': formData.get('experience'),  // Experience field
  'entry.666777888': formData.get('skills'),      // Skills field
  'entry.555444333': formData.get('instagram'),   // Instagram field
  'entry.222111000': formData.get('portfolio'),   // Portfolio field
}
```

## Step 5: Test the Integration

1. Save your changes
2. Refresh your website
3. Fill out the audition form with test data
4. Submit the form
5. Check your Google Form responses to verify the data was received

## Step 6: Set Up Response Handling (Optional)

### Email Notifications:
1. In your Google Form, click **Responses**
2. Click the **three dots menu** (⋮)
3. Select **Get email notifications for new responses**

### Connect to Google Sheets:
1. In **Responses**, click the **Google Sheets** icon
2. Create a new spreadsheet to automatically collect all responses

## Step 7: File Upload Considerations

**Important**: File uploads through this method have limitations. For a more robust file upload solution, consider:

1. **Google Drive Integration**: Set up a shared folder and modify the form to include a Google Drive upload link
2. **Cloud Storage**: Use services like Cloudinary or AWS S3 for file uploads
3. **Alternative**: Include instructions for applicants to email files separately

## Final Code Structure

Your form will now:
- ✅ Maintain your beautiful custom design
- ✅ Validate required fields
- ✅ Submit data to Google Forms in the background
- ✅ Show success message to users
- ✅ Reset the form after submission
- ✅ Store all responses in Google Sheets (if connected)

## Security Notes

- The form submits directly to Google Forms, so data is handled securely by Google
- No sensitive data is stored in your frontend code
- Google Forms provides built-in spam protection
- You can enable CAPTCHA in Google Forms settings if needed

## Support

If you need help with any step, the Google Forms help documentation is available at: https://support.google.com/docs/answer/6281888

Once you complete these steps, your audition form will be fully functional with Google Forms as the backend!
