import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import sendgrid from '@sendgrid/mail';

const DEFAULT_SUBJ = 'Spectre knows you...';
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

class Mailer {

  static create(config) {

    Mailer.templates = {};
    Mailer.sendgrid = false;

    if (!config) throw Error('transport config required');

    if (config.host.includes('sendgrid')) {
      sendgrid.setApiKey(config.auth.pass)
      Mailer.sendgrid = true;
      Mailer.sendfunc = 'send';
      Mailer.transport = sendgrid;
    }
    else {
      Mailer.sendfunc = 'sendMail';
      Mailer.transport = nodemailer.createTransport(config);
    }
  }

  static async addTemplate(name, file, cb) {
    Mailer.templates[name] = await loadFile(file);
    console.log('[Mailer] add template "' + name + '" from ' + file);
  }

  static send(options, cb) {

    options = Object.assign({
      from: 'no-reply@spectreknows.me',
      to: 'spectre-test@email.com',
      subject: DEFAULT_SUBJ,
      html: DEFAULT_HTML
    }, options);

    //console.log(Object.keys(options));

    if (options.template && options.data) {
      options.html = fillTemplate(options.template, options.data);
    }

    cb = cb || ((err, info) => {
      if (err) {
        console.error('Mailer:', err)
      } else {
        console.log('Mailer:', Mailer.sendgrid ? 'SendGrid-'+info.reduce(i => i.statusMessage) : info);
        saveFile(options.html);
      }
    });

    console.log('Mailer.transport.send', Mailer.transport, Mailer.transport[Mailer.sendfunc]);
    Mailer.transport[Mailer.sendfunc](options, cb);
  }
}

function saveFile(email, fpath = '/tmp/output.html') {
  return new Promise((resolve, reject) => {
    fs.writeFile(fpath, email, (err) => {
      if (err) return reject(err);
      console.log('WROTE: ' + (fpath.startsWith('/') ? '' : process.cwd()) + fpath);
    return resolve();
  });
});
}

function fillTemplate(templateName, user) {

  if (!Mailer.templates[templateName]) throw Error
    ('No template named "' + templateName + '" in ' + Mailer.templates);

  let result = Mailer.templates[templateName]
    .replace(/%%USER.Id%%/g, user._id)
    .replace(/%%USER.Name%%/g, ucf(user.name))
    .replace(/%%USER.O%%/g, Math.round(user.traits.openness * 100))
    .replace(/%%USER.C%%/g, Math.round(user.traits.conscientiousness * 100))
    .replace(/%%USER.E%%/g, Math.round(user.traits.extraversion * 100))
    .replace(/%%USER.A%%/g, Math.round(user.traits.agreeableness * 100))
    .replace(/%%USER.N%%/g, Math.round(user.traits.neuroticism * 100));

  if (/%%/.test(result)) throw Error
    ('Unable to fill template: ' + templateName, result);

  return result;
}

function loadFile(relativePath) {
  return new Promise((resolve, reject) => {
    const fpath = path.join(__dirname, relativePath);
    return fs.readFile(fpath, { encoding: 'utf8' }, (err, file) => {
      if (err) return reject(err);
      return resolve(file);
    })
  });
}

function ucf(str) {
  return str[0].toUpperCase() + str.substring(1);
}

export default Mailer;
