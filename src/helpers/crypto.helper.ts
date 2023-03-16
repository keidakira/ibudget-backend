import * as cryptojs from "crypto-js";
import * as dotenv from "dotenv";

dotenv.config();

const SALT = process.env.SALT;

const hash = (password) => {
    return cryptojs.SHA256(password + SALT).toString(
        cryptojs.enc.Hex
    );
};

export const CryptoHelper = {
    hash,
};