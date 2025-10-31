# All Structure Maintenance Website

A modern, conversion-optimized React website for All Structure Maintenance, a licensed general contractor serving Connecticut.

## 🚀 Features

### Conversion Optimization

- **Sticky Header** with prominent phone number and CTA button
- **Hero Section** with clear value proposition and multiple CTAs
- **Social Proof** section with testimonials and trust badges
- **Portfolio Gallery** with before/after project photos
- **Contact Form** on homepage with service selection
- **Mobile-First Design** for optimal mobile experience

### Key Components

- **Header**: Sticky navigation with phone number and CTA
- **Hero**: Compelling headline with project image and CTAs
- **Social Proof**: Customer testimonials and trust indicators
- **Services**: Six main service categories with images
- **Portfolio**: Interactive before/after project gallery
- **Why Choose Us**: Trust factors and guarantees
- **Contact**: Comprehensive contact form and information
- **Footer**: Complete site navigation and contact details

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**

   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Sticky header with navigation
│   ├── Hero.jsx           # Hero section with CTAs
│   ├── SocialProof.jsx    # Testimonials and trust badges
│   ├── Services.jsx       # Service cards with images
│   ├── Portfolio.jsx      # Before/after project gallery
│   ├── WhyChooseUs.jsx    # Trust factors and guarantees
│   ├── Contact.jsx        # Contact form and information
│   └── Footer.jsx         # Site footer
├── App.jsx                # Main app component
├── main.jsx               # React entry point
└── index.css              # Global styles
```

## 🎨 Design Features

### Color Scheme

- **Primary**: #3b82f6 (Blue)
- **Secondary**: #f59e0b (Amber)
- **Success**: #10b981 (Green)
- **Text**: #1f2937 (Dark Gray)
- **Background**: #f8fafc (Light Gray)

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 📱 Mobile Optimization

- **Touch-Friendly**: Large buttons and touch targets
- **Fast Loading**: Optimized images and code splitting
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Responsive Images**: Proper image sizing for all devices

## 🔧 Customization

### Adding New Services

1. Update the `services` array in `Services.jsx`
2. Add corresponding images to `/public/images/`
3. Create dedicated service pages if needed

### Updating Portfolio

1. Add new projects to the `projects` array in `Portfolio.jsx`
2. Include before/after images in `/public/images/`
3. Update project details and descriptions

### Contact Form

- Currently uses client-side form handling
- Integrate with your preferred form service (Formspree, Netlify Forms, etc.)
- Update the `handleSubmit` function in `Contact.jsx`

## 📸 Required Images

Create the following images in `/public/images/`:

### Hero Section

- `hero-project.jpg` - Main hero image (before/after project)

### Services

- `service-restoration.jpg`
- `service-remodeling.jpg`
- `service-roofing.jpg`
- `service-painting.jpg`
- `service-tile.jpg`
- `service-maintenance.jpg`

### Portfolio

- `portfolio-kitchen-before.jpg` / `portfolio-kitchen-after.jpg`
- `portfolio-bathroom-before.jpg` / `portfolio-bathroom-after.jpg`
- `portfolio-roof-before.jpg` / `portfolio-roof-after.jpg`
- `portfolio-basement-before.jpg` / `portfolio-basement-after.jpg`
- `portfolio-water-before.jpg` / `portfolio-water-after.jpg`
- `portfolio-tile-before.jpg` / `portfolio-tile-after.jpg`

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts for configuration

### Traditional Hosting

1. Run `npm run build`
2. Upload `dist` folder contents to your web server
3. Configure server for SPA routing

## 📈 SEO Optimization

- **Meta Tags**: Optimized title and description
- **Structured Data**: Schema markup for local business
- **Image Alt Text**: Descriptive alt text for all images
- **Semantic HTML**: Proper heading hierarchy
- **Fast Loading**: Optimized for Core Web Vitals

## 🔍 Analytics Integration

Add your analytics tracking code to `index.html`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📞 Contact Information

- **Phone**: 203.233.3862
- **Email**: info@allstructuremaintenance.com
- **Location**: Meriden, CT 06451
- **Service Area**: All of Connecticut

## 🎯 Conversion Goals

This website is optimized for:

- **Lead Generation**: Contact form submissions
- **Phone Calls**: Click-to-call functionality
- **Trust Building**: Social proof and testimonials
- **Service Discovery**: Clear service offerings
- **Mobile Experience**: Mobile-first design

## 📝 License

© 2024 All Structure Maintenance LLC. All rights reserved.
