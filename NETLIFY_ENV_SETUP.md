# Netlify Environment Variables Setup

## Required Environment Variables for Google Analytics

Add these three environment variables to your Netlify site dashboard:

### 1. GA_SERVICE_ACCOUNT_EMAIL

**Value:** Copy the `client_email` value from your service account JSON file.

Example format:

```
analytics-reader@your-project.iam.gserviceaccount.com
```

### 2. GA_SERVICE_ACCOUNT_PRIVATE_KEY

**Value:** Copy the entire `private_key` value from your service account JSON file, including the BEGIN and END headers.

Example format:

```
-----BEGIN PRIVATE KEY-----
YOUR_ACTUAL_PRIVATE_KEY_HERE
-----END PRIVATE KEY-----
```

### 3. GA_PROPERTY_ID

**Value:**

```
495490739
```

## How to Add These in Netlify

1. Go to https://app.netlify.com/
2. Select your site: **all-structure-maintenance**
3. Go to **Site settings** → **Build & deploy** → **Environment**
4. Click **Add a variable**
5. Add each variable with its corresponding value
6. Save and **Trigger deploy** if needed

## Important Notes

- The private key must include the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` headers
- Copy it exactly as shown above
- Netlify will store these securely and never expose them to the frontend
- After adding variables, trigger a new deployment if the function isn't working
