import nodemailer from 'nodemailer';
import sendgrid from '@sendgrid/mail';

const DEFAULT_SUBJ = 'Spectre knows about you';
const DEFAULT_HTML = '<h3>Have the most fun you can in a dsytopia!</h3><p>Get your <b>Spectre</b> today!</p>';

/*
 * When creating a new Mailer object,
 * if using nodemailer the config object expects {
     host: -----------
     port: -----------
     auth: {
       user: -----------
       pass: -----------
     }}
 * if using sendgrid the config object expects {
     host: 'smtp.sendgrid.net'
     auth: {
       pass: 'YOUR_SENDGRID_API_KEY'
     }}
   }
 */
export default class Mailer {

  constructor(config) {
    if (!config) throw Error('transport config required');
    if (config && config.host === 'smtp.sendgrid.net') {
      this.sendfun = 'send';
      this.transport = sendgrid;
      this.transport.setApiKey(config.auth.pass);
    }
    else {
      this.sendfun = 'sendMessage';
      this.transport = nodemailer.createTransport(config);
    }
  }

  sendMessage(message = {}, cb) {
    message = Object.assign({
      from: 'spectre@spectreknows.me',
      to: 'spectre-test@email.com',
      subject: DEFAULT_SUBJ,
      html: DEFAULT_HTML
    }, message);

    cb = cb || ((err, info) => {
      if (err) {
        console.log('Mailer', err)
      } else {
        console.log('Mailer', info);
      }
    });

    this.transport[this.sendfun](message, cb);
  }
}
