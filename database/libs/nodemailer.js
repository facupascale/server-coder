const nodemailer = require('nodemailer');
const { loggerError, loggerConsole } = require('./loggerWinston')
const { config } = require('../config')

function sendMailGmailWithOptions(mailOptions) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'facupascale@gmail.com',
            pass: config.passGmail
        }
    });
    transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
            loggerError.log('error', err)
            return err
        }
        loggerConsole.log('debug', info)
    });
}

/**
 * @param buyer el que realiza la compra
 * @param textCompra el texto incluido en la compra
 * @param phone el numero de telefono del comprador
 * @param email el email del comprador
 */

function sendGmailOrder(buyer, textCompra, phone, email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'facupascale@gmail.com',
            pass: config.passGmail
        }
    });

    const mailOptions = {
        from: 'The backend of the website',
        to: 'nicolaspascaleok@gmail.com',
        subject: 'New order',
        html: `<h4 style="color: blue;">Order from: ${buyer}, text: ${textCompra}, phone: ${phone}, email: ${email}. Fecha: ${new Date().toLocaleString()}</h4>`,
    };

    transporter.sendMail(mailOptions, ( err, info ) => {
        if(err) {
            loggerError.log('error', err)
            return err
        }
        loggerConsole.log('debug', info)
    });
}

module.exports = { sendMailGmailWithOptions, sendGmailOrder }