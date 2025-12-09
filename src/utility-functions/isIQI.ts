const isIQI = () => {
    const host = window.location.hostname;
    let isIQI = false;
    if (host.includes('iqpilot')) {
        isIQI = true;
    }
    return isIQI;
};

export default isIQI;
