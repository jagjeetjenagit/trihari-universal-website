# 🔧 How to Get Google Form Entry IDs - Step by Step

## ⚠️ **Your website has syntax errors that need to be fixed first!**

The terminal shows JSX syntax errors. Let me help you get the entry IDs and fix the code.

## 📋 **Method 1: Manual Entry ID Discovery**

### **Step 1: Open Your Google Form**
1. Go to: https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform
2. Fill out the form with test data
3. **DON'T SUBMIT YET!**

### **Step 2: Inspect the Form**
1. **Right-click anywhere on the page** → **"Inspect"** or press **F12**
2. **Look for the Console tab** in developer tools
3. **Paste this JavaScript code** in the console:

```javascript
// Run this in your browser console on the Google Form page
const inputs = document.querySelectorAll('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]');
console.log('=== GOOGLE FORM ENTRY IDs ===');
inputs.forEach((input, index) => {
    const label = input.closest('.Qr7Oae')?.querySelector('.M7eMe') || 
                  input.closest('.geS5n')?.querySelector('.M7eMe') || 
                  input.previousElementSibling;
    const labelText = label ? label.textContent.trim() : `Field ${index + 1}`;
    console.log(`${labelText}: ${input.name}`);
});
```

4. **Press Enter** to run the code
5. **Copy the results** - they'll show field names and their entry IDs

### **Step 3: Update Your Code**

Once you have the entry IDs, replace them in your `TrihariUniversalSimple.jsx` file around line 75-85:

```javascript
// Replace these placeholder IDs with your real ones:
if (formData.get('fullName')) googleFormData.append('entry.REAL_ID_HERE', formData.get('fullName'))
if (formData.get('email')) googleFormData.append('entry.REAL_ID_HERE', formData.get('email'))
// ... etc
```

## 📋 **Method 2: Simple Test Method**

### **Alternative: Use Prefill URL Method**

1. **Fill your Google Form** with test data
2. **Click "Get pre-filled link"** in the form edit mode
3. **Copy the URL** - it will contain the entry IDs like: `entry.1234567890=TestName&entry.0987654321=test@email.com`
4. **Extract the entry IDs** from the URL

## 🔧 **Method 3: Quick Fix - Use Fallback Only**

If you want to skip the entry ID setup for now, I can modify your code to just use the fallback (opens Google Form in new tab) until you get the IDs:

```javascript
// Quick fix - just use fallback
const handleFormSubmit = (e) => {
  e.preventDefault()
  
  // Show message and open Google Form
  alert('🎬 Opening audition application form...')
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSfx1uyXj0I5oE0Dn7Elmve4VJ3i5hRDjcPA2FG54nknzTCKXQ/viewform', '_blank')
  
  // Reset form
  e.target.reset()
}
```

## 🛠️ **Would you like me to:**

1. **Fix the syntax errors** in your JSX file first?
2. **Implement the fallback-only approach** (simpler, works immediately)?
3. **Help you get the entry IDs** using the methods above?

## 📞 **Next Steps:**

Choose which approach you prefer:
- **Option A**: Fix syntax errors + implement fallback approach (immediate solution)
- **Option B**: Get entry IDs using the console method above + full integration
- **Option C**: I can help you with both

**Let me know which option you'd prefer and I'll implement it right away!** 🚀
