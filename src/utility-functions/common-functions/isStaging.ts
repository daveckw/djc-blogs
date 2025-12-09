import { CONFIG } from 'src/global-config';

export const isStaging = () => CONFIG.environment === 'stage';
