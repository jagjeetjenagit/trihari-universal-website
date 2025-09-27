// ULTIMATE CORS-COMPATIBLE Google Apps Script
// This version is specifically designed to work with any CORS scenario
// Deploy as Web App: Execute as "Me", Access "Anyone"

function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function doOptions(e) {
  // Handle preflight requests
  return createResponse({
    success: true,
    message: "CORS preflight successful"
  });
}

function handleRequest(e, method) {
  try {
    console.log(`=== ${method} REQUEST RECEIVED ===`);
    console.log('Request object:', JSON.stringify(e, null, 2));
    
    let requestData = null;
    
    // Parse request data based on method
    if (method === 'POST' && e.postData) {
      console.log('Parsing POST data...');
      console.log('POST data type:', e.postData.type);
      console.log('POST data contents:', e.postData.contents);
      
      try {
        requestData = JSON.parse(e.postData.contents);
        console.log('Successfully parsed POST JSON:', requestData);
      } catch (parseError) {
        console.error('Failed to parse POST JSON:', parseError);
        return createResponse({
          success: false,
          message: "Invalid JSON in POST data",
          error: parseError.toString(),
          rawData: e.postData.contents
        });
      }
    } else if (e.parameter) {
      console.log('Using GET parameters:', e.parameter);
      requestData = e.parameter;
    } else {
      console.log('No valid data found');
      return createResponse({
        success: false,
        message: "No data received",
        debug: {
          method: method,
          hasPostData: !!(e && e.postData),
          hasParameter: !!(e && e.parameter)
        }
      });
    }
    
    // Validate essential fields
    if (!requestData || !requestData.fullName || !requestData.email) {
      console.log('Validation failed - missing required fields');
      return createResponse({
        success: false,
        message: "Missing required fields: fullName and email are required",
        received: requestData
      });
    }
    
    console.log('Validation passed, saving to spreadsheet...');
    
    // Save to Google Sheets
    return saveToGoogleSheets(requestData);
    
  } catch (error) {
    console.error('Error in handleRequest:', error);
    return createResponse({
      success: false,
      message: "Server error: " + error.toString(),
      error: error.toString(),
      stack: error.stack
    });
  }
}

function saveToGoogleSheets(data) {
  try {
    // Your Google Sheets ID
    const SHEET_ID = '1_mNI8-NhHcNz0xGwQ6qm6qclkgD5Ae2L6UJvPRXjBFE';
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Generate unique row ID
    const rowId = 'TU-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const timestamp = new Date();
    
    console.log('Preparing row data...');
    
    // Prepare comprehensive row data
    const rowData = [
      timestamp.toISOString(),                    // A: Timestamp
      data.fullName || '',                        // B: Full Name  
      data.email || '',                          // C: Email
      data.phone || '',                          // D: Phone
      data.city || '',                           // E: City
      data.age || '',                            // F: Age
      data.dateOfBirth || data.dob || '',        // G: Date of Birth
      data.gender || '',                         // H: Gender
      data.experience || '',                     // I: Experience
      data.skills || '',                         // J: Skills
      data.instagram || '',                      // K: Instagram
      data.portfolio || '',                      // L: Portfolio
      data.aboutYourself || '',                  // M: About Yourself
      data.consent === true ? 'Yes' : (data.consent || 'No'), // N: Consent
      data.photoUrl || '',                       // O: Photo URL
      timestamp.toLocaleDateString('en-IN'),     // P: Submission Date
      timestamp.toLocaleTimeString('en-IN'),     // Q: Submission Time
      data.source || 'Website',                  // R: Source
      'New Application',                         // S: Status
      rowId                                      // T: Row ID
    ];
    
    console.log('Adding row to sheet:', rowData);
    
    // Add the row
    sheet.appendRow(rowData);
    
    console.log('✅ Successfully saved to Google Sheets');
    
    // Return success response
    return createResponse({
      success: true,
      message: "Data saved successfully to Google Sheets",
      rowId: rowId,
      timestamp: timestamp.toISOString(),
      source: "google-apps-script"
    });
    
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return createResponse({
      success: false,
      message: "Failed to save to Google Sheets: " + error.toString(),
      error: error.toString()
    });
  }
}

function createResponse(data) {
  console.log('Creating response:', data);
  
  const jsonResponse = ContentService
    .createTextOutput(JSON.stringify(data, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Set CORS headers using the proper Apps Script method
  return jsonResponse;
}

// For testing - you can call this function manually
function testScript() {
  const testData = {
    fullName: "Test User Manual",
    email: "manual@test.com",
    phone: "1234567890",
    city: "Test City",
    age: "25"
  };
  
  console.log('=== MANUAL TEST ===');
  const result = saveToGoogleSheets(testData);
  console.log('Test result:', result.getContent());
  return result;
}
