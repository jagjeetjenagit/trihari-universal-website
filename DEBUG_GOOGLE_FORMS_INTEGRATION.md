# DEBUG: Google Forms Integration Not Working

## Step-by-Step Debugging Process

### Step 1: Test Individual Entry IDs
1. **Open the test file**: `c:\trihari universal\test-entry-ids.html`
2. **Test each entry ID individually** by clicking the test buttons
3. **Check Google Forms responses** after each test
4. **Report which ones work**

### Step 2: Verify Google Form Structure
Go to your Google Form edit page and confirm:
- How many questions are there exactly?
- What is the exact wording of each question?
- What are the question types (text, multiple choice, etc.)?

### Step 3: Get Fresh Entry IDs
If the current entry IDs don't work, we need to get fresh ones:

#### Method A: Browser Console
1. Go to your Google Form (view mode)
2. Open browser console (F12)
3. Run this command:
```javascript
// Get all form inputs with their names
Array.from(document.querySelectorAll('input, select, textarea')).map(el => ({
  name: el.name,
  type: el.type || el.tagName.toLowerCase(),
  placeholder: el.placeholder || '',
  required: el.required
})).filter(item => item.name && item.name.includes('entry.')).forEach((item, index) => {
  console.log(`${index + 1}. ${item.name} - Type: ${item.type} - Required: ${item.required}`);
});
```

#### Method B: Pre-filled Link (For Non-File Fields)
1. In your Google Form, click ⋮ → "Get pre-filled link"
2. Fill ONLY the text fields with test data:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Phone: "+91 1234567890"
   - Age: "25"
   - Experience: Select an option
   - Skills: "Acting"
   - Instagram: "https://instagram.com/test"
   - Portfolio: "https://youtube.com/test"
   - About yourself: "Test description"
   - Consent: Check the box
3. Click "Get link"
4. Copy the URL and extract all entry IDs

### Step 4: Common Issues to Check

#### Issue 1: Form URL Format
Your current URL: `https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/formResponse`

Try alternative format: `https://docs.google.com/forms/u/0/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/formResponse`

#### Issue 2: Field Value Formats
- Multiple choice fields need exact option text
- Checkboxes might need specific values
- Date fields need specific formats

#### Issue 3: Required Fields
If any required field is missing, the entire submission might fail.

### Step 5: Manual Test
Fill out your Google Form manually with the browser to ensure it's working correctly.

## Current Status
- ✅ 10 entry IDs identified
- ✅ Website form updated with all fields
- ❌ No responses recorded in Google Forms
- ❌ Entry ID mapping needs verification

## Next Actions:
1. **Test the HTML file** to identify working entry IDs
2. **Get fresh entry IDs** if current ones don't work
3. **Update the mapping** based on test results
4. **Re-test the website form**
