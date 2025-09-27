// PRODUCTION Google Apps Script - Handles both JSON and Form Data
// Deploy as Web App: Execute as "Me", Access "Anyone"

function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function doOptions(e) {
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
    
    // Parse request data based on method and content type
    if (method === 'POST' && e.postData) {
      console.log('POST data type:', e.postData.type);
      console.log('POST data contents preview:', e.postData.contents.substring(0, 200));
      
      // Check if data looks like URL-encoded form data (contains = and &)
      const isFormData = e.postData.contents.includes('=') && e.postData.contents.includes('&');
      
      // Handle form data (form submission method) - check content pattern first
      if (isFormData || e.postData.type === 'application/x-www-form-urlencoded') {
        console.log('Parsing as form data...');
        requestData = e.parameter || {};
        console.log('Form data parsed:', requestData);
      }
      // Handle JSON data (direct fetch requests)
      else if (e.postData.type === 'application/json') {
        try {
          requestData = JSON.parse(e.postData.contents);
          console.log('Successfully parsed POST JSON:', requestData);
        } catch (parseError) {
          console.error('Failed to parse POST JSON:', parseError);
          // If JSON parsing fails, try form data as fallback
          console.log('JSON parsing failed, trying form data...');
          requestData = e.parameter || {};
        }
      }
      // Handle other content types
      else {
        console.log('Unknown content type, checking data format...');
        if (isFormData) {
          console.log('Data appears to be form data, using parameters...');
          requestData = e.parameter || {};
        } else {
          try {
            requestData = JSON.parse(e.postData.contents);
          } catch {
            // If JSON parse fails, use parameters
            requestData = e.parameter || {};
          }
        }
      }
    } 
    // Handle GET parameters
    else if (e.parameter) {
      console.log('Using GET parameters:', e.parameter);
      requestData = e.parameter;
    } 
    // No data found
    else {
      console.log('No valid data found');
      return createResponse({
        success: false,
        message: "No data received",
        debug: {
          method: method,
          hasPostData: !!(e && e.postData),
          hasParameter: !!(e && e.parameter),
          postDataType: e?.postData?.type
        }
      });
    }
    
    // Validate essential fields
    if (!requestData || !requestData.fullName || !requestData.email) {
      console.log('Validation failed - missing required fields');
      return createResponse({
        success: false,
        message: "Missing required fields: fullName and email are required",
        received: requestData,
        debug: {
          hasFullName: !!(requestData && requestData.fullName),
          hasEmail: !!(requestData && requestData.email),
          receivedKeys: requestData ? Object.keys(requestData) : []
        }
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
    
    console.log('Preparing row data for:', data);
    
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
      data.consent === 'true' || data.consent === true ? 'Yes' : (data.consent || 'No'), // N: Consent
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
      source: "google-apps-script",
      dataReceived: {
        fullName: data.fullName,
        email: data.email,
        method: data.source || 'form'
      }
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
  
  // Set CORS headers manually
  return jsonResponse;
}

// Test function for manual testing
function testScript() {
  const testData = {
    fullName: "Manual Test User",
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
