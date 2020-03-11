import dotEnv from 'dotenv';
import nodemailer from 'nodemailer';
import sgtransport from 'nodemailer-sendgrid-transport';
import Email from 'email-templates';
import User from './shared/user';
import jwt from 'jsonwebtoken';

dotEnv.config();

const mockUser = {
  "_id": "5e56a91bcfb40cd44632e445",
  "traits": {
    "openness": 0.601447209260043,
    "conscientiousness": 0.346979744821783,
    "extraversion": 0.331617600335609,
    "agreeableness": 0.543295746825478,
    "neuroticism": 0.421007407170044,
    "relationship": -1,
    "gender": "0.3241474119053999",
    "age": 0.467209940936
  },
  "clientId": "192.168.2.28",
  "hasImage": false,
  "keepData": false,
  "name": "Barney",
  "login": "barney.francis@gmail.com",
  "createdAt": "2020-02-26T17:20:08.591Z",
  "updatedAt": "2020-02-26T17:29:24.388Z",
  "loginType": "email",
  "__v": 0,
  "dataChoices": {
    "consumer": "Online Search History,Shopping & Mail Order,Social Media",
    "political": "Voting Records,Financial Records,Online Maps",
    "home": "Smart TV,Baby Monitor,FitBit"
  },
  "targetAd": {
    "image": "imgs/democrat_2.2.jpg",
    "slogan": "Don't gamble with our future"
  },
  "virtue": "power",
  "age": 35.2118911743164,
  "genderProb": 0.994490385055542,
  "targetId": "666666666666666666666666",
  "adIssue": "democrat",
  "celebrity": "Zuckerberg",
  "gender": "male"
};

const SENDGRID = true;

const transport = nodemailer.createTransport(SENDGRID ? sgtransport({
  auth: {
    api_key: process.env.SMTP_APIKEY
  }
}) : {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

function generateToken(user) {
  if (!process.env.JWT_SECRET || !process.env.JWT_SECRET.length) {
    throw Error('JWT_SECRET appears to be missing in your .env');
  }
  return jwt.sign(
    { uid: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1w' }
  );
}

function assignToken(user) {
  user.token = generateToken(user);
  return user;
}

const email = new Email({
  message: {
    from: 'no-reply@spectreknows.me'
  },
  // uncomment below to send emails in development/test env:
  //send: true,
  //transport: transport
  transport: { jsonTransport: true }
});

console.log(jwt.sign(
  { uid: '444444444444444444444444' },
  process.env.JWT_SECRET,
  { expiresIn: '1y' }));

email.send({
  template: 'postexp',
  message: {
    to: mockUser.login
  },
  locals: assignToken(mockUser)
})
  .then((o) => console.log(Object.keys(o)))
  .catch(console.error);
