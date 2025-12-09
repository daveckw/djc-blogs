import JSON5 from 'json5';
import { jsonrepair } from 'jsonrepair';

export function jsonParse(text: string) {
    if (!text) {
        return null;
    }

    try {
        const cleanText = jsonrepair(text);

        return cleanText ? JSON5.parse(cleanText) : null;
    } catch (error) {
        console.error(`Error parsing JSON: ${error}`);
        return null;
    }
}
