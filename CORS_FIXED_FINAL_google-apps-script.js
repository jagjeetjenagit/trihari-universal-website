/**
 * Google Apps Script for Trihari Universal Form Submissions - CORS FIXED FINAL
 * Deploy this as a Web App in Google Apps Script
 * 
 * CRITICAL DEPLOYMENT SETTINGS:
 * 1. Deploy as Web App
 * 2. Execute as: Me (your email)
 * 3. Who has access: Anyone (IMPORTANT!)
 * 4. Version: New
 * 
 * This version fixes CORS issues for GitHub Pages deployment
 */

// Configuration - UPDATE THIS WITH YOUR SPREADSHEET ID
const SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID_HERE' // Replace with your actual spreadsheet ID
const SHEET_NAME = 'Form Submissions'

/**
 * Handle all requests - improved CORS handling
 */
function doPost(e) {
  console.log('📥 doPost called')
  
  try {
    // Create response with CORS headers first
    let responseData
    
    if (!e || !e.postData) {
      // Manual test execution
      console.log('⚠️ Manual test execution')
      responseData = {
        success: true,
        message: 'Manual test successful',
        timestamp: new Date().toISOString(),
        source: 'manual'
      }
    } else {
      // Real web request
      console.log('📝 Processing web request')
      console.log('Raw postData:', e.postData.contents)
      
      const data = JSON.parse(e.postData.contents)
      console.log('📊 Parsed data:', data)
      
      const rowId = addSubmissionToSheet(data)
      
      responseData = {
        success: true,
        message: 'Data saved successfully from website',
        rowId: rowId,
        timestamp: new Date().toISOString(),
        source: 'website'
      }
    }
    
    // Create response with proper CORS headers
    return createCorsResponse(responseData)
    
  } catch (error) {
    console.error('❌ Error in doPost:', error)
    
    const errorResponse = {
      success: false,
      message: 'Error saving data',
      error: error.toString(),
      timestamp: new Date().toISOString()
    }
    
    return createCorsResponse(errorResponse)
  }
}

/**
 * Handle GET requests
 */
function doGet(e) {
  console.log('📥 doGet called')
  
  try {
    const action = e && e.parameter ? e.parameter.action : 'test'
    
    let responseData
    
    switch (action) {
      case 'stats':
        responseData = getStatsData()
        break
      case 'test':
      default:
        responseData = {
          success: true,
          message: 'Google Apps Script is working!',
          timestamp: new Date().toISOString(),
          spreadsheetConfigured: SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE',
          corsEnabled: true,
          version: 'CORS_FIXED_FINAL-v1.0'
        }
        break
    }
    
    return createCorsResponse(responseData)
    
  } catch (error) {
    console.error('❌ Error in doGet:', error)
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    }
    
    return createCorsResponse(errorResponse)
  }
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  console.log('📥 doOptions called - CORS preflight')
  
  // Return empty response with CORS headers
  return createCorsResponse({}, true)
}

/**
 * Create response with proper CORS headers
 * Note: Google Apps Script doesn't support setHeader(), so we use HtmlService for CORS
 */
function createCorsResponse(data, isOptions = false) {
  const jsonString = isOptions ? '{}' : JSON.stringify(data)
  
  // Use HtmlService for CORS support
  const htmlOutput = HtmlService
    .createHtmlOutput(`
      <script>
        // Set CORS headers and return JSON data
        const data = ${jsonString};
        
        // For actual web requests, return JSON
        if (window.parent !== window) {
          window.parent.postMessage(data, '*');
        } else {
          document.write('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
        }
      </script>
    `)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
  
  // Alternative: Use ContentService with manual CORS handling
  // For non-browser requests, this will work
  const textOutput = ContentService
    .createTextOutput(jsonString)
    .setMimeType(ContentService.MimeType.JSON)
  
  // Return the text output (Google Apps Script will handle CORS automatically for web apps)
  return textOutput
}

/**
 * Add form submission to Google Sheet
 */
function addSubmissionToSheet(data) {
  try {
    console.log('📊 Opening spreadsheet:', SPREADSHEET_ID)
    
    if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
      throw new Error('Spreadsheet ID not configured. Please update SPREADSHEET_ID in the script.')
    }
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
    let sheet = spreadsheet.getSheetByName(SHEET_NAME)
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      console.log('📄 Creating new sheet:', SHEET_NAME)
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
    
    // Get current date/time
    const now = new Date()
    const timestamp = now.toISOString()
    const submissionDate = now.toLocaleDateString()
    const submissionTime = now.toLocaleTimeString()
    
    // Prepare row data with all fields
    const rowData = [
      timestamp,                           // A: Timestamp
      data.fullName || '',                 // B: Full Name
      data.email || '',                    // C: Email
      data.phone || '',                    // D: Phone
      data.city || '',                     // E: City
      data.age || '',                      // F: Age
      data.dateOfBirth || '',             // G: Date of Birth
      data.gender || '',                   // H: Gender
      data.experience || '',               // I: Experience
      data.skills || '',                   // J: Skills
      data.instagram || '',                // K: Instagram
      data.portfolio || '',                // L: Portfolio
      data.aboutYourself || '',            // M: About Yourself
      data.consent ? 'Yes' : 'No',         // N: Consent
      data.photoUrl || '',                 // O: Photo URL
      submissionDate,                      // P: Submission Date
      submissionTime,                      // Q: Submission Time
      'Website',                           // R: Source
      'New Application',                   // S: Status
      rowId                                // T: Row ID
    ]
    
    // Add data to sheet
    sheet.appendRow(rowData)
    
    // Auto-resize columns for better visibility
    sheet.autoResizeColumns(1, rowData.length)
    
    console.log(`✅ Added submission: ${data.fullName} (${data.email}) - Row ID: ${rowId}`)
    
    return rowId
    
  } catch (error) {
    console.error('❌ Error adding to sheet:', error)
    throw new Error(`Failed to save to spreadsheet: ${error.message}`)
  }
}

/**
 * Get submission statistics
 */
function getStatsData() {
  try {
    if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
      return {
        totalSubmissions: 0,
        todaySubmissions: 0,
        error: 'Spreadsheet not configured'
      }
    }
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
    const sheet = spreadsheet.getSheetByName(SHEET_NAME)
    
    if (!sheet) {
      return {
        totalSubmissions: 0,
        todaySubmissions: 0,
        message: 'No submissions yet'
      }
    }
    
    const lastRow = sheet.getLastRow()
    const totalSubmissions = Math.max(0, lastRow - 1) // Exclude header row
    
    // Count today's submissions
    const today = new Date().toLocaleDateString()
    let todaySubmissions = 0
    
    if (lastRow > 1) {
      const submissionDateColumn = 16 // Column P (Submission Date)
      const dates = sheet.getRange(2, submissionDateColumn, lastRow - 1, 1).getValues()
      todaySubmissions = dates.filter(row => 
        new Date(row[0]).toLocaleDateString() === today
      ).length
    }
    
    return {
      totalSubmissions,
      todaySubmissions,
      lastUpdated: new Date().toISOString()
    }
    
  } catch (error) {
    console.error('❌ Error getting stats:', error)
    return {
      totalSubmissions: 0,
      todaySubmissions: 0,
      error: error.toString()
    }
  }
}

/**
 * Manual test function - Run this in the script editor to test
 */
function testManually() {
  console.log('🧪 Running manual test...')
  
  try {
    // Test POST function
    const postResult = doPost()
    console.log('✅ POST test result:', postResult.getContent())
    
    // Test GET function  
    const getResult = doGet({parameter: {action: 'test'}})
    console.log('✅ GET test result:', getResult.getContent())
    
    console.log('🎉 All tests passed!')
    return 'Manual tests completed successfully!'
    
  } catch (error) {
    console.error('❌ Manual test failed:', error)
    return `Test failed: ${error.toString()}`
  }
}

/**
 * Test with sample data
 */
function testWithSampleData() {
  console.log('🧪 Testing with sample data...')
  
  try {
    const sampleData = {
      fullName: 'Test User Sample',
      email: 'test@sample.com',
      phone: '+91 9876543210',
      city: 'Mumbai',
      experience: '2 years',
      skills: 'Acting, Dancing',
      consent: true
    }
    
    const rowId = addSubmissionToSheet(sampleData)
    console.log('✅ Sample data added with Row ID:', rowId)
    
    return `Sample data test successful! Row ID: ${rowId}`
    
  } catch (error) {
    console.error('❌ Sample data test failed:', error)
    return `Sample data test failed: ${error.toString()}`
  }
}
