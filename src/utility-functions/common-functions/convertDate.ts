export default function convertDate(date: unknown): Date | null {
    if (!date) return null;

    try {
        if (isNumeric(date)) {
            date = parseFloat(date as string);
        }

        let newDate: Date | number | string = date as Date | number | string;
        if (typeof date !== 'object' || date === null) {
            if (typeof date === 'number') {
                newDate = new Date(date * 1000); // change Unix time
            }
            if (typeof date === 'string') {
                newDate = new Date(date);
            }
        } else {
            // Handle Firebase Timestamp-like objects
            if ('seconds' in date && typeof date.seconds === 'number') {
                newDate = new Date(date.seconds * 1000);
            }

            if ('_seconds' in date && typeof date._seconds === 'number') {
                newDate = new Date(date._seconds * 1000);
            }
        }

        if (date instanceof Date) newDate = date;
        const d = new Date(newDate);

        return d;
    } catch (error: any) {
        console.error('Error converting date:', error.message);
        return null;
    }
}

function isNumeric(str: unknown): boolean {
    if (typeof str !== 'string') return false; // we only process strings!
    return (
        !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    );
}
