import { headers } from 'next/headers';

import { getBrandConfig, type BrandConfig } from 'src/config/hostname-config';

export async function getHostnameFromHeaders(): Promise<string> {
  const headersList = headers();
  console.log('headersList', headersList);
  const host = (await headersList).get('host') || '';

  // Remove port if present (e.g., "localhost:3000" -> "localhost")
  const hostname = host.split(':')[0];

  return hostname;
}

export async function getBrandConfigFromHeaders(): Promise<BrandConfig> {
  const hostname = getHostnameFromHeaders();
  return getBrandConfig(await hostname);
}

export async function getAppNameFromHeaders(): Promise<string> {
  const brandConfig = getBrandConfigFromHeaders();
  return (await brandConfig).appName;
}
