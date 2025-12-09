const isIQI = () => {
    const host = window.location.hostname;
    if (host.includes('iqpilot')) {
        return true;
    }
    return false;
};

export default isIQI;
