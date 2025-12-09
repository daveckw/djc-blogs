import { useState, useEffect } from 'react';

import { useColorScheme } from '@mui/material/styles';

import { getBrandConfig, DEFAULT_CONFIG } from 'src/config/hostname-config';

const useLogo = () => {
  const { colorScheme } = useColorScheme();
  const [brandConfig, setBrandConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    // Only run on client-side after hydration
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const config = getBrandConfig(hostname);
      setBrandConfig(config);
    }
  }, []);

  return {
    alt: `${brandConfig.appName} logo`,
    src: colorScheme === 'dark' ? brandConfig.logo.dark : brandConfig.logo.light,
  };
};

export default useLogo;
