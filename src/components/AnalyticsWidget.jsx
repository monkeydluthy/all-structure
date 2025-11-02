import React, { useState, useEffect } from 'react';

const AnalyticsWidget = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // For now, this will show a placeholder
    // Once GA4 API is configured, replace this with actual API calls
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Determine the base URL for the Netlify function
      const isDevelopment =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
      const baseUrl = isDevelopment
        ? 'http://localhost:8888/.netlify/functions'
        : '/.netlify/functions';

      const response = await fetch(`${baseUrl}/analytics`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalyticsData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error fetching analytics:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '2rem',
          background: '#fee2e2',
          borderRadius: '8px',
          color: '#dc2626',
        }}
      >
        Error loading analytics: {error}
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Make sure Google Analytics API is configured correctly.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Key Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <MetricCard
          label="Pageviews"
          value={analyticsData?.pageviews?.toLocaleString() || '0'}
        />
        <MetricCard
          label="Sessions"
          value={analyticsData?.sessions?.toLocaleString() || '0'}
        />
        <MetricCard
          label="Users"
          value={analyticsData?.users?.toLocaleString() || '0'}
        />
        <MetricCard
          label="Avg. Session"
          value={analyticsData?.avgSessionDuration || '0:00'}
        />
      </div>

      {/* Top Pages */}
      <div
        style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
        }}
      >
        <h3
          style={{
            marginBottom: '1rem',
            color: '#1f2937',
            fontSize: '1.25rem',
          }}
        >
          Top Pages (Last 30 Days)
        </h3>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {analyticsData?.topPages?.map((page, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                background: '#f8fafc',
                borderRadius: '8px',
              }}
            >
              <span style={{ color: '#374151', fontWeight: '500' }}>
                {page.page === '/' ? 'Home' : page.page}
              </span>
              <span style={{ color: '#d4a017', fontWeight: '600' }}>
                {page.views.toLocaleString()} views
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <a
          href="https://analytics.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: '#d4a017',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1rem',
          }}
        >
          View Full Analytics Dashboard →
        </a>
        <p
          style={{
            fontSize: '0.85rem',
            color: '#9ca3af',
            marginTop: '1rem',
            marginBottom: 0,
          }}
        >
          See detailed reports, real-time data, and advanced insights in Google
          Analytics
        </p>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value }) => (
  <div
    style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#d4a017',
        marginBottom: '0.5rem',
      }}
    >
      {value}
    </div>
    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{label}</div>
  </div>
);

export default AnalyticsWidget;
