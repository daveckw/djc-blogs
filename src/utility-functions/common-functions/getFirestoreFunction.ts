import isIQI from './isIQI';
import { isStaging } from './isStaging';

export const getFirestoreFunctionEndpoint = (functionName: string) => {
    const projectId = isIQI() ? 'nsse2vqt6q' : isStaging() ? 'jocn7kywyq' : 'pc6xwmvyrq';
    return `https://${functionName}-${projectId}-as.a.run.app`;
};
