//###### This file is used to get the hostname config for the app
import { useState, useEffect } from 'react';

/* Type definitions */
type HostNameConfigType = {
  appTitle: string;
  secretCode: string;
  websiteName: string;
  copyrightLink: string;
  customCopyright?: string;
};
/* Type definitions */

export function getHostNameRemoveLastDot(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  let host = window.location.hostname;
  host = host.replace(/\.$/, '');
  return host;
}

export function getHostnameConfig(hostname: string) {
  switch (hostname) {
    case 'iqiglobal.me':
    case 'pilot.iqiglobal.com':
    case 'iqipilot.com':
    case 'iqpilot.ai':
      return {
        appTitle: 'IQPilot',
        secretCode: 'iqi155',
        websiteName: 'iqpilot.ai',
        copyrightLink: 'https://iqpilot.ai',
        customCopyright: undefined,
      };

    case 'explosoftai.com':
      return {
        appTitle: 'Explosoft AI System',
        secretCode: 'ai123',
        websiteName: 'explosoftai.com',
        copyrightLink: 'https://explosoftai.com',
        customCopyright: 'by Explosoft International Sdn. Bhd. All Rights Reserved',
      };

    case 'agrotech.djcsystem.com':
    case 'my-aibizbot.web.app':
    case 'my-aibizbot.com':
    case 'agrotech.explosoftai.com':
      return {
        appTitle: 'Agro Tech AI System',
        secretCode: 'ai123',
        websiteName: 'my-aibizbot.com',
        copyrightLink: 'https://my-aibizbot.com',
        customCopyright: 'by Agro Tech. All Rights Reserved',
      };

    case 'aichat.soogege.com.my':
      return {
        appTitle: 'Soogege AI System1',
        secretCode: 'ai123',
        websiteName: 'aichat.soogege.com.my',
        copyrightLink: 'https://aichat.soogege.com.my',
        customCopyright: 'by Soogege Services. All Rights Reserved',
      };

    case 'ai.createvalue.international':
      return {
        appTitle: 'Create Value AI System',
        secretCode: 'ai123',
        websiteName: 'ai.createvalue.international',
        copyrightLink: 'https://ai.createvalue.international',
        customCopyright: 'by Create Value. All Rights Reserved',
      };

    case 'ipassiveai.com':
      return {
        appTitle: 'Ipassive AI System',
        secretCode: 'ai123',
        websiteName: 'ipassiveai.com',
        copyrightLink: 'https://ipassiveai.com/',
        customCopyright: 'by Ipassiveai. All Rights Reserved',
      };

    default:
      return {
        appTitle: 'DJC System',
        secretCode: 'djc123',
        websiteName: 'djcsystem.com',
        copyrightLink: 'https://djcsystem.com',
        customCopyright: undefined,
      };
  }
}

export function useHostnameConfig() {
  const [hostnameConfig, setHostnameConfig] = useState<HostNameConfigType>(() => 
    // Default fallback for SSR
     ({
      appTitle: 'DJC System',
      secretCode: 'djc123',
      websiteName: 'djcsystem.com',
      copyrightLink: 'https://djcsystem.com',
      customCopyright: undefined,
    })
  );

  useEffect(() => {
    // Only run on client side
    const hostname = getHostNameRemoveLastDot();
    const config = getHostnameConfig(hostname);
    setHostnameConfig(config);
  }, []);

  return hostnameConfig;
}
