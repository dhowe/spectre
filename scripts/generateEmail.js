const fs = require('fs');
const btoa = require('btoa');
const dotEnv = require('dotenv');
const fetch = require('node-fetch');
const mailer = require('nodemailer');
const formatter = require('html-formatter');
const Path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const OceanComp = require('../build/Components/OceanProfile/OceanProfile').default;
const AvatarComp = require('../build/Components/AvatarComponent/AvatarComponent').default;
const { ServerStyleSheets } = require('@material-ui/core/styles');

/*******************************************************************/
//
// node generateEmail.js -u [userId] -e [emailAddress]
//
/*******************************************************************/


const StyleTag = '%STYLE%', UserNameTag = "%USERNAME%",
  OceanProfileTag = '%OCEANPROFILE%', JssTag = "%JSS%";
const DefaultSubject = 'Spectre knows about you';
const DefaultTestEmail = 'spectre-test@email.com';

let emailAddress;

dotEnv.config();

const MailConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}

async function lookupUser(uid) {

  if (!uid) throw Error('Invalid arg', uid);
  const { route, auth, mode } = doConfig();

  const endpoint = route + uid;
  try {
    console.log(mode + '.lookup: ' + endpoint);
    let response = await fetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
    });
    let json = await response.json();
    if (json.status !== 200) throw Error(JSON.stringify(json));
    return json.data;
  }
  catch (e) {
    console.error(e);
    throw e;
  }
}

function saveEmail(email, path = 'output.html') {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, email, (err) => {
      if (err) return reject(err);
      console.log('WROTE: ' + process.cwd() + '/' + path);
      return resolve();
    });
  });
}

function doConfig() {

  // get auth from .env or heroku configs
  dotEnv.config();

  const port = 8083;
  const env = process.env;
  const path = '/api/users/';
  const host = 'localhost'
  const mode = env.NODE_ENV !== 'production' ? 'DEV' : 'PROD';

  // use https if we're in production mode
  const proto = env.NODE_ENV !== 'production' ? 'http' : 'https';

  if (!env.API_USER || !env.API_SECRET) {
    console.error('Running client without authentication; Server/DB'
      + ' will not be avaiable. Are you missing a .env file ? ');
  }

  // Here we construct server host from window.location,
  // assuming server/db is on the same host as the web-app)
  const route = proto + '://' + host + ':' + port + path;

  //const host = env.REACT_APP_API_HOST || 'http://localhost:8083';
  const auth = env.API_USER + ':' + env.API_SECRET;

  if (!auth || !auth.length) console.error("Auth required!");

  //console.log('UserSession.route: '+route);
  return { auth: auth, route: route, mode: mode };
}


function getFile(relativePath) {
  return new Promise((resolve, reject) => {
    const path = Path.join(__dirname, relativePath);
    return fs.readFile(path, { encoding: 'utf8' }, (err, file) => {
      if (err) return reject(err);
      return resolve(file);
    })
  });
}

function sendEmail(message, cb) {
  let transport = mailer.createTransport(MailConfig);

  message = typeof message === 'object' ? message : { html: message };
  message = Object.assign({
    from: 'spectre@spectreknows.me',
    to: emailAddress ? emailAddress : DefaultTestEmail,
    subject: DefaultSubject
  }, message);

  cb = cb || ((err, info) => {
    if (err) {
      console.log('Mailer', err)
    } else {
      console.log('Mailer', info);
    }
  });

  //console.log('message', message);
  if (!message.html) throw Error('no html', message);

  transport.sendMail(message, cb);
}

const mockUser = {
  "name": "Sally", "influences": ["Immigration issues", "Images of large crowds", "Short, punchy slogans"], "clientId": 1, "hasImage": true, "targetId": "-1", "descriptors": ["Sally is a perfectionist.", "She prefers to plan everything to the last detail, which has consequently led to her being very successful and extremely reliable.", "Sally is far more intellectually curious and sensitive to beauty than most."], "virtue": "power", "adIssue": "leave", "traits": { "openness": 0.8253353111345854, "conscientiousness": 0.8656814140739604, "extraversion": 0.6890590896284885, "agreeableness": 0.6008941864440192, "neuroticism": 0.20154338443905195 }, "login": "sally4983578918989@mail.com", "loginType": "email", "gender": "female", "createdAt": "2019-06-03T00:12:07.599Z", "similars": [], "category": 0, "_id": "888888888888888888888888", "__v": 0
};

/**
 * Renders the React app with the passed data.
 * Returns a promise that resolves to the full email HTML.
 * @param {Object} data
 * @return {Promise.<String>}
 */
function createEmail(user) {
  return Promise.all([
    getFile('../build/Components/OceanProfile/OceanProfile.css'),
    getFile('../build/Components/AvatarComponent/AvatarComponent.css'),
    getFile('../tmpl/email.html'),
  ])
    .then(([style1, style2, template]) => {
      let sheet1 = new ServerStyleSheets();

      // Create the OCEAN component
      let oceanComp = React.createElement(OceanComp, { subject: user });
      let oceanHtml = ReactDOMServer.renderToString(sheet1.collect(oceanComp));

      //console.log(oceanHtml, '\n');

      let sheet2 = new ServerStyleSheets();

      // Create the Avatar component
      let avatarComp = React.createElement(AvatarComp, {
        target: {
          name: user.name,
          image: '/profiles/' + user._id + '.jpg'
        }
      });
      let avatarHtml = ReactDOMServer.renderToString(sheet2.collect(avatarComp));

      //console.log(avatarHtml, '\n');

      // combine the style sheets (what if there are shared styles?)
      let style = style1 + '\n\n' + style2;


      // combine the html parts (should be one component)
      let content = avatarHtml + '\n\n' + oceanHtml;

      // replace css, jss, and content in the template

      let html = template
        .replace(UserNameTag, user.name)
        .replace(OceanProfileTag, content)
        .replace(StyleTag, style)
        .replace(/\/imgs\//g, 'imgs/'); // TMP:fix image path

      const sheets = sheet1.toString() + sheet2.toString();
      //TODO: purge sheets and remove useless css
      // let purgecss = new Purgecss({
      //   content: [html],
      //   css: ['**/*.css']
      // })
      // let purgecssResult = purgecss.purge()
      html = html.replace(JssTag, sheets);

      // format html and return it
      return formatter.render(html);
    });
}

const args = require('minimist')(process.argv.slice(2));
// console.log(args)
if (args.length == 0) {
  createEmail(mockUser).then(saveEmail);
}
else {
  if (args.e) {
    emailAddress = args.e;
  }
  if (args.u) {
    lookupUser(args.u)
      .then(createEmail)
      .then(sendEmail);
  } else {
    createEmail(mockUser).then(sendEmail);
  }
}
