/**
 * Google Apps Script for Trihari Universal - SIMPLE WORKING VERSION
 * This version works with Google Apps Script's API limitations
 */

// Configuration - REPLACE WITH YOUR SPREADSHEET ID
const SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID_HERE'
const SHEET_NAME = 'Form Submissions'

/**
 * Handle POST requests (form submissions)
 */
function doPost(e) {
  console.log('📥 doPost called')
  
  try {
    let responseData
    
    if (!e || !e.postData) {
      // Manual test
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
      const data = JSON.parse(e.postData.contents)
      console.log('📊 Data received:', data)
      
      const rowId = addSubmissionToSheet(data)
      
      responseData = {
        success: true,
        message: 'Data saved successfully from website',
        rowId: rowId,
        timestamp: new Date().toISOString(),
        source: 'website'
      }
    }
    
    // Return JSON response (Google Apps Script handles CORS automatically for web apps)
    return ContentService
      .createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON)
    
  } catch (error) {
    console.error('❌ Error in doPost:', error)
    
    const errorResponse = {
      success: false,
      message: 'Error saving data',
      error: error.toString(),
      timestamp: new Date().toISOString()
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

/**
 * Handle GET requests (testing and stats)
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
          spreadsheetConfigured: SPREADSHEET_ID !== 'YOUR_ACTUAL_SPREADSHEET_ID_HERE',
          corsEnabled: true,
          version: 'SIMPLE_WORKING-v1.0'
        }
        break
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON)
    
  } catch (error) {
    console.error('❌ Error in doGet:', error)
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

/**
 * Add form submission to Google Sheet
 */
function addSubmissionToSheet(data) {
  try {
    console.log('📊 Opening spreadsheet:', SPREADSHEET_ID)
    
    if (SPREADSHEET_ID === 'YOUR_ACTUAL_SPREADSHEET_ID_HERE') {
      throw new Error('Please update SPREADSHEET_ID in the script')
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
    }
    
    // Generate unique row ID
    const rowId = `TU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Get current date/time
    const now = new Date()
    const timestamp = now.toISOString()
    const submissionDate = now.toLocaleDateString()
    const submissionTime = now.toLocaleTimeString()
    
    // Prepare row data
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
    
    // Auto-resize columns
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
    if (SPREADSHEET_ID === 'YOUR_ACTUAL_SPREADSHEET_ID_HERE') {
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
      const submissionDateColumn = 16 // Column P
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
 * Manual test function
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
      experience: '2',
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
