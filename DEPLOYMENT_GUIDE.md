# Cubott Website - Vercel Deployment Guide

## ✅ Prerequisites Completed
- [x] Website built and tested locally
- [x] Code pushed to GitHub: https://github.com/cubott777-web/cubott-web.git
- [x] All TypeScript errors resolved
- [x] Production build successful

## 🚀 Step-by-Step Deployment to Vercel

### Step 1: Sign in to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import the Project
1. Click "Add New Project" or "Import Project"
2. Select "Import Git Repository"
3. Find and select: **cubott777-web/cubott-web**
4. Click "Import"

### Step 3: Configure Project Settings
Vercel will auto-detect Next.js. Verify these settings:

```
Framework Preset: Next.js
Root Directory: ./
Node Version: 18.x or higher
Build Command: npm run build
Output Directory: .next (auto-detected)
Install Command: npm install
```

**Environment Variables**: None required for initial deployment

### Step 4: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. You'll get a deployment URL like: `https://cubott-web-[random].vercel.app`

### Step 5: Test the Deployment
Visit the Vercel-provided URL and verify:
- [ ] Homepage loads correctly
- [ ] All sections display properly
- [ ] Navigation works
- [ ] All pages are accessible
- [ ] Animations are smooth
- [ ] Images load correctly
- [ ] No console errors

## 🌐 Custom Domain Configuration

### Option A: Using Cloudflare (Recommended)

#### In Vercel Dashboard:
1. Go to your project
2. Click "Settings" → "Domains"
3. Add domain: `cubott.com`
4. Add domain: `www.cubott.com`
5. For `www.cubott.com`, select "Redirect to cubott.com"

#### In Cloudflare DNS:
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select domain: `cubott.com`
3. Go to "DNS" → "Records"
4. Add/Update these records:

**For apex domain (cubott.com):**
```
Type: A
Name: @
IPv4 address: 76.76.19.19
Proxy status: Proxied (orange cloud)
TTL: Auto
```

**For www subdomain:**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: Proxied (orange cloud)
TTL: Auto
```

**For app subdomain (already configured):**
```
Type: A
Name: app
IPv4 address: 150.230.142.142
Proxy status: DNS only (gray cloud)
TTL: Auto
```

### Option B: Using Vercel Nameservers (Alternative)

If you want Vercel to manage DNS:
1. In Vercel, add domain `cubott.com`
2. Vercel will provide nameservers
3. Update nameservers in your domain registrar
4. Wait 24-48 hours for propagation

**Note**: This will remove Cloudflare management

## 🔐 SSL Certificate

### Automatic SSL (Vercel + Cloudflare)
- Vercel automatically provisions SSL certificates
- Cloudflare provides additional SSL layer
- No manual configuration needed
- Certificate auto-renews

### Verification
After DNS propagation (24-48 hours):
1. Visit https://cubott.com
2. Click the padlock icon in browser
3. Verify certificate is valid
4. Test at: https://www.ssllabs.com/ssltest/analyze.html?d=cubott.com

## 📊 Post-Deployment Checklist

### Immediate (After Deployment)
- [ ] Verify homepage loads at cubott.com
- [ ] Test all navigation links
- [ ] Check mobile responsiveness
- [ ] Test contact form (even if not functional yet)
- [ ] Verify all images load
- [ ] Check animations work smoothly
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)

### DNS Propagation (24-48 hours)
- [ ] cubott.com resolves correctly
- [ ] www.cubott.com redirects to cubott.com
- [ ] SSL certificate is valid
- [ ] No mixed content warnings
- [ ] All assets load over HTTPS

### SEO & Performance
- [ ] Run Lighthouse audit (aim for 95+ score)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics (if needed)
- [ ] Verify structured data (JSON-LD)
- [ ] Test Core Web Vitals

## 🛠️ Vercel Configuration Files

### vercel.json (Optional)
Create this file if you need custom configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "rewrites": [],
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel is now configured for automatic deployments:
- **Production**: Pushes to `main` branch deploy to cubott.com
- **Preview**: Pull requests create preview deployments
- **Branch**: Other branches create branch deployments

### Manual Deployment
If you need to redeploy:
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click "Redeploy" on latest deployment

## 🌍 Multiple Domains Summary

After deployment, you'll have:

1. **cubott.com** - Main corporate website (Vercel)
2. **www.cubott.com** - Redirects to cubott.com
3. **app.cubott.com** - ServiceHub application (150.230.142.142)

All with valid SSL certificates and proper routing!

## 🐛 Troubleshooting

### Domain Not Resolving
- Wait 24-48 hours for DNS propagation
- Clear browser cache (Ctrl+Shift+Del)
- Try in incognito/private mode
- Check DNS propagation: https://dnschecker.org
- Verify DNS records in Cloudflare

### SSL Certificate Issues
- Wait for Vercel to provision certificate (can take 1 hour)
- Verify DNS records are correct
- Check Cloudflare SSL mode is "Full" or "Full (Strict)"
- Clear browser cache and cookies

### Build Failures
- Check Vercel deployment logs
- Verify all dependencies in package.json
- Test build locally: `npm run build`
- Check Node.js version compatibility

### 404 Errors
- Verify all files are committed to GitHub
- Check file names match exactly (case-sensitive)
- Ensure pages are in correct directories
- Redeploy if needed

## 📧 Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Cloudflare Support**: https://support.cloudflare.com

## 🎉 Deployment Complete!

Once DNS propagates, your website will be live at:
- https://cubott.com
- https://www.cubott.com (redirects)

The application continues to be accessible at:
- https://app.cubott.com

---

**Deployment Date**: December 16, 2025  
**Status**: Ready to Deploy  
**Estimated Time**: 10-15 minutes (+ 24-48 hours DNS propagation)

