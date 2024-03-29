import { getLocalStorage } from "./storage";

const TENANT_KEY = 'TENANT';

/**
 * Sets the tenant id
 * @param tenantId - the tenant id
 */
export const setTenantId = (tenantId: string) => {
  if (tenantId) {
    getLocalStorage()?.setItem(TENANT_KEY, tenantId);
  } else {
    getLocalStorage()?.removeItem(TENANT_KEY);
  }
};

/**
 * Gets the tenant id
 * @returns tenantId
 */
export const getTenantId = () => {
  const value = getLocalStorage()?.getItem(TENANT_KEY);
  if (!value) {
    return null;
  }

  return parseInt(value);
};
