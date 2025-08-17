
const jwt = require('jsonwebtoken');

const generateToken = async (paylod) => {
    return await jwt.sign(paylod, process.env.SECRET_KEY, {expiresIn: '1h'})
}

module.exports = generateToken