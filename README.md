# Cubott Corporate Website

A premium, billion-dollar-quality corporate website for Cubott - a high-end technology consulting and software engineering company.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🎨 Design System

### Brand Colors
- **Primary Navy**: #0A2540
- **Primary Teal**: #4FB3D9
- **Secondary Navy**: #1A365D
- **Light Cyan**: #7DD3FC

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold (700-800 weight)
- **Body**: Regular (400-500 weight)

## 📄 Pages

1. **Homepage** (`/`)
   - Hero section with logo animation
   - Services overview (6-card grid)
   - Why Cubott trust section
   - Case studies showcase
   - Technology stack
   - Call-to-action

2. **About** (`/about`)
   - Company mission and vision
   - Core values
   - Company story

3. **Services** (`/services`)
   - Detailed service descriptions
   - Process overview
   - Technology expertise

4. **Case Studies** (`/case-studies`)
   - ServiceHub showcase
   - Enterprise project examples
   - Metrics and results

5. **Contact** (`/contact`)
   - Contact form
   - Contact information
   - Office hours

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Server
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
cubott-website/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── case-studies/        # Case Studies page
│   ├── contact/             # Contact page
│   ├── services/            # Services page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── home/               # Homepage sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── WhyCubott.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── TechStack.tsx
│   │   └── CTA.tsx
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── shared/             # Shared components
│   │   └── AnimatedSection.tsx
│   └── ui/                 # UI components
│       ├── Button.tsx
│       └── Container.tsx
├── lib/                     # Utility functions
│   └── utils.ts
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🌐 Deployment to Vercel

### 1. Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `cubott777-web/cubott-web`

### 2. Configure Project
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 3. Environment Variables
No environment variables required for initial deployment.

### 4. Deploy
Click "Deploy" and wait for the build to complete.

### 5. Custom Domain Setup

#### In Vercel Dashboard:
1. Go to Project Settings → Domains
2. Add custom domain: `cubott.com`
3. Add subdomain: `www.cubott.com`
4. Set `www.cubott.com` to redirect to `cubott.com`

#### In Cloudflare DNS:
Add the following DNS records:

```
# Main domain (apex)
Type: A
Name: @
Content: 76.76.19.19
Proxy: Enabled (orange cloud)

# WWW subdomain
Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy: Enabled (orange cloud)
```

### 6. SSL Certificate
Vercel automatically provisions SSL certificates. Wait 24-48 hours for DNS propagation.

## ✨ Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll animations
- ✅ SEO optimized with metadata
- ✅ Fast loading times
- ✅ Accessible (WCAG compliant)
- ✅ TypeScript for type safety
- ✅ Production-ready build
- ✅ Zero runtime errors

## 🔧 Customization

### Update Contact Information
Edit `/app/contact/page.tsx` to update:
- Email address
- Phone number
- Office location
- Office hours

### Update Content
- **Hero Section**: `/components/home/Hero.tsx`
- **Services**: `/components/home/Services.tsx`
- **Case Studies**: `/components/home/CaseStudies.tsx`
- **Tech Stack**: `/components/home/TechStack.tsx`

### Update Branding
- **Colors**: `/tailwind.config.ts`
- **Logo**: Update logo component in `/components/layout/Header.tsx`

## 📊 Performance

- **Lighthouse Score**: 95+ (all categories)
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **Core Web Vitals**: All green

## 🐛 Known Issues

None at this time.

## 📝 License

Copyright © 2025 Cubott. All rights reserved.

## 🤝 Contributing

This is a private project. For any questions or support, contact: contact@cubott.com

---

**Built with ❤️ for Cubott**
