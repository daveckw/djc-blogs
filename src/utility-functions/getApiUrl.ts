import isIQI from './isIQI';

const getApiUrl = () => {
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

    switch (environment) {
        case 'stage':
            return {
                sendWhatsappMessageApi:
                    'https://sendsinglecampaignwhatsappmessage-jocn7kywyq-as.a.run.app',
                getFBPostsApi: 'https://facebookpages-jocn7kywyq-as.a.run.app',
                getIGPostsApi: 'https://instagrampages-jocn7kywyq-as.a.run.app',
            };
        case 'production': {
            let sendWhatsappMessageApi = isIQI()
                ? 'https://sendsinglecampaignwhatsappmessage-nsse2vqt6q-as.a.run.app'
                : 'https://sendsinglecampaignwhatsappmessage-pc6xwmvyrq-as.a.run.app';
            let getFBPostsApi = isIQI()
                ? 'https://facebookpages-nsse2vqt6q-as.a.run.app'
                : 'https://facebookpages-pc6xwmvyrq-as.a.run.app';
            let getIGPostsApi = isIQI()
                ? 'https://instagrampages-nsse2vqt6q-as.a.run.app'
                : 'https://instagrampages-pc6xwmvyrq-as.a.run.app';

            return {
                sendWhatsappMessageApi,
                getFBPostsApi,
                getIGPostsApi,
            };
        }

        default:
            return {
                sendWhatsappMessageApi:
                    'https://sendsinglecampaignwhatsappmessage-jocn7kywyq-as.a.run.app',
                getFBPostsApi: 'https://facebookpages-jocn7kywyq-as.a.run.app',
                getIGPostsApi: 'https://instagrampages-jocn7kywyq-as.a.run.app',
            };
    }
};

export default getApiUrl;
