function extractRecordUrl(text) {
    let urlPattern = /https?:\/\/djcsystem\.com\/records\/[a-zA-Z0-9]+/;
    let match = text.match(urlPattern);

    const urlPattern2 = /https?:\/\/iqpilot\.ai\/records\/[a-zA-Z0-9]+/;
    const match2 = text.match(urlPattern2);

    const urlPattern3 = /https?:\/\/explosoftai\.com\/records\/[a-zA-Z0-9]+/;
    const match3 = text.match(urlPattern3);

    const urlPattern4 = /https?:\/\/[^\/]+\/records\/filesADE\/[a-zA-Z0-9]+/;
    const match4 = text.match(urlPattern4);

    if (match && match[0]) {
        return match[0];
    } else if (match2 && match2[0]) {
        return match2[0];
    } else if (match3 && match3[0]) {
        return match3[0];
    } else if (match4 && match4[0]) {
        return match4[0];
    } else {
        return null;
    }
}

function removeRecordUrl(text) {
    // General pattern to match any domain with /records/ followed by alphanumeric characters
    const urlPattern = /https?:\/\/[^\/]+\/records\/(?:filesADE\/)?[a-zA-Z0-9]+/g;

    const reply = text.replace(urlPattern, "").trim();

    return reply;
}

export { extractRecordUrl, removeRecordUrl };
