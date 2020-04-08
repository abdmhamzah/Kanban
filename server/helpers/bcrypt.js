const bcrypt = require('bcrypt')
const saltRounds = process.env.SALT_ROUNDS

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash); // true
}

module.exports = { hashPassword, checkPassword }