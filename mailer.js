import nodemailer from 'nodemailer';
import { renderToStaticMarkup } from 'react-dom/server'

const DEFAULT_SUBJ = 'Spectre knows about you';
const DEFAULT_HTML = '<h3>Have the most fun you can in a dsytopia!</h3><p>Get your <b>Spectre</b> today!</p>';

export default class Mailer {

  constructor(config) {
    if (!config) throw Error('transport config required');
    console.log('config', config);
    this.transport = nodemailer.createTransport(config);
  }

  renderReactComp(body) {
    const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ' +
      '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
    return doctype + renderToStaticMarkup(body);
  }

  /*  function default_1(config, emails) {
        const { transport: transportConfig, defaults } = config;
        const transport = nodemailer_1.createTransport(transportConfig, defaults);
        return {
            send(template, props, message) {
                const { subject, body } = emails[template](props);
                return transport.sendMail(Object.assign({ subject, html: renderBody(body) }, message));
            },
        };
    }
  */
  sendReactComp(template, props, message) {
    const { subject, body } = emails[template](props);
    return transport.sendMail(Object.assign({ subject, html: renderReactComp(body) }, message));
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

    //console.log('message', message);

    this.transport.sendMail(message, cb);
  }
}
