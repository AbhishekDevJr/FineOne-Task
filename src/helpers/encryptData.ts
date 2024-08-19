import CryptoJS from 'crypto-js';
const secretKey = 'mySecretKey';

export const encryptData = (data: unknown | undefined) => {
    if (data && data !== '') {
        const stringifiedArray = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(stringifiedArray, secretKey).toString();
        return encrypted;
    }
};

export const decryptData = (encryptedData: unknown) => {
    if (encryptedData && encryptedData !== '') {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedArray = JSON.parse(decryptedString);
        return decryptedArray;
    }
};