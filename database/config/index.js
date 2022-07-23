require('dotenv').config();

let config = {
    port: process.env.PORT || 8000,
    cors: process.env.CORS,
    passGmail: process.env.PASS_GMAIL,
    toTwilio: process.env.TO_TWILIO,
    fromTwilio: process.env.FROM_TWILIO,
    accountSid: process.env.ACCOUNT_SID,
    authToken: process.env.AUTH_TOKEN,
}

let mongo_db = {
    uri: process.env.MONGO_DB_URI,
    name: process.env.DB_NAME,
    mongo_atlas: process.env.MONGO_DB_ATLAS,
}

module.exports = { config, mongo_db } 