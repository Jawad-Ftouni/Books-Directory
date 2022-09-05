const bcrypt = require('bcrypt');

function compareHash(password, hashed){
return bcrypt.compareSync(password, hashed);
}
module.exports = compareHash;