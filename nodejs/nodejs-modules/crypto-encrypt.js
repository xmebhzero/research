const crypto = require("crypto");

const PRIVATE_KEY = "POPULIX";

function encrypt(text) {
  const mykey = crypto.createCipher("aes-128-cbc", PRIVATE_KEY);
  let mystr = mykey.update(text, "utf8", "hex");
  mystr += mykey.final("hex");

  return mystr;
}

const encrypted = encrypt('Random String');
console.log('Encrypted string = ', encrypted);