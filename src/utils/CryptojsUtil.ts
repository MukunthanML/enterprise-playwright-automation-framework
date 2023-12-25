// Include CryptoJS library (make sure to include it in your project)
// You can download it from: https://cryptojs.gitbook.io/docs/
let CryptoJSUtil= require('crypto-js');
let fs = require('fs');

// Get the SALT from the system environment variable
const SALT = process.env.SALT || 'defaultSalt';

// Encryption function
export function encrypt(text:string) {
  const cipherText = CryptoJSUtil.AES.encrypt(text, SALT).toString();
  return cipherText;
}

// Decryption function
export function decrypt(cipherText:string) {
  const bytes = CryptoJSUtil.AES.decrypt(cipherText, SALT);
  const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
  return originalText;
}


// Example usage
// const plaintext = 'Hello, World!';
// const encryptedText = encrypt(plaintext);
// console.log('Encrypted:', encryptedText);

// const decryptedText = decrypt(encryptedText);
// console.log('Decrypted:', decryptedText);

