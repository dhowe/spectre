
import nodemailer from 'nodemailer';
import Mailer from './mailer';
import dotEnv from 'dotenv';
import ReactDOMServer from 'react-dom/server';
import importJsx from 'import-jsx';

//const OceanProfile = importJsx('./client/src/Components/OceanProfile/OceanProfile.jsx');
const OceanProfile = importJsx('./client/src/Components/OceanProfile/OceanProfile.jsx');
const RComp = importJsx('./rcomp.jsx');

//import OceanProfile from '.jsx';


dotEnv.config();

const transport = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

if (0) {
  (async () => {
    let html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(RComp, { target: user })
    );
    console.log(html);
  })();
  //new Mailer(transport).sendMessage();
}
else if (0){

  const DEFAULT_SUBJ = 'Spectre knows about you';
  const DEFAULT_HTML = '<h3>Have the most fun you can in a dsytopia!</h3><p>Get your <b>Spectre</b> today!</p>';

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b9a44e58db6c85",
      pass: "17700f1f394508"
    }
  });

  const message = {
    from: 'spectre@spectreknows.me',
    to: 'spectre-test@email.com',
    subject: DEFAULT_SUBJ,
    body: DEFAULT_HTML
  };

  const cb = ((err, info) => {
    if (err) {
      console.log('Mailer: ', err)
    } else {
      console.log('Mailer:', info);
    }
  });

  transport.sendMail(message, cb);
}
