# Find the Missing 11th Entry ID (File Upload)

## Current Status:
✅ Google Form has 11 questions (confirmed)  
✅ We have 10 entry IDs mapped  
❌ Missing 1 entry ID (file upload field)

## Your Current Entry IDs:
1. `entry.470858559` → Question 1
2. `entry.1574003417` → Question 2  
3. `entry.1394621864` → Question 3
4. `entry.163869454` → Question 4
5. `entry.1222485795` → Question 5
6. `entry.1667748542` → Question 6
7. `entry.808555411` → Question 7
8. `entry.736087672` → Question 8
9. `entry.825280997` → Question 9
10. `entry.2037686470` → Question 10
11. **❌ MISSING** → Question 11 (File Upload)

## Method 1: Browser Inspector (Most Reliable)

### Step 1: Open Your Google Form
Go to: https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform

### Step 2: Find Question 11
- Scroll down to the **last question** (Question 11)
- It should be the file upload field
- Look for a question about "Headshot" or "Resume" or similar

### Step 3: Inspect the File Upload Field
1. **Right-click** on the file upload area/button
2. **Select "Inspect Element"**
3. **Look for an input with `type="file"`**
4. **Find the `name` attribute** - it will look like: `name="entry.XXXXXXXXX"`

### Example of what you're looking for:
```html
<input type="file" name="entry.123456789" accept="image/*,application/pdf" ...>
```

The number `123456789` would be your file upload entry ID.

## Method 2: Console Command

### Step 1: Open Your Google Form
Go to the form view page (same URL as above)

### Step 2: Open Browser Console
- Press `F12`
- Go to **Console** tab

### Step 3: Run This Command
Copy and paste this exactly:
```javascript
document.querySelectorAll('input[type="file"]').forEach(input => {
  console.log('File upload entry ID:', input.name);
});
```

This will show you the file upload entry ID directly.

## Method 3: Check All Entry IDs

Run this command in the console to see ALL entry IDs:
```javascript
document.querySelectorAll('[name^="entry."]').forEach(el => {
  console.log(`${el.name} - Type: ${el.type || el.tagName} - Question: ${el.closest('[data-question-index]')?.getAttribute('data-question-index') || 'Unknown'}`);
});
```

This will list all 11 entry IDs with their types.

## What You Should Find:
You should see something like:
- `entry.470858559` - Type: text
- `entry.1574003417` - Type: text
- `entry.1394621864` - Type: email
- `entry.163869454` - Type: text
- `entry.1222485795` - Type: date
- `entry.1667748542` - Type: radio
- `entry.808555411` - Type: radio
- `entry.736087672` - Type: text
- `entry.825280997` - Type: text
- `entry.2037686470` - Type: text
- **`entry.XXXXXXXXX` - Type: file** ← This is what we need!

## Once You Find It:
Tell me: "File upload entry ID is entry.XXXXXXXXX" and I'll update your code immediately.

## Alternative Quick Test:
If you can't find it through inspection, try these common patterns:
- entry.1234567890 (higher number)
- entry.987654321 (different pattern)
- entry.1111111111 (repeating pattern)

Try Method 2 (console command) first - it's the quickest!
