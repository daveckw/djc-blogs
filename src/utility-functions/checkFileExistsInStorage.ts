import { getStorage, ref, getMetadata } from 'firebase/storage';

const checkFileExistsInStorage = async (downloadURL: string) => {
    try {
        const storage = getStorage();
        const fileRef = ref(storage, downloadURL);
        await getMetadata(fileRef);
        return true; // File exists
    } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
            return false; // File doesn't exist
        }
        console.error('Error checking file existence:', error);
        return false; // Assume file doesn't exist on any other error
    }
};

export default checkFileExistsInStorage;
