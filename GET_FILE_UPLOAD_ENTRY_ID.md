# How to Get File Upload Entry ID from Google Forms

Since you already have the file upload field set up in your Google Form, you need to get its Entry ID to connect it with your website.

## Steps to Get File Upload Entry ID:

### Method 1: Inspect Element (Easiest)
1. **Open your Google Form** in edit mode
2. **Click on the File Upload question** (Question 11: "Headshot or Resume")
3. **Right-click** on the file upload area → **Inspect Element**
4. **Look for** an input element with name like: `entry.XXXXXXXXX`
5. **Copy the entry ID** (the numbers after "entry.")

### Method 2: Pre-filled Link
1. **In your Google Form**, click **⋮** (three dots) → **Get pre-filled link**
2. **Fill in test data** for all text fields
3. **For the file upload field**: You won't be able to pre-fill it, but the URL will show the entry ID
4. **Click "Get link"**
5. **Look at the URL** - you'll see `entry.XXXXXXXXX` for each field
6. **The file upload entry ID** will be in there (might be empty in URL but visible in form)

### Method 3: View Page Source
1. **Open your Google Form** (the public view, not edit)
2. **Right-click** → **View page source**
3. **Search for** "file" or "upload" 
4. **Look for** `name="entry.XXXXXXXXX"` near file upload elements

## Update Your Code:

Once you have the entry ID, replace `FILE_UPLOAD_ENTRY_ID` in your code:

```javascript
// Replace FILE_UPLOAD_ENTRY_ID with your actual entry ID
googleFormData.append('entry.YOUR_ACTUAL_ENTRY_ID', headshot)
```

For example, if your entry ID is `1696159737`, it would be:
```javascript
googleFormData.append('entry.1696159737', headshot)
```

## Complete Entry ID List Needed:

Based on your Google Form, you need these entry IDs:

1. `entry.XXXXXXX` - Full Name
2. `entry.XXXXXXX` - City  
3. `entry.XXXXXXX` - Email Address
4. `entry.XXXXXXX` - Phone Number
5. `entry.XXXXXXX` - Date of Birth (optional)
6. `entry.XXXXXXX` - Gender (optional)
7. `entry.XXXXXXX` - Acting/Performance Experience
8. `entry.XXXXXXX` - Primary Skills & Talents
9. `entry.XXXXXXX` - Instagram Profile (optional)
10. `entry.XXXXXXX` - Portfolio or YouTube Link (optional)
11. `entry.XXXXXXX` - **Headshot or Resume (FILE UPLOAD)** ← This is the important one!

## Test File Upload:

1. **Get the file upload entry ID**
2. **Update your code** with the correct entry ID
3. **Test the form** with a small image file
4. **Check Google Forms responses** - you should see the uploaded file
5. **Check your Google Drive** - uploaded files are stored in a "Form Responses" folder

The file will be automatically uploaded to Google Drive and linked in your form responses!
