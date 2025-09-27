# Manual Method to Find File Upload Entry ID

## Since Console Command is Blocked:

### Method 1: Manual Inspection
1. **Go to your Google Form**: https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform

2. **Find Question 11** (scroll to the bottom)
   - Look for the file upload question
   - It should say something like "Headshot or Resume" or "Upload files"

3. **Right-click on the file upload area**
   - Select "Inspect Element" or "Inspect"

4. **Look for the HTML code**
   - Find a line that looks like: `<input type="file" name="entry.XXXXXXXXX" ...>`
   - The XXXXXXXXX is your file upload entry ID

### Method 2: View Page Source
1. **Go to your Google Form**
2. **Right-click anywhere** → **View Page Source**
3. **Press Ctrl+F** to search
4. **Search for**: `type="file"`
5. **Look for**: `name="entry.` near the file input
6. **Copy the entry ID**

### Method 3: Network Tab Method
1. **Go to your Google Form**
2. **Open DevTools** (F12)
3. **Go to Network tab**
4. **Fill out the form completely** with test data
5. **Select a file** for upload
6. **Submit the form**
7. **Look for requests** to Google Forms
8. **Check the request payload** for entry IDs

### Method 4: Pre-filled Link Method
1. **In your Google Form**, click the **⋮** menu (three dots)
2. **Select "Get pre-filled link"**
3. **Fill out ALL fields EXCEPT the file upload**
4. **Click "Get link"**
5. **Copy the URL** - it will show all entry IDs except the file upload
6. **Compare with your current 10 entry IDs** to see which one is missing

## What You're Looking For:
An entry ID that's NOT in your current list:
- entry.470858559 ✅
- entry.1574003417 ✅
- entry.1394621864 ✅
- entry.163869454 ✅
- entry.1222485795 ✅
- entry.1667748542 ✅
- entry.808555411 ✅
- entry.736087672 ✅
- entry.825280997 ✅
- entry.2037686470 ✅
- **entry.XXXXXXXXX** ❌ (This is what we need!)

## Common File Upload Entry ID Patterns:
File upload entry IDs are often:
- Higher numbers (like entry.1696159737)
- Different pattern from text fields
- Sometimes lower numbers

Try Method 1 (manual inspection) first - it's the most reliable when console is blocked!
