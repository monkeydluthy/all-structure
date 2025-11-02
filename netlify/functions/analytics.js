import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { GoogleAuth } from 'google-auth-library';

export const handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get service account credentials from environment variables
    const serviceAccountEmail = process.env.GA_SERVICE_ACCOUNT_EMAIL;
    const serviceAccountPrivateKey = process.env.GA_SERVICE_ACCOUNT_PRIVATE_KEY;
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!serviceAccountEmail || !serviceAccountPrivateKey || !propertyId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Google Analytics credentials not configured',
          message: 'Please set GA_SERVICE_ACCOUNT_EMAIL, GA_SERVICE_ACCOUNT_PRIVATE_KEY, and GA_PROPERTY_ID environment variables in Netlify'
        }),
      };
    }

    // Create authenticated client
    const auth = new GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: serviceAccountPrivateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsDataClient = new BetaAnalyticsDataClient({ auth });

    // Calculate date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    // Fetch key metrics
    const [metricsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
      ],
    });

    // Fetch top pages
    const [pagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      ],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [
        {
          metric: { metricName: 'screenPageViews' },
          desc: true,
        },
      ],
      limit: 10,
    });

    // Fetch custom events
    const [eventsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      ],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      orderBys: [
        {
          metric: { metricName: 'eventCount' },
          desc: true,
        },
      ],
      limit: 20,
    });

    // Process metrics data
    const metrics = metricsResponse.rows?.[0]?.metricValues || [];
    const pageviews = parseInt(metrics[0]?.value || '0');
    const sessions = parseInt(metrics[1]?.value || '0');
    const users = parseInt(metrics[2]?.value || '0');
    const avgSessionDuration = metrics[3]?.value ? formatDuration(metrics[3].value) : '0:00';

    // Process top pages data
    const topPages = pagesResponse.rows?.map(row => ({
      page: row.dimensionValues?.[0]?.value || '',
      views: parseInt(row.metricValues?.[0]?.value || '0'),
    })) || [];

    // Process events data
    const events = eventsResponse.rows?.map(row => ({
      event: row.dimensionValues?.[0]?.value || '',
      count: parseInt(row.metricValues?.[0]?.value || '0'),
    })) || [];
    
    // Extract specific conversion events
    const formSubmits = events.find(e => e.event === 'form_submit')?.count || 0;
    const phoneCalls = events.find(e => e.event === 'phone_click')?.count || 0;
    const emailClicks = events.find(e => e.event === 'email_click')?.count || 0;
    const ctaClicks = events.find(e => e.event === 'cta_click')?.count || 0;

    // Return formatted data
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
      },
      body: JSON.stringify({
        pageviews,
        sessions,
        users,
        avgSessionDuration,
        topPages,
        formSubmits,
        phoneCalls,
        emailClicks,
        ctaClicks,
        totalConversions: formSubmits + phoneCalls,
      }),
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch analytics data',
        message: error.message 
      }),
    };
  }
};

// Helper function to format duration from seconds to mm:ss
function formatDuration(seconds) {
  const totalSeconds = parseFloat(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
