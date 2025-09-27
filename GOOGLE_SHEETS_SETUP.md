# Google Sheets Backend Setup Instructions

## 🚀 Quick Setup Guide

### Step 1: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Trihari Universal - Form Submissions"
4. Copy the Spreadsheet ID from the URL
   - URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - Copy the part between `/d/` and `/edit`

### Step 2: Deploy Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with content from `backend/google-apps-script.js`
4. Update the `SPREADSHEET_ID` variable with your spreadsheet ID
5. Save the project (Ctrl+S) and name it "Trihari Universal Backend"

### Step 3: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Description: "Trihari Universal Form Handler"
4. Execute as: "Me"
5. Who has access: "Anyone"
6. Click "Deploy"
7. Copy the Web App URL (it looks like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

### Step 4: Update Environment Variables
1. Open `.env` file in your project root
2. Update these variables:
   ```env
   REACT_APP_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   REACT_APP_SPREADSHEET_ID=YOUR_SPREADSHEET_ID_HERE
   ```

### Step 5: Test the Integration
1. Restart your development server: `npm run dev`
2. Submit a test form
3. Check your Google Sheet - you should see the data appear automatically!

## 📊 What Gets Stored

The spreadsheet will automatically create columns for:
- **Timestamp** - When the form was submitted
- **Full Name** - Applicant's name
- **Email** - Contact email
- **Phone** - Phone number
- **City** - Location
- **Age** - Age (if provided)
- **Date of Birth** - DOB (if provided)
- **Gender** - Gender selection
- **Experience** - Years of experience
- **Skills** - Primary skills
- **Instagram** - Instagram handle
- **Portfolio** - Portfolio URL
- **About Yourself** - Personal description
- **Consent** - Terms acceptance
- **Photo URL** - Cloudinary photo link
- **Submission Date** - Local date
- **Submission Time** - Local time
- **Source** - Always "Trihari Universal Website"
- **Status** - Defaults to "New Application"
- **Row ID** - Unique identifier for each submission

## 🎯 Features

### ✅ **Dual Submission System**
- Form data is saved to **both** email (EmailJS) and spreadsheet
- If one fails, the other still works
- User gets clear feedback about what succeeded/failed

### ✅ **Real-time Statistics**
- Track total submissions
- Count today's applications
- Monitor form performance

### ✅ **Automatic Organization**
- Headers are created automatically
- Data is formatted and organized
- Columns auto-resize for readability

### ✅ **Error Handling**
- Graceful failure handling
- Detailed error logging
- User-friendly error messages

## 🔧 Troubleshooting

### Issue: "Script not authorized"
**Solution:** Go back to Google Apps Script → Run → Review permissions → Allow

### Issue: "Spreadsheet not found"
**Solution:** Double-check the SPREADSHEET_ID in your Apps Script

### Issue: "CORS error"
**Solution:** Make sure your Web App is deployed with "Anyone" access

### Issue: "No data appearing"
**Solution:** Check browser console for errors and verify environment variables

## 🎨 Customization

### Adding New Fields
1. Update the form in React
2. Add the field to `GoogleSheetsService.js`
3. Update the headers array in `google-apps-script.js`
4. Redeploy the Apps Script

### Changing Sheet Structure
1. Modify the `addSubmissionToSheet` function
2. Update the headers array
3. Test with a sample submission

## 📈 Analytics & Monitoring

The system provides built-in analytics:
- **Total Submissions**: All-time form submissions
- **Today's Count**: Applications received today
- **Success Rate**: Email vs. Spreadsheet success rates
- **Error Tracking**: Failed submissions with error details

Access analytics by calling `GoogleSheetsService.getStats()` in your React app.

## 🔒 Security Notes

- The Apps Script Web App is public but only accepts POST requests with valid data
- No sensitive data is exposed in the client-side code
- Environment variables keep URLs private
- Google handles authentication and permissions

## 🎯 Next Steps

After setup:
1. ✅ Test form submission
2. ✅ Verify data in spreadsheet
3. ✅ Check email delivery
4. ✅ Monitor error logs
5. ✅ Set up data backup/export if needed

Your form submissions will now be automatically organized in Google Sheets for easy management and analysis! 🚀
