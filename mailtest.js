import Mailer from './mailer';
import dotEnv from 'dotenv';

dotEnv.config();

Mailer.create({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// const mockUser2 = {
//   "_id": "888888888888888888888888",
//   "name": "Sally",
//   "gender": "female",
//   "genderProb": .9123,
//   "age": "28",
//   "clientId": 'localhost',
//   "hasImage": true,
//   "targetId": "-1",
//   "virtue": "power",
//   "adIssue": "democrat",
//   "traits": {
//     "openness": 0.8253353111345854, "conscientiousness": 0.8656814140739604,
//     "extraversion": 0.6890590896284885, "agreeableness": 0.6008941864440192, "neuroticism": 0.20154338443905195
//   },
//   "login": "sally4983578918989@mail.com",
//   "loginType": "email",
//   "gender": "female",
//   "createdAt": new Date("2019-06-03T00:12:07.599Z"),
//   "updatedAt": new Date("2019-06-03T00:12:07.599Z")
// };

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
  "lastPage": "/,/login,/pledge,/searching,/data-is,/selfie,/personalised,/game,/thank-you,/steps,/follower,/insight-gender,/insight-skin,/insight-financial,/insight-thank-you,/insight-sexuality,/insight-political,/insight-complete,/your-power,/pick-your-side,/campaign,/dark-ad,/success-ad,/influence-a-nation,/consumer-data,/political-data,/home-data,/find-citizens,/targets-found,/launch-campaign,/campaign-results,/win,/influence-a-celebrity,/OCEAN-reveal,/take-back-control,/we-are-sorry,/goodbye",
  "name": "Barney",
  "login": "daniel@rednoise.org",
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

(async () => {
  await Mailer.addTemplate('postexp', './emails/postexp/message.html');
  Mailer.send({ template: 'postexp', data: mockUser });
})();
