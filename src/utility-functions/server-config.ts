import { headers } from 'next/headers';

import { getBrandConfig } from 'src/config/hostname-config';

export async function getServerAppName(): Promise<string> {
    const headersList = headers();
    const host = (await headersList).get('host') || '';
    const hostname = host.split(':')[0];
    const brandConfig = getBrandConfig(hostname);
    return brandConfig.appName;
}

export async function getServerBrandConfig() {
    const headersList = headers();
    const host = (await headersList).get('host') || '';
    const hostname = host.split(':')[0];
    console.log('Host:', host);
    console.log('Hostname:', hostname);

    const brandConfig = getBrandConfig(hostname);

    return brandConfig;
}
