/**
 * Environment configuration for the application
 * This centralizes all environment variables and provides fallbacks
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 30000,
  },

  // Authentication
  auth: {
    jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET || 'dev-secret',
  },

  // Demo Configuration
  demo: {
    tenantId: process.env.NEXT_PUBLIC_DEMO_TENANT_ID || 'tenant_demo',
    companyId: process.env.NEXT_PUBLIC_DEMO_COMPANY_ID || 'seed-company-1',
  },

  // App Configuration
  app: {
    name: 'UrutiIQ',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
} as const;

// Helper functions for common configurations
export const getApiUrl = (endpoint: string = '') => {
  const baseUrl = config.api.baseUrl.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.replace(/^\//, ''); // Remove leading slash
  return `${baseUrl}/${cleanEndpoint}`;
};

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'x-tenant-id': config.demo.tenantId,
});

export const getCompanyId = (): string => {
  if (typeof window !== 'undefined') {
    return (
      localStorage.getItem('company_id') ||
      localStorage.getItem('companyId') ||
      localStorage.getItem('company') ||
      config.demo.companyId
    );
  }
  console.log(  config.demo.companyId,'config.demo.compay id')
  return config.demo.companyId;
};

export const getTenantId = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('tenant_id') || config.demo.tenantId;
  }
  return config.demo.tenantId;
};
