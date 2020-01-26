import nodemailer from 'nodemailer';

const DEFAULT_SUBJ = 'Spectre knows about you';
const DEFAULT_HTML = '<h3>Have the most fun you can in a dsytopia!</h3><p>Get your <b>Spectre</b> today!</p>';

export default class Mailer {

  constructor(config) {
    if (!config) throw Error('transport config required');
    console.log('config', config);
    this.transport = nodemailer.createTransport(config);
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

    console.log('message', message);

    let x = this.transport.sendMail(message, cb);

    console.log('done',x);
  }
}
