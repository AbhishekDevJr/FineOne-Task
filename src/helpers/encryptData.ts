import CryptoJS from 'crypto-js';
const secretKey = 'mySecretKey';

//Encrypts Passed Data CryptoJS Encryption
export const encryptData = (data: unknown | undefined) => {
    if (data && data !== '') {
        const stringifiedArray = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(stringifiedArray, secretKey).toString();
        return encrypted;
    }
};

//Decrypts Passed Data CryptoJS Encryption
export const decryptData = (encryptedData: unknown): unknown | undefined => {
    if (typeof encryptedData === 'string' && encryptedData !== '') {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        try {
            const decryptedArray = JSON.parse(decryptedString);
            return decryptedArray;
        } catch (error) {
            console.error('Failed to parse decrypted data', error);
            return undefined;
        }
    }
    return undefined;
};