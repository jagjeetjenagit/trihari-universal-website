# How to Find Google Form Entry IDs - Step by Step

## Method 1: Using Browser Inspector (Most Reliable)

### Step 1: Open Your Google Form
1. Go to your Google Form: https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform
2. Make sure the form loads completely

### Step 2: Open Developer Tools
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I`
- **Firefox**: Press `F12` or `Ctrl+Shift+I`

### Step 3: Find Entry IDs
1. Click on the **Elements** tab in Developer Tools
2. Press `Ctrl+F` to open the search box
3. Search for: `entry.` 
4. You'll see highlighted results like `entry.123456789`

### Step 4: Map Each Field
Look for these patterns and note down the entry IDs:

#### Full Name Field:
- Search for: `name="entry.` 
- Look for input field near text like "Full Name"
- Example: `<input name="entry.1234567890" ...>`

#### City Field:
- Look for input field near "City"
- Example: `<input name="entry.0987654321" ...>`

#### Email Field:
- Look for input field near "Email"
- Example: `<input name="entry.1122334455" ...>`

#### Phone Field:
- Look for input field near "Phone"
- Example: `<input name="entry.5544332211" ...>`

#### File Upload Field:
- Look for input with `type="file"`
- Example: `<input name="entry.1696159737" type="file" ...>`

## Method 2: Pre-filled Link Method

### Step 1: Get Pre-filled Link
1. In your Google Form, click the **⋮** (three dots) menu
2. Select **"Get pre-filled link"**

### Step 2: Fill Test Data
Fill in test data for each field:
- **Full Name**: Test User
- **City**: Mumbai
- **Email**: test@example.com
- **Phone**: +91 9876543210
- **Gender**: Male
- **Experience**: 2 years
- **Skills**: Acting
- **Instagram**: https://instagram.com/test
- **Portfolio**: https://youtube.com/test

### Step 3: Get the Link
1. Click **"Get link"**
2. Copy the generated URL
3. The URL will look like:
```
https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform?usp=pp_url&entry.1234567890=Test+User&entry.0987654321=Mumbai&entry.1122334455=test@example.com&entry.5544332211=+91+9876543210&entry.1696159737=Male...
```

### Step 4: Extract Entry IDs
From the URL, extract the entry IDs:
- `entry.1234567890` = Full Name
- `entry.0987654321` = City  
- `entry.1122334455` = Email
- `entry.5544332211` = Phone
- `entry.1696159737` = Gender
- etc.

## Quick Reference Template

Once you find the entry IDs, update your code:

```javascript
const fields = {
  'entry.XXXXXXXXX': formData.get('fullName'),     // Replace with Full Name entry ID
  'entry.YYYYYYYYY': formData.get('city'),        // Replace with City entry ID
  'entry.ZZZZZZZZZ': formData.get('email'),       // Replace with Email entry ID
  'entry.AAAAAAAAA': formData.get('phone'),       // Replace with Phone entry ID
  'entry.BBBBBBBBB': formData.get('dob'),         // Replace with DOB entry ID
  'entry.CCCCCCCCC': formData.get('gender'),      // Replace with Gender entry ID
  'entry.DDDDDDDDD': formData.get('experience'),  // Replace with Experience entry ID
  'entry.EEEEEEEEE': formData.get('skills'),      // Replace with Skills entry ID
  'entry.FFFFFFFFF': formData.get('instagram'),   // Replace with Instagram entry ID
  'entry.GGGGGGGGG': formData.get('portfolio'),   // Replace with Portfolio entry ID
  'entry.HHHHHHHHH': photoFile                    // Replace with File Upload entry ID
}
```

## Important Notes:
- Entry IDs are unique for each form
- They don't change once created
- File upload fields have the same `entry.` format
- Make sure to map each field correctly

## Need Help?
If you're still having trouble, send me a screenshot of your browser's Developer Tools showing the form fields, and I can help identify the correct entry IDs.
