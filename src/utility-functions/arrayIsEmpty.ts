//To check if an array is empty using javascript
export function arrayIsEmpty(array: any[]) {
    if (Array.isArray(array)) {
        if (array.length === 0) {
            //Return TRUE if the array is empty
            return true;
        } else {
            return false;
        }
    }
    return true;
}
