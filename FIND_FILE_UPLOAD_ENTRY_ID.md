# Find File Upload Entry ID - Specific Steps

## Your Current Entry IDs (✅ COMPLETE):
1. `entry.470858559` → Full Name ✅
2. `entry.1574003417` → City ✅
3. `entry.1394621864` → Email Address ✅
4. `entry.163869454` → Phone Number ✅
5. `entry.1222485795` → Date of Birth ✅
6. `entry.1667748542` → Gender ✅
7. `entry.808555411` → Experience Level ✅
8. `entry.736087672` → Primary Skills ✅
9. `entry.825280997` → Instagram Profile ✅
10. `entry.2037686470` → Portfolio/YouTube ✅
11. **❌ MISSING:** File Upload Entry ID

## How to Find File Upload Entry ID:

### Method 1: Browser Inspector (Recommended)
1. **Open your Google Form**: https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform

2. **Open Developer Tools**: Press `F12`

3. **Navigate to the File Upload Question**: Scroll down to "Question 11: Headshot or Resume"

4. **Inspect the File Upload Field**:
   - Right-click on the file upload button/area
   - Select "Inspect" or "Inspect Element"

5. **Look for the Entry ID**:
   - In the HTML, look for an input element with `type="file"`
   - Find the `name` attribute, it will look like: `name="entry.XXXXXXXXX"`
   - Example: `<input type="file" name="entry.123456789" ...>`

6. **Copy the Entry ID**: Note down the number after `entry.`

### Method 2: Pre-filled Link Method
1. **Get Pre-filled Link**: 
   - In your Google Form, click ⋮ menu → "Get pre-filled link"

2. **Fill All Fields BUT Skip File Upload**:
   - Fill all 10 text fields with test data
   - **DO NOT** upload a file (file uploads don't work in pre-filled links)

3. **Get the Link**: Click "Get link" and copy the URL

4. **Open Form in Inspect Mode**:
   - Paste the pre-filled URL in browser
   - Open Developer Tools (`F12`)
   - Find the file upload section
   - Look for `name="entry.XXXXXXXXX"` in a file input

## Expected Result:
You should find something like:
```html
<input type="file" name="entry.987654321" accept="image/*,application/pdf" ...>
```

The number `987654321` would be your file upload entry ID.

## Once You Find It:
Tell me: "File upload entry ID is entry.XXXXXXXXX" and I'll update your code immediately.

## Why File Upload is Different:
- Regular form fields can be extracted from pre-filled URLs
- File uploads require browser inspection because they can't be pre-filled
- Google Forms handles file uploads differently (they go to Google Drive)

## Current Status:
✅ Your form has 10/11 entry IDs correctly mapped  
❌ Need 1 more: File Upload entry ID

Let me know when you find it!
