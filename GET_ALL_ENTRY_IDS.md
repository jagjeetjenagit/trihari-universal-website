# Get ALL Entry IDs - Step by Step

## Method: Pre-filled Link (Most Complete)

### Step 1: Open Your Google Form
Go to: https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform

### Step 2: Get Pre-filled Link
1. Click the **⋮** (three dots) menu at the top right
2. Select **"Get pre-filled link"**

### Step 3: Fill ALL Fields with Test Data
Fill out EVERY field in your form with test data:

- **Full Name**: Test User
- **City**: Mumbai  
- **Email Address**: test@example.com
- **Phone Number**: +91 9876543210
- **Date of Birth**: Select any date (e.g., Jan 1, 1995)
- **Gender**: Select "Male" (or any option)
- **Acting/Performance Experience**: Select "2 years" (or any option)
- **Primary Skills & Talents**: Acting, Dancing
- **Instagram Profile**: https://instagram.com/testuser
- **Portfolio or YouTube Link**: https://youtube.com/testchannel
- **Headshot or Resume**: (Skip this for now, we'll handle file upload separately)

### Step 4: Get the Pre-filled Link
1. Click **"Get link"** at the bottom
2. Copy the ENTIRE URL that appears

### Step 5: Extract Entry IDs
The URL will look something like this:
```
https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform?usp=pp_url&entry.123456789=Test+User&entry.987654321=Mumbai&entry.555666777=test@example.com&entry.111222333=+91+9876543210&entry.444555666=1995-01-01&entry.777888999=Male&entry.333444555=2+years&entry.666777888=Acting,+Dancing&entry.999000111=https://instagram.com/testuser&entry.222333444=https://youtube.com/testchannel
```

From this URL, extract each `entry.XXXXXXXXX` and what it corresponds to.

### What We Found So Far:
- `entry.825280997` - Unknown field (we need to identify)
- `entry.2037686470` - Unknown field (we need to identify)

### What We Need:
Based on your form, we need entry IDs for:
1. Full Name
2. City  
3. Email Address
4. Phone Number
5. Date of Birth
6. Gender
7. Experience Level
8. Primary Skills
9. Instagram Profile  
10. Portfolio/YouTube
11. File Upload (Headshot/Resume)

## Next Steps:
1. Get the complete pre-filled URL with ALL fields filled
2. Send me the full URL
3. I'll extract all entry IDs and update your code

OR

If you want to do it yourself:
1. From the pre-filled URL, identify which entry ID corresponds to which field
2. Let me know the mapping (e.g., "entry.123456789 = Full Name")
3. I'll update your code accordingly
