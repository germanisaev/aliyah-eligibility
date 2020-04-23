const crypt = require('./crypt.js');
const encPassword = crypt.encrypt('5A3Cbd44');
console.log(encPassword);
console.log(crypt.decrypt(encPassword));