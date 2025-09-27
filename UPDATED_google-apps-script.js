/**
 * Google Apps Script for Trihari Universal Form Submissions - UPDATED VERSION
 * Deploy this as a Web App in Google Apps Script
 * 
 * Setup Instructions:
 * 1. Go to script.google.com
 * 2. Open your existing project
 * 3. Replace ALL code with this updated version
 * 4. Make sure SPREADSHEET_ID is set to your actual spreadsheet ID
 * 5. Save and Deploy as Web App with "Anyone" access
 * 6. Copy the Web App URL to your React app
 */

// Configuration - REPLACE WITH YOUR ACTUAL SPREADSHEET ID
const SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID_HERE' // Replace with your Google Sheet ID
const SHEET_NAME = 'Form Submissions'

/**
 * Main function to handle all requests
 */
function doPost(e) {
  try {
    console.log('📥 doPost called with:', e ? 'data' : 'no data')
    
    // Handle manual testing in script editor
    if (!e || !e.postData) {
      console.log('⚠️ Manual test execution - creating test data')
      const testData = {
        fullName: 'Test User from Script Editor',
        email: 'test@scripteditor.com',
        phone: '1234567890',
        city: 'Test City',
        experience: '2 years',
        skills: 'Testing',
        consent: 'Yes'
      }
      
      const rowId = addSubmissionToSheet(testData)
      
      const output = ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Test data saved successfully (manual execution)',
          rowId: rowId,
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON)
      
      // Add CORS headers
      addCorsHeaders(output)
      return output
    }
    
    // Handle real web requests
    console.log('📝 Processing web request...')
    console.log('PostData contents:', e.postData.contents)
    
    const data = JSON.parse(e.postData.contents)
    console.log('📊 Parsed data:', data)
    
    // Add submission to spreadsheet
    const rowId = addSubmissionToSheet(data)
    
    const output = ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully from website',
        rowId: rowId,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
    
    // Add CORS headers
    addCorsHeaders(output)
    return output
      
  } catch (error) {
    console.error('❌ Error in doPost:', error)
    console.error('Error stack:', error.stack)
    
    const output = ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error saving data',
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
    
    // Add CORS headers even for errors
    addCorsHeaders(output)
    return output
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
        const statsOutput = getSubmissionStats()
        addCorsHeaders(statsOutput)
        return statsOutput
      case 'test':
      default:
        const output = ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            message: 'Google Apps Script is working!',
            timestamp: new Date().toISOString(),
            spreadsheetConfigured: SPREADSHEET_ID !== 'YOUR_ACTUAL_SPREADSHEET_ID_HERE'
          }))
          .setMimeType(ContentService.MimeType.JSON)
        
        addCorsHeaders(output)
        return output
    }
  } catch (error) {
    const output = ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
    
    addCorsHeaders(output)
    return output
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
        'Timestamp',
        'Full Name',
        'Email',
        'Phone',
        'City',
        'Age',
        'Date of Birth',
        'Gender',
        'Experience',
        'Skills',
        'Instagram',
        'Portfolio',
        'About Yourself',
        'Consent',
        'Photo URL',
        'Submission Date',
        'Submission Time',
        'Source',
        'Status',
        'Row ID'
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
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.city || '',
      data.age || '',
      data.dateOfBirth || '',
      data.gender || '',
      data.experience || '',
      data.skills || '',
      data.instagram || '',
      data.portfolio || '',
      data.aboutYourself || '',
      data.consent || 'No',
      data.photoUrl || '',
      data.submissionDate || new Date().toLocaleDateString(),
      data.submissionTime || new Date().toLocaleTimeString(),
      data.source || 'Website',
      data.status || 'New Application',
      rowId
    ]
    
    // Add data to sheet
    sheet.appendRow(rowData)
    
    // Auto-resize columns
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
      const output = ContentService
        .createTextOutput(JSON.stringify({
          totalSubmissions: 0,
          todaySubmissions: 0,
          message: 'No submissions yet'
        }))
        .setMimeType(ContentService.MimeType.JSON)
      
      return output
    }
    
    const lastRow = sheet.getLastRow()
    const totalSubmissions = Math.max(0, lastRow - 1) // Exclude header row
    
    // Count today's submissions
    const today = new Date().toLocaleDateString()
    const submissionDateColumn = 16 // Column P (Submission Date)
    
    let todaySubmissions = 0
    if (lastRow > 1) {
      const dates = sheet.getRange(2, submissionDateColumn, lastRow - 1, 1).getValues()
      todaySubmissions = dates.filter(row => 
        new Date(row[0]).toLocaleDateString() === today
      ).length
    }
    
    const output = ContentService
      .createTextOutput(JSON.stringify({
        totalSubmissions,
        todaySubmissions,
        lastUpdated: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
    
    return output
      
  } catch (error) {
    const output = ContentService
      .createTextOutput(JSON.stringify({
        totalSubmissions: 0,
        todaySubmissions: 0,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      
    return output
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
function doOptions() {
  const output = ContentService.createTextOutput('')
  output.setMimeType(ContentService.MimeType.JSON)
  return output
}

/**
 * Add CORS headers to response - Google Apps Script doesn't support setHeader
 * CORS is handled automatically by Google Apps Script for web apps deployed with "Anyone" access
 */
function addCorsHeaders(output) {
  // Google Apps Script handles CORS automatically for deployed web apps
  // No need to manually set headers
  return output
}

/**
 * Manual test function - Run this directly in the script editor
 */
function testManually() {
  console.log('🧪 Running manual test...')
  
  try {
    // Test the doPost function with no parameters (simulates manual run)
    const result = doPost()
    console.log('✅ Manual test result:', result.getContent())
    
    // Also test doGet
    const getResult = doGet({parameter: {action: 'test'}})
    console.log('✅ GET test result:', getResult.getContent())
    
    return 'Tests completed successfully!'
    
  } catch (error) {
    console.error('❌ Manual test failed:', error)
    return 'Test failed: ' + error.toString()
  }
}
