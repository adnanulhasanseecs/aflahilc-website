# Custom Domain Setup Guide

## 🌐 Setting Up aflah-ilc.com

### Step 1: Purchase Domain
1. Go to [Namecheap](https://www.namecheap.com) or [GoDaddy](https://www.godaddy.com)
2. Search for `aflah-ilc.com`
3. Purchase the domain (~$10-15/year)
4. Enable WHOIS privacy protection

### Step 2: Configure DNS Settings
In your domain registrar's DNS management panel, add these records:

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 300

Type: A  
Name: @
Value: 185.199.109.153
TTL: 300

Type: A
Name: @
Value: 185.199.110.153
TTL: 300

Type: A
Name: @
Value: 185.199.111.153
TTL: 300

Type: CNAME
Name: www
Value: yourusername.github.io
TTL: 300
```

### Step 3: GitHub Repository Settings
1. Go to your GitHub repository
2. Navigate to `Settings` → `Pages`
3. Under "Custom domain", enter: `aflah-ilc.com`
4. Check "Enforce HTTPS"

### Step 4: Add GitHub Secret
1. Go to `Settings` → `Secrets and variables` → `Actions`
2. Add new secret:
   - Name: `CUSTOM_DOMAIN`
   - Value: `aflah-ilc.com`

### Step 5: Deploy
```bash
git add .
git commit -m "Add custom domain support"
git push origin main
```

## 🔄 How It Works

### Before Custom Domain:
- URL: `https://yourusername.github.io/aflah-website`
- Professional: ❌ Generic GitHub URL
- Branding: ❌ Not memorable

### After Custom Domain:
- URL: `https://aflah-ilc.com`
- Professional: ✅ Custom branded domain
- Branding: ✅ Easy to remember and share

## 📋 DNS Propagation
- **Time**: 24-48 hours for full propagation
- **Check**: Use [whatsmydns.net](https://www.whatsmydns.net) to verify
- **Test**: Visit `aflah-ilc.com` after propagation

## 🛡️ Security Features
- ✅ **Automatic HTTPS**: GitHub provides SSL certificate
- ✅ **WHOIS Privacy**: Domain registrar hides your info
- ✅ **Secure Headers**: Next.js security headers included

## 💰 Cost Breakdown
- **Domain**: $10-15/year
- **Hosting**: FREE (GitHub Pages)
- **SSL Certificate**: FREE (GitHub provides)
- **Total**: ~$10-15/year

## 🚨 Troubleshooting

### Domain Not Working?
1. Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
2. Verify GitHub Pages settings
3. Wait 24-48 hours for full propagation

### HTTPS Issues?
1. Enable "Enforce HTTPS" in GitHub Pages settings
2. Wait for SSL certificate generation (up to 24 hours)

### Still Using GitHub URL?
1. Clear browser cache
2. Check if DNS has fully propagated
3. Verify CNAME file is deployed correctly
