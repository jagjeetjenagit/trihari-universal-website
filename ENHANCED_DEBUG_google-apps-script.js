// Enhanced Google Apps Script for better CORS proxy compatibility
// Deploy as Web App with "Anyone" access

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function doOptions(e) {
  return createCorsResponse({
    success: true,
    message: "CORS preflight OK"
  });
}

function handleRequest(e) {
  try {
    // Enhanced logging
    console.log('=== REQUEST RECEIVED ===');
    console.log('Method:', e?.parameter ? 'GET' : 'POST');
    console.log('Headers available:', Object.keys(e || {}));
    console.log('Raw input:', e);
    
    let requestData = null;
    
    // Handle different data sources
    if (e.postData) {
      console.log('POST data type:', e.postData.type);
      console.log('POST data contents:', e.postData.contents);
      requestData = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      console.log('GET parameters:', e.parameter);
      requestData = e.parameter;
    } else {
      console.log('No data found in request');
      return createCorsResponse({
        success: false,
        message: "No data received",
        debug: {
          hasPostData: !!e.postData,
          hasParameter: !!e.parameter,
          rawRequest: e
        }
      });
    }
    
    console.log('Parsed request data:', requestData);
    
    // Validate required fields
    if (!requestData.fullName || !requestData.email) {
      return createCorsResponse({
        success: false,
        message: "Missing required fields (fullName, email)",
        received: requestData
      });
    }
    
    // Open the spreadsheet
    const SHEET_ID = '1_mNI8-NhHcNz0xGwQ6qm6qclkgD5Ae2L6UJvPRXjBFE';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Generate unique ID
    const rowId = 'TU-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    
    // Prepare row data with all fields
    const rowData = [
      new Date().toISOString(), // A: Timestamp
      requestData.fullName || '', // B: Full Name
      requestData.email || '', // C: Email
      requestData.phone || '', // D: Phone
      requestData.city || '', // E: City
      requestData.age || '', // F: Age
      requestData.dateOfBirth || requestData.dob || '', // G: Date of Birth
      requestData.gender || '', // H: Gender
      requestData.experience || '', // I: Experience
      requestData.skills || '', // J: Skills
      requestData.instagram || '', // K: Instagram
      requestData.portfolio || '', // L: Portfolio
      requestData.aboutYourself || '', // M: About Yourself
      requestData.consent || 'No', // N: Consent
      requestData.photoUrl || '', // O: Photo URL
      requestData.submissionDate || new Date().toLocaleDateString('en-IN'), // P: Submission Date
      requestData.submissionTime || new Date().toLocaleTimeString('en-IN'), // Q: Submission Time
      requestData.source || 'Website', // R: Source
      'New Application', // S: Status
      rowId // T: Row ID
    ];
    
    console.log('Adding row data:', rowData);
    
    // Add data to sheet
    sheet.appendRow(rowData);
    
    console.log('✅ Data saved successfully');
    
    // Return success response
    return createCorsResponse({
      success: true,
      message: "Data saved successfully from website",
      rowId: rowId,
      timestamp: new Date().toISOString(),
      source: "website",
      debug: {
        receivedFields: Object.keys(requestData),
        dataFormat: typeof requestData,
        method: e?.parameter ? 'GET' : 'POST'
      }
    });
    
  } catch (error) {
    console.error('❌ Error in handleRequest:', error);
    
    return createCorsResponse({
      success: false,
      message: "Error saving data: " + error.toString(),
      error: error.toString(),
      stack: error.stack,
      debug: {
        hasPostData: !!(e && e.postData),
        hasParameter: !!(e && e.parameter),
        errorType: error.name
      }
    });
  }
}

function createCorsResponse(data) {
  const response = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
    
  // Add comprehensive CORS headers
  response.getHeaders = function() {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
      'Access-Control-Max-Age': '86400',
      'Content-Type': 'application/json; charset=utf-8'
    };
  };
  
  return response;
}
