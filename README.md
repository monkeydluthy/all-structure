# All Structure Maintenance Website

A modern, conversion-optimized React website for All Structure Maintenance, a licensed general contractor serving Connecticut.

## 🚀 Features

### Conversion Optimization

- **Sticky Header** with prominent phone number and CTA button
- **Hero Section** with clear value proposition and multiple CTAs
- **Social Proof** section with testimonials and trust badges
- **Portfolio Gallery** with before/after and general project photos
- **Contact Forms** on homepage and dedicated contact page
- **Mobile-First Design** for optimal mobile experience
- **Google Analytics** integration with conversion tracking
- **Admin Dashboard** for portfolio management and analytics

### Key Pages

- **Homepage**: Hero, services overview, portfolio preview, contact form
- **Services Page**: Overview of all service offerings
- **Individual Service Pages**: Detailed information for each service type
- **Portfolio Page**: Before/after gallery and project gallery
- **About Page**: Company story, values, and team information
- **Contact Page**: Comprehensive contact information and form
- **Admin Dashboard**: Analytics and portfolio management

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Supabase account (for portfolio management)
- EmailJS account (for contact forms)
- Google Analytics 4 property

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   See the following setup guides:
   - `SUPABASE_SETUP.md` - Database configuration
   - `GOOGLE_ANALYTICS_SETUP.md` - Analytics setup
   - `NETLIFY_ENV_SETUP.md` - Environment variables for Netlify

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**

   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

6. **Test Netlify Functions Locally**
   ```bash
   npm run netlify:dev
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Sticky header with navigation
│   ├── Hero.jsx                # Hero section with CTAs
│   ├── SocialProof.jsx         # Testimonials and trust badges
│   ├── Services.jsx            # Service cards with images
│   ├── Portfolio.jsx           # Homepage portfolio preview
│   ├── WhyChooseUs.jsx         # Trust factors and guarantees
│   ├── Contact.jsx             # Homepage contact form
│   ├── Footer.jsx              # Site footer
│   └── AnalyticsWidget.jsx     # Google Analytics dashboard widget
├── pages/
│   ├── Home.jsx                # Homepage layout
│   ├── ServicesPage.jsx        # Services overview page
│   ├── ServicePage.jsx         # Individual service detail page
│   ├── PortfolioPage.jsx       # Full portfolio page
│   ├── AboutPage.jsx           # About us page
│   ├── ContactPage.jsx         # Contact page
│   ├── PrivacyPage.jsx         # Privacy policy
│   ├── TermsPage.jsx           # Terms of service
│   ├── AdminLogin.jsx          # Admin authentication
│   └── AdminDashboard.jsx      # Admin dashboard
├── config/
│   ├── supabaseConfig.js       # Supabase client configuration
│   └── emailConfig.js          # EmailJS configuration
├── utils/
│   └── analytics.js            # Google Analytics helpers
├── App.jsx                     # Main app with routing
├── main.jsx                    # React entry point
└── index.css                   # Global styles

netlify/
└── functions/
    └── analytics.js            # Netlify function for Google Analytics API
```

## 🎨 Design Features

### Color Scheme

- **Primary Gold**: #d4a017
- **Charcoal**: #0f172a, #1f2937
- **Text**: #1f2937 (Dark Gray)
- **Background**: #f8fafc (Light Gray)

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📱 Mobile Optimization

- **Touch-Friendly**: Large buttons and touch targets
- **Fast Loading**: Optimized images and code splitting
- **Mobile Navigation**: Hamburger menu with button-style links
- **Responsive Images**: Proper image sizing for all devices
- **Mobile Forms**: Optimized input fields and modals

## 🔧 Technologies

- **React 18** with Vite
- **React Router** for navigation
- **Supabase** for database and authentication
- **EmailJS** for contact form submissions
- **Google Analytics 4** for tracking
- **Netlify Functions** for serverless backend
- **Netlify** for hosting and deployment

## 📊 Admin Dashboard

Access the admin dashboard at `/admin/login` to:

- View Google Analytics data (pageviews, sessions, conversions)
- Upload and manage portfolio projects
- Edit existing projects
- Delete projects
- Track form submissions, phone calls, email clicks, and CTA interactions

## 📸 Required Images

All images should be placed in `/public/images/`:

- `logo.png` - Company logo (used in header, hero, favicon)
- Service images: `remodel.jpg`, `restore.jpg`, `roof.JPEG`, `sheetrock.JPG`, `tile.jpg`, `lawn.jpg`
- Portfolio before/after pairs: `kitchen-before/after.jpg`, `bathroom-before/after.jpg`, etc.

## 🔐 Security

- Supabase authentication for admin access
- Environment variables for sensitive credentials
- Row-level security policies for database access
- Secure storage policies for image uploads

## 📝 License

All rights reserved - All Structure Maintenance LLC
