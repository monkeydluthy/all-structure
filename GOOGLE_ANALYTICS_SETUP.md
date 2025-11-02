# Google Analytics Setup for All Structure Maintenance

## Step 1: Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon bottom left)
3. Create a new **GA4 Property** (if you don't have one)
4. Set up a data stream for your website
5. Copy your **Measurement ID** (looks like `G-XXXXXXXXXX`)

## Step 2: Add to Website

### Option A: Simple Tracking (Basic Pageviews)
Add the Measurement ID to `index.html` in the `<head>` section:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Option B: React Integration (Advanced Tracking)
Use `react-ga4` for more control:
```bash
npm install react-ga4
```

Then initialize in `src/main.jsx`:
```javascript
import ReactGA from 'react-ga4';

const GA_ID = 'G-XXXXXXXXXX'; // Your Measurement ID
ReactGA.initialize(GA_ID);
```

## Step 3: Track Key Events

Track form submissions in `src/components/Contact.jsx`:
```javascript
ReactGA.event({
  category: 'Contact',
  action: 'Form Submission',
  label: 'Homepage Contact Form'
});
```

Track button clicks for phone calls:
```javascript
ReactGA.event({
  category: 'Contact',
  action: 'Phone Call Click',
  label: 'Header Phone Number'
});
```

## Step 4: View Analytics in Google Analytics Dashboard

1. Go to Google Analytics dashboard
2. View real-time visitors
3. Track page views, user behavior, traffic sources
4. See conversion events (form submissions, phone clicks)

## Admin Dashboard Widget (Future Enhancement)

To show analytics **inside** your admin dashboard, you would need:
1. **Google Analytics Reporting API** with service account
2. **API credentials** (JSON file)
3. **Custom React component** to fetch and display data

This is more complex and requires additional setup. For now, use the Google Analytics dashboard directly.

## Quick Setup (Recommendation)

**Just add the Measurement ID to `index.html`** - that's the easiest way to get started!

See https://developers.google.com/analytics/devguides/collection/ga4 for more info.

