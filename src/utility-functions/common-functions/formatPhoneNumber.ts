function formatPhoneNumber(phone: string | number | undefined): string {
    if (!phone) return '';

    // Check if it's a group message
    if (typeof phone === 'string' && phone.includes('@g.us')) return phone;
    if (typeof phone === 'string' && phone.includes('@lid')) return phone;

    // Convert number to string
    const p: string = typeof phone === 'number' ? phone.toString() : phone;

    // Remove non-numeric characters
    let cleanedPhone = p.replace(/[^0-9]/g, '');

    // Add "6" if the phone number starts with "0"
    if (cleanedPhone[0] === '0') {
        cleanedPhone = `6${cleanedPhone}`;
    }

    // if (cleanedPhone[0] === '1') {
    //     cleanedPhone = `60${cleanedPhone}`;
    // }

    return cleanedPhone;
}

export default formatPhoneNumber;
