import type { UserType } from 'functions/types/userTypes';

const checkAccessPermission = async (whatsappUser: UserType) => {
    if (whatsappUser?.hostname === 'explosoftai.com') {
        // search in resellers collection where field hostname = "explosoftai"
        const setting = { connectGoogle: false, flowDesign: false, webhook: false };

        if (whatsappUser?.addOnItems) {
            if (whatsappUser?.addOnItems?.toLowerCase().includes('starter')) {
                setting.connectGoogle = false;
                setting.flowDesign = false;
                setting.webhook = false;
            } else if (whatsappUser?.addOnItems?.toLowerCase().includes('advance')) {
                setting.connectGoogle = false;
                setting.flowDesign = true;
                setting.webhook = false;
            } else if (whatsappUser?.addOnItems?.toLowerCase().includes('premium')) {
                setting.connectGoogle = true;
                setting.flowDesign = true;
                setting.webhook = true;
            } else {
                return setting;
            }
            return setting;
        } else {
            console.log('More than 1 reseller with the same hostname found.');
            return setting;
        }
    }
    return { connectGoogle: true, flowDesign: true, webhook: true };
};

export default checkAccessPermission;
