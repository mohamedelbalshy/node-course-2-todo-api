const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

/* bcrypt.genSalt(10,(err, salt)=>{
    bcrypt.hash(password, salt,(err, hash)=>{
        console.log(hash);
    })
}); */

var hashedPassword = '$2a$10$jT8pXIN8RYsGLGUXB/6CYuz1K3jGCJEQaI2QSyC7td.cEemTCDPPa';
bcrypt.compare(password, hashedPassword,(err, res)=>{
    console.log(res);
});

var data={
    id:10
};

var token = jwt.sign(data, '123abc');
console.log(token);
/* jwt.verify(token) */

var message ='I\'m user number 3';
var hash =SHA256(message ).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);