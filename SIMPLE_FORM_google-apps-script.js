// ULTIMATE SIMPLE Google Apps Script - Form Data Only
// Deploy as Web App: Execute as "Me", Access "Anyone"

function doPost(e) {
  try {
    console.log('=== FORM SUBMISSION RECEIVED ===');
    console.log('Parameters received:', e.parameter);
    
    // Get form data directly from parameters
    const data = e.parameter || {};
    
    // Validate required fields
    if (!data.fullName || !data.email) {
      console.log('Missing required fields:', {
        hasFullName: !!data.fullName,
        hasEmail: !!data.email,
        allKeys: Object.keys(data)
      });
      
      return createResponse({
        success: false,
        message: "Missing required fields",
        received: Object.keys(data)
      });
    }
    
    console.log('Validation passed, saving to spreadsheet...');
    
    // Save to Google Sheets
    return saveToGoogleSheets(data);
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse({
      success: false,
      message: "Error: " + error.toString()
    });
  }
}

function doGet(e) {
  return createResponse({
    success: true,
    message: "Google Apps Script is running",
    timestamp: new Date().toISOString()
  });
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
    
    console.log('Saving data:', data);
    
    // Prepare row data (matching your form fields)
    const rowData = [
      timestamp.toISOString(),                    // A: Timestamp
      data.fullName || '',                        // B: Full Name  
      data.email || '',                          // C: Email
      data.phone || '',                          // D: Phone
      data.city || '',                           // E: City
      data.age || '',                            // F: Age
      data.dateOfBirth || '',                    // G: Date of Birth
      data.gender || '',                         // H: Gender
      data.experience || '',                     // I: Experience
      data.skills || '',                         // J: Skills
      data.instagram || '',                      // K: Instagram
      data.portfolio || '',                      // L: Portfolio
      data.aboutYourself || '',                  // M: About Yourself
      data.consent || '',                        // N: Consent
      data.photoUrl || '',                       // O: Photo URL
      data.submissionDate || timestamp.toLocaleDateString('en-IN'),  // P: Submission Date
      data.submissionTime || timestamp.toLocaleTimeString('en-IN'),  // Q: Submission Time
      data.source || 'Website',                  // R: Source
      'New Application',                         // S: Status
      rowId                                      // T: Row ID
    ];
    
    console.log('Adding row:', rowData);
    
    // Add the row
    sheet.appendRow(rowData);
    
    console.log('✅ Successfully saved to Google Sheets');
    
    // Return success response
    return createResponse({
      success: true,
      message: "Data saved successfully",
      rowId: rowId,
      timestamp: timestamp.toISOString()
    });
    
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return createResponse({
      success: false,
      message: "Failed to save: " + error.toString()
    });
  }
}

function createResponse(data) {
  console.log('Response:', data);
  
  return ContentService
    .createTextOutput(JSON.stringify(data, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function
function testScript() {
  const testData = {
    fullName: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    city: "Test City"
  };
  
  const result = saveToGoogleSheets(testData);
  console.log('Test result:', result.getContent());
  return result;
}
