const formatInput = (input: string) => {
    const hostname = window.location.hostname;

    if (hostname === 'explosoftai.com') {
        return input.replace('https://djcsystem.com/', '');
    }

    return input;
};

export default formatInput;
