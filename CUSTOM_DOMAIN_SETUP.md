# 🌐 Custom Domain Setup: GoDaddy → GitHub Pages

## 🎯 **Goal:** Connect your GoDaddy domain to GitHub Pages

---

## 🔧 **Step 1: GitHub Pages Configuration**

### **Go to Repository Settings:**
**URL**: `https://github.com/jagjeetjenagit/trihari-universal-website/settings/pages`

### **Configure Custom Domain:**
1. **Scroll to "Custom domain"** section
2. **Enter your domain**: `yourdomain.com` (or `www.yourdomain.com`)
3. **Check "Enforce HTTPS"** (recommended)
4. **Save**

**For Your Domain:**
```
Custom domain: fitmonkhealth.com
☑️ Enforce HTTPS
```

---

## 🌐 **Step 2: GoDaddy DNS Configuration**

### **Login to GoDaddy:**
1. Go to [godaddy.com](https://godaddy.com) and login
2. Go to **"My Products"** → **"DNS"** for your domain

### **Add DNS Records:**

#### **Option A: Root Domain (fitmonkhealth.com)**
Add these **A Records**:
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 1 Hour

Type: A  
Name: @
Value: 185.199.109.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.110.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.111.153
TTL: 1 Hour
```

#### **Option B: Subdomain (www.fitmonkhealth.com)**
Add this **CNAME Record**:
```
Type: CNAME
Name: www
Value: jagjeetjenagit.github.io
TTL: 1 Hour
```

#### **Option C: Both (Recommended)**
Add **both** A records (above) **AND** CNAME:
```
Type: CNAME
Name: www  
Value: jagjeetjenagit.github.io
TTL: 1 Hour
```

---

## 🔄 **Step 3: Create CNAME File**

GitHub Pages needs a CNAME file in your repository:

### **Method 1: Automatic (Recommended)**
- When you set custom domain in GitHub settings, it creates the file automatically

### **Method 2: Manual**
Create file `CNAME` in repository root with your domain:
```
fitmonkhealth.com
```

---

## ⏱️ **Step 4: Wait for DNS Propagation**

**Time Required**: 24-48 hours (usually faster)

**Check Status:**
- Use [whatsmydns.net](https://www.whatsmydns.net) to check propagation
- Enter your domain and check A/CNAME records globally

---

## 🧪 **Step 5: Test Your Domain**

Once DNS propagates:
1. **Visit**: `https://yourdomain.com`
2. **Should redirect to**: Your audition form
3. **SSL Certificate**: Should be automatically issued

---

## 📊 **Common Domain Setups:**

### **Scenario 1: Use Root Domain**
```
GitHub Pages: fitmonkhealth.com
GoDaddy DNS: A records pointing to GitHub IPs
User visits: fitmonkhealth.com → Your audition form
```

### **Scenario 2: Use www Subdomain**  
```
GitHub Pages: www.fitmonkhealth.com
GoDaddy DNS: CNAME record pointing to jagjeetjenagit.github.io
User visits: www.fitmonkhealth.com → Your audition form
```

### **Scenario 3: Both (Best Practice)**
```
GitHub Pages: fitmonkhealth.com (primary)
GoDaddy DNS: A records + CNAME for www
User visits: Both work, www redirects to root
```

---

## 🚨 **Troubleshooting:**

### **Domain Not Working:**
- ✅ Check DNS propagation (24-48 hours)
- ✅ Verify A records point to correct GitHub IPs
- ✅ Ensure CNAME file exists in repository
- ✅ Check GitHub Pages settings

### **SSL Certificate Issues:**
- ✅ Wait 24 hours after DNS setup
- ✅ Ensure "Enforce HTTPS" is checked
- ✅ GitHub automatically issues Let's Encrypt certificate

### **404 Error:**
- ✅ Verify repository is public
- ✅ Check GitHub Pages is enabled
- ✅ Ensure CNAME file contains correct domain

---

## 🎯 **Final Result:**

**Before**: `https://jagjeetjenagit.github.io/trihari-universal-website/`
**After**: `https://fitmonkhealth.com` → Professional audition form

---

## 📱 **Example Domains:**

- `trihariauniversal.com`
- `auditions.trihariauniversal.com` 
- `casting.trihariauniversal.com`
- `apply.trihariauniversal.com`

**Choose the domain that best represents your casting business!** 🎬✨

---

## 💡 **Pro Tips:**

1. **Use root domain** for better SEO
2. **Enable HTTPS** for security and Google ranking
3. **Test on mobile** after setup
4. **Update social media** links to new domain
5. **Add Google Analytics** for tracking
