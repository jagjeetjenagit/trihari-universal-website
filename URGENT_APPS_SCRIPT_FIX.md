# 🚨 URGENT: Fix Your Google Apps Script

## Issue Found
Your Google Apps Script has a syntax error that's preventing it from working. The `setHeaders` method doesn't exist in Apps Script.

## Quick Fix Instructions

### Step 1: Go to Your Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Open your "Trihari Universal Backend" project

### Step 2: Replace the Entire Code
**Delete all existing code** and paste this corrected version:

```javascript
/**
 * Google Apps Script for Trihari Universal Form Submissions - FIXED VERSION
 */

// Configuration - UPDATE THIS WITH YOUR SPREADSHEET ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE' // Replace with your Google Sheet ID
const SHEET_NAME = 'Form Submissions'

/**
 * Main function to handle POST requests
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    
    // Add submission to spreadsheet
    const rowId = addSubmissionToSheet(data)
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        rowId: rowId,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (error) {
    console.error('Error in doPost:', error)
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error saving data',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

/**
 * Handle GET requests for stats and testing
 */
function doGet(e) {
  const action = e.parameter.action || 'test'
  
  try {
    switch (action) {
      case 'stats':
        return getSubmissionStats()
      case 'test':
      default:
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            message: 'Google Apps Script is working!',
            timestamp: new Date().toISOString(),
            spreadsheetConfigured: SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE'
          }))
          .setMimeType(ContentService.MimeType.JSON)
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

/**
 * Add form submission to Google Sheet
 */
function addSubmissionToSheet(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
    let sheet = spreadsheet.getSheetByName(SHEET_NAME)
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME)
      
      // Add headers
      const headers = [
        'Timestamp', 'Full Name', 'Email', 'Phone', 'City', 'Age', 'Date of Birth',
        'Gender', 'Experience', 'Skills', 'Instagram', 'Portfolio', 'About Yourself',
        'Consent', 'Photo URL', 'Submission Date', 'Submission Time', 'Source', 'Status', 'Row ID'
      ]
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length)
      headerRange.setBackground('#4285f4')
      headerRange.setFontColor('white')
      headerRange.setFontWeight('bold')
      headerRange.setFontSize(11)
    }
    
    // Generate unique row ID
    const rowId = `TU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Prepare row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.fullName || '', data.email || '', data.phone || '', data.city || '',
      data.age || '', data.dateOfBirth || '', data.gender || '', data.experience || '',
      data.skills || '', data.instagram || '', data.portfolio || '', data.aboutYourself || '',
      data.consent || 'No', data.photoUrl || '', data.submissionDate || new Date().toLocaleDateString(),
      data.submissionTime || new Date().toLocaleTimeString(), data.source || 'Website',
      data.status || 'New Application', rowId
    ]
    
    // Add data to sheet
    sheet.appendRow(rowData)
    sheet.autoResizeColumns(1, rowData.length)
    
    console.log(`✅ Added submission for ${data.fullName} (${data.email})`)
    return rowId
    
  } catch (error) {
    console.error('Error adding to sheet:', error)
    throw error
  }
}

/**
 * Get submission statistics
 */
function getSubmissionStats() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
    const sheet = spreadsheet.getSheetByName(SHEET_NAME)
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          totalSubmissions: 0,
          todaySubmissions: 0,
          message: 'No submissions yet'
        }))
        .setMimeType(ContentService.MimeType.JSON)
    }
    
    const lastRow = sheet.getLastRow()
    const totalSubmissions = Math.max(0, lastRow - 1)
    
    const today = new Date().toLocaleDateString()
    const submissionDateColumn = 16
    
    let todaySubmissions = 0
    if (lastRow > 1) {
      const dates = sheet.getRange(2, submissionDateColumn, lastRow - 1, 1).getValues()
      todaySubmissions = dates.filter(row => 
        new Date(row[0]).toLocaleDateString() === today
      ).length
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        totalSubmissions,
        todaySubmissions,
        lastUpdated: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        totalSubmissions: 0,
        todaySubmissions: 0,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
```

### Step 3: Save and Redeploy
1. Save the project (Ctrl+S)
2. Click **Deploy** → **Manage deployments**
3. Click the **Edit** button (pencil icon) on your existing deployment
4. Click **Deploy**
5. Copy the new Web App URL if it changed

### Step 4: Test
After updating your script, the test connection should work!

---

## What Was Wrong?
- `setHeaders()` method doesn't exist in Google Apps Script
- CORS headers aren't needed for simple GET/POST requests
- The script was failing silently

## What's Fixed?
- ✅ Removed invalid `setHeaders()` calls  
- ✅ Simplified response handling
- ✅ Added better error reporting
- ✅ Enhanced test endpoint with configuration status

Once you update your Google Apps Script with this fixed code, the test submissions should work perfectly! 🚀
