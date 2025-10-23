# Aflah Website Deployment Guide

## Prerequisites

### 1. Environment Variables Setup

Create a `.env.local` file in the `aflah-website` directory with the following variables:

```bash
# Facebook Reviews Integration
FB_PAGE_ID=your_facebook_page_id
FB_PAGE_ACCESS_TOKEN=your_facebook_access_token

# EmailJS Integration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_site_verification_code

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/aflahcoaching/discovery-call
```

### 2. Service Setup Instructions

#### EmailJS Setup
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create an account and verify your email
3. Create a new service (Gmail, Outlook, etc.)
4. Create an email template
5. Get your Service ID, Template ID, and Public Key
6. Add these to your `.env.local` file

#### Google Analytics Setup
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website
3. Get your Measurement ID (starts with G-)
4. Add it to your `.env.local` file

#### Facebook Reviews Setup
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Get your Page ID and Access Token
4. Add these to your `.env.local` file

#### Calendly Setup
1. Go to [Calendly](https://calendly.com/)
2. Create your scheduling links
3. Update the `NEXT_PUBLIC_CALENDLY_URL` in your `.env.local` file

## Local Development

### Start Development Server
```bash
cd aflah-website
npm install
npm run dev
```

The website will be available at `http://localhost:3001`

### Server Management
Use the provided PowerShell script for easy server management:
```powershell
# Start server
.\manage-aflah-servers.ps1 -Action start

# Stop server
.\manage-aflah-servers.ps1 -Action stop

# Restart server
.\manage-aflah-servers.ps1 -Action restart

# Check status
.\manage-aflah-servers.ps1 -Action status
```

## Deployment Options

### Option 1: GitHub Pages (Free & Easy)

1. **Enable GitHub Pages:**
   - Go to your repository Settings > Pages
   - Set Source to "GitHub Actions"
   - The CI/CD pipeline will automatically deploy to GitHub Pages

2. **Configure Repository Secrets:**
   - Go to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
     - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
     - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
     - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
     - `FB_PAGE_ID`
     - `FB_PAGE_ACCESS_TOKEN`

3. **Deploy:**
   - Push to your main branch
   - GitHub Actions will automatically build and deploy
   - Your site will be available at `https://yourusername.github.io/yourrepository/aflah-website`

### Option 2: Vercel (Recommended for Production)

1. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Set the root directory to `aflah-website`

2. **Configure Environment Variables:**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add all the variables from your `.env.local` file
   - Make sure to mark them as "Production" environment

3. **Enable Vercel Deployment:**
   - Set repository variable `DEPLOY_TO_VERCEL` to `true`
   - Add Vercel secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

4. **Deploy:**
   - Push to your main branch
   - Vercel will automatically deploy

### Option 3: Netlify

1. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com/)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `aflah-website/.next`

2. **Configure Environment Variables:**
   - In Netlify dashboard, go to Site Settings > Environment Variables
   - Add all the variables from your `.env.local` file

3. **Enable Netlify Deployment:**
   - Set repository variable `DEPLOY_TO_NETLIFY` to `true`
   - Add Netlify secrets: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`

### Option 4: Manual Deployment

1. **Build the application:**
   ```bash
   cd aflah-website
   npm run build
   ```

2. **For static hosting (GitHub Pages style):**
   ```bash
   npm run export
   # Upload the 'out' folder to your static hosting provider
   ```

3. **For server deployment:**
   - Upload the `.next` folder and other necessary files
   - Configure your server to serve the Next.js application

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:
- Runs tests and type checking
- Builds the application
- Deploys to Vercel (if configured)

### Required GitHub Secrets

Add these secrets to your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics measurement ID
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: EmailJS service ID
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: EmailJS template ID
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: EmailJS public key
- `FB_PAGE_ID`: Facebook page ID
- `FB_PAGE_ACCESS_TOKEN`: Facebook access token

## Post-Deployment Checklist

- [ ] Test all contact forms
- [ ] Verify Calendly integration
- [ ] Check Google Analytics tracking
- [ ] Test Facebook reviews display
- [ ] Verify all pages load correctly
- [ ] Test responsive design on mobile
- [ ] Check SEO meta tags
- [ ] Verify social media sharing

## Troubleshooting

### Common Issues

1. **Build Errors:**
   - Check that all environment variables are set
   - Ensure all dependencies are installed
   - Run `npm run type-check` to check for TypeScript errors

2. **EmailJS Not Working:**
   - Verify your service ID, template ID, and public key
   - Check that your email template is properly configured
   - Ensure the template variables match your form data

3. **Facebook Reviews Not Loading:**
   - Verify your Facebook Page ID and Access Token
   - Check that your Facebook app has the correct permissions
   - Ensure the API endpoint is accessible

4. **Calendly Widget Not Loading:**
   - Verify your Calendly URL is correct
   - Check that the Calendly script is loading properly
   - Ensure there are no CORS issues

### Support

For technical support or questions about the deployment process, please refer to the project documentation or contact the development team.
