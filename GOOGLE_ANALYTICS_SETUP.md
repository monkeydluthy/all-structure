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
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
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
  label: 'Homepage Contact Form',
});
```

Track button clicks for phone calls:

```javascript
ReactGA.event({
  category: 'Contact',
  action: 'Phone Call Click',
  label: 'Header Phone Number',
});
```

## Step 4: View Analytics in Google Analytics Dashboard

1. Go to Google Analytics dashboard
2. View real-time visitors
3. Track page views, user behavior, traffic sources
4. See conversion events (form submissions, phone clicks)

## Admin Dashboard Widget Setup

The admin dashboard now includes an analytics widget that displays pageviews, sessions, users, and top pages. To connect real data:

### Step 1: Enable Google Analytics Data API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select or create a project
3. Search for and enable **Google Analytics Data API**
4. (Optional) Also enable **Google Analytics Admin API** if you want to manage properties programmatically

### Step 2: Create Service Account

1. In Google Cloud Console, go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name it (e.g., "Analytics Reader")
4. Grant role: **Viewer** or **Analytics Viewer**
5. Click **Done**

### Step 3: Create JSON Key

1. Click on the service account
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key** → **JSON**
4. Download the JSON file (keep it secure!)

### Step 4: Grant Access in Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** → **Property** → **Property Access Management**
3. Click **+** → **Add users**
4. Add the service account email (from the JSON file)
5. Grant **Viewer** role

### Step 5: Get Your Property ID

1. In Google Analytics, go to **Admin** → **Property Settings**
2. Copy your **Property ID** (numeric, like `123456789`)

### Step 6: Configure Netlify Function

The website uses a Netlify Function to securely proxy Google Analytics API calls.

**Set these environment variables in Netlify:**

1. Go to your Netlify site dashboard → **Site settings** → **Environment variables**
2. Add these variables:
   - `GA_SERVICE_ACCOUNT_EMAIL`: The email from your JSON key file (e.g., `analytics-reader@your-project.iam.gserviceaccount.com`)
   - `GA_SERVICE_ACCOUNT_PRIVATE_KEY`: The entire `private_key` value from your JSON key file (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
   - `GA_PROPERTY_ID`: Your Property ID from Google Analytics (numeric value)

**Important:**

- Never commit your JSON key file to Git
- The private key should be copied exactly as it appears in the JSON, including the newlines (`\n`)

### Step 7: Deploy

Push your changes to trigger a new deployment on Netlify. The analytics widget will automatically fetch real data from Google Analytics.

**For local testing:**
Run `npm run netlify:dev` to test the function locally (requires Netlify CLI).

See: https://developers.google.com/analytics/devguides/reporting/data/v1

## Quick Setup (Recommendation)

**Just add the Measurement ID to `index.html`** - that's the easiest way to get started!

See https://developers.google.com/analytics/devguides/collection/ga4 for more info.
