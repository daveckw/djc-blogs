export function getWhatsappNumber(phone: string) {
    if (!phone) return '';

    const matches = phone.toString().match(/\d/g);
    if (!matches) return '';

    let number = matches.join('');

    if (number[0] === '0') {
        number = '6' + number;
    }

    if (number[0] === '1') {
        number = '60' + number;
    }

    console.log(number);
    return number;
}
