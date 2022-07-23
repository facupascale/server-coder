const { loggerConsole, loggerError } = require('./loggerWinston');
const { config } = require('../config');

const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require('twilio')(accountSid, authToken);

function sendTwilioSignUp(data) {
    client.messages.create({
        body: data.body,
        from: `whatsapp:${config.fromTwilio}`,
        to: `whatsapp: ${config.toTwilio}`
    })
    .then((message) => {
        loggerConsole.log('debug', message.sid);
    })
    .catch((err) => {
        loggerError.log('error', err);
    })
    .donde();
}

function sendTwilioConfirmation(textCompra, phone) { 
    client.messages.create({
        body: textCompra,
        from: `whatsapp:${config.fromTwilio}`,
        to: `whatsapp: ${phone}`
    })
    .then((message) => {
        loggerConsole.log('debug', message.sid);
    })
    .catch((err) => {
        loggerError.log('error', err);
    })
    .done();
}

function sendTwilioOrderToAdmin(textCompra, buyerPhone, email, username, adminPhone) {
    client.messages.create({
        body: `Nuevo pedido del user: ${username} con email: ${email} y telefono: ${buyerPhone} \n ${textCompra}`,
        from: `whatsapp:${config.fromTwilio}`,
        to: `whatsapp: ${adminPhone}`
    })
    .then((message) => {
        loggerConsole.log('debug', message.sid);
    })
    .catch((err) => {
        loggerError.log('error', err);
    })
    .done();
}

module.exports = { sendTwilioSignUp, sendTwilioConfirmation, sendTwilioOrderToAdmin }