const CryptoJSUtilFile = require("crypto-js");
const fs = require("fs");
const path = require("path");

const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// Change to 'config' folder
const configDir = path.resolve(srcDir, "config");
const envFilePath = `${configDir}\\.env`;
if (process.env.NODE_ENV) {
  const envFilePath = `${configDir}\\.env.${process.env.NODE_ENV}`;
}

//console.log(envFilePath);

export function encryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";
  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  const envLines = envFileContent.split("\n");

  // Encrypt values and update the array
  const encryptedLines = envLines.map((line) => {
    const [key, value] = line.split("=");

    if (value) {
      const encryptedValue = CryptoJSUtilFile.AES.encrypt(
        value,
        SALT
      ).toString();
      return `${key}=${encryptedValue}`;
    }

    return line;
  });

  // Join the lines and write back to the .env file
  const updatedEnvContent = encryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Encryption complete. Updated .env file.");
}
export function decryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";
  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  const envLines = envFileContent.split("\n");

  // Encrypt values and update the array
  const decryptedLines = envLines.map((line) => {
    const [key, value] = line.split("=");

    if (value) {
      const decryptedValue = CryptoJSUtilFile.AES.decrypt(value, SALT).toString(
        CryptoJSUtilFile.enc.Utf8
      );

      return `${key}=${decryptedValue}`;
    }

    return line;
  });

  // Join the lines and write back to the .env file
  const updatedEnvContent = decryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Decryption complete. Updated .env file.");
}
