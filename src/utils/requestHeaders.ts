
import { getAccessToken } from './auth';
import { getLocalizationOrDefault } from './localization';
import { getTenantId } from './multitenancy';

/**
 * Retrieves the request headers for the application
 */
export const requestHeaders = (tokenName?: string): { [key: string]: string } => {
  const headers: { [key: string]: string } = {};

  const tokenResult = getAccessToken(tokenName);

  const token = tokenResult && tokenResult.accessToken;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  headers['.AspNetCore.Culture'] = getLocalizationOrDefault();

  const tenantId = getTenantId();

  if (tenantId) {
    headers['Abp.TenantId'] = getTenantId().toString();
  }

  return headers;
};
