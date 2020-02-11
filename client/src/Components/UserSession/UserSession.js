import React from 'react';
import User from '../User/User';
import DotEnv from 'dotenv';
import FormData from 'form-data';
import DefaultUsers from './default-users';

// We store the current User in React context for easy access
let UserSession = React.createContext({});

UserSession.defaultUsers = DefaultUsers;
UserSession.useBrowserStorage = true;
UserSession.storageKey = 'spectre-user';
UserSession.profileDir = User.profileDir;
UserSession.imageDir = User.imageDir;
UserSession.serverDisabled = false;
UserSession.serverErrors = 0;

/////////////////////////// API functions /////////////////////////////

// Create a new database record: /login only
UserSession.create = async (user) => {

  if (UserSession.serverDisabled) return;

  const { route, auth, cid } = doConfig();
  if (user.clientId < 0) user.clientId = cid;

  //console.log('[POST] ' + mode + '.create: ' + route);
  const [json, e] = await safeFetch(route, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
    body: toNetworkString(user)
  });

  if (e) return handleError(e, route, 'create');

  UserSession.useBrowserStorage && sessionStorage.setItem
    (UserSession.storageKey, JSON.stringify(json._id));

  return Object.assign(user, json);
}

UserSession.sendMail = async (uid, email) => {

  if (UserSession.serverDisabled) return;

  const { route, auth, mode } = doConfig();

  const endpoint = route + 'message/' + uid + "&" + email;

  console.log('[GET] ' + mode + '.sendMail: ' + endpoint);

  const [user, e] = await safeFetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
  });
  if (e) return handleError(e, route, 'sendMail');
  return user;
}

/*
 * Clears data from browser session storage
 */
UserSession.clear = () => {
  sessionStorage.clear();
  UserSession.serverErrors = 0;
  UserSession.serverDisabled = false;
  console.log('[USER] Session initialized');
}

/*
 * Repairs a user using sessionStorage and db if needed (async)
 */
UserSession.ensure = async (user, props) => {
  let lookup = false;
  try {

    // do we have an id, if not repair it
    if (props.includes('_id') && typeof user._id === 'undefined') {
      props = arrayRemove(props, '_id');

      // do we have an id in session
      const sid = sessionStorage.getItem(UserSession.storageKey);
      if (!sid) {
        console.warn('[STUB] No user._id, creating new user');
        fillMissingProperties(user,
          ['login', 'name', 'gender', 'virtue', 'adIssue', 'traits', 'celebrity']);

        await UserSession.create(user);
        console.warn('[STUB] Setting user._id: ' + user._id);

      }
      else {
        user._id = JSON.parse(sid);
        console.warn('[SESS] Reloaded user._id: ' + user._id + ' doing lookup');
        await UserSession.lookup(user);
        lookup = true;
      }
    }

    // should have user with id here, if not, then probably no server
    if (!user || !user._id) {
      user._id = -1;
      console.warn('[STUB] Unable to set user._id, using ' + user._id);
    }

    // if we are dealin with hasImage, we need to check the db
    if (props.includes('hasImage')) {
      props = arrayRemove(props, 'hasImage');
      if (user._id !== -1 && !lookup) await UserSession.lookup(user);
      console.log('[USER] '+user._id + '.hasImage = ' + user.hasImage);
    }

    if (props.includes('target') && !user.similars.length) {
      user = await UserSession.similars(user);
      console.warn('[STUB] Fetched similars:', user.toString());
    }

    let modified = fillMissingProperties(user, props);
    if (modified) await UserSession.update(user);
  }
  catch (e) {
    handleError(e, '', 'ensure');
  }
  return user;
}

/*
 * Repairs a user (if needed) and returns it
 */
UserSession.validate = (user, props) => {
  fillMissingProperties(user, props);
  return user;
}

/*
 * Loads users fields from database
 */
UserSession.lookup = async (user) => {

  if (UserSession.serverDisabled) return;

  if (!user || !user._id) throw Error('Invalid arg', user);
  const { route, auth, cid, mode } = doConfig();
  if (user.clientId < 0) user.clientId = cid;
  const endpoint = route + user._id;
  try {
    console.log('[GET] ' + mode + '.lookup: ' + endpoint);
    const [json, e] = await safeFetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
    })
    if (e) return handleError(e, route, 'lookup[1]');
    return Object.assign(user, json);
  }
  catch (e) {
    handleError(e, endpoint, 'lookup[2]');
  }
}

UserSession.update = async (user) => {

  if (UserSession.serverDisabled) return;

  if (!user || !user._id) throw Error('Invalid user', user);

  const { route, auth, cid, mode } = doConfig();
  const endpoint = route + user._id;

  if (user.clientId < 0) user.clientId = cid;

  try {
    console.log('[PUT] ' + mode + '.update: ' + endpoint);
    const [json, e] = await safeFetch(endpoint, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
      body: toNetworkString(user)
    })
    if (e) return handleError(e, route, 'update[1]');
    return Object.assign(user, json);
  }
  catch (e) {
    handleError(e, endpoint, 'update[2]');
  }
}

UserSession.similars = async (user) => {

  if (!user) throw Error('Null user in UserSession.similars');

  const { route, auth, cid, mode } = doConfig();

  if (UserSession.serverDisabled || user._id === -1) {
    handleError('No user id', route, 'similars[1]');
    user.similars = defaultSimilars();
    return user;
  }

  if (!user.traits || typeof user.traits.openness === 'undefined') {
    throw Error('No traits for user #' + user._id);
  }
  const endpoint = route + 'similars/' + user._id;
  if (user.clientId < 0) user.clientId = cid;
  try {
    console.log('[GET] ' + mode + '.similars: ' + endpoint);
    const [json, e] = await safeFetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
    });
    if (e) return handleError(e, route, 'similars[2]');
    user.similars = json;
    return user;
  }
  catch (e) {
    handleError(e, endpoint, 'similars[3]');
  }
}

UserSession.uploadImage = (user, data) => {

  const toImageFile = (data, fname) => {
    const arr = data.split(',');
    if (!data || data.length <= 6) {
      data && console.error(data);
      console.error('Bad image data: ' + data);
      return null;
    }
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fname, { type: mime });
  }

  if (!user || !data || !data.length) return false;
  const imgfile = toImageFile(data, user._id + '.jpg');
  if (!imgfile) return false;
  UserSession.postImage(user, imgfile,
    (e) => console.error('[WEBCAM] Error', e),
    () => user.hasImage = true);
  return true;
}

UserSession.postImage = async (user, image, onError, onSuccess ) => { // TODO: test

  if (UserSession.serverDisabled) return;

  const { route, auth, mode } = doConfig();

  const fdata = new FormData();
  fdata.append('profileImage', image);
  fdata.append('clientId', process.env.CLIENT_ID);
  //fdata.append('videoId', 2);

  const endpoint = route + 'photo/' + user._id;
  try {
    console.log('[POST] ' + mode + '.postImage: ' + endpoint);
    const [json, e] = await safeFetch(endpoint, {
      method: "post",
      headers: { "Authorization": 'Basic ' + btoa(auth) },
      body: fdata // JSON.stringfy(fdata) ??
    })
    if (e) {
      console.log('ERROR', e);
      handleError(e, route, 'postImage[1]');
      if (typeof onError === 'function') onError(e);
      return null;
    }
    if (typeof onSuccess === 'function') onSuccess(json);
    return json; // what to do here?
  }
  catch (e) {
    handleError(e, endpoint, 'postImage[2]');
  }
}

/*
 * Logs available fields to the console
 */
UserSession.log = u => u.toString();

/*
 * Randomizes set of celebrities
 */
UserSession.randomCelebrities = () => {
  return shuffle(shuffle(MaleCelebs).splice(0, 4).concat(FemaleCelebs));
}

/////////////////////////////// Helpers //////////////////////////////////////

const Cons = "bcdfghjklmnprstvxz".split('');
const Vows = "aeiou".split('');
const AdIssues = ['remain', 'leave'];
const Genders = ['male', 'female', 'other'];
const Virtues = ['wealth', 'influence', 'truth', 'power'];
const FemaleCelebs = ['Kardashian', 'Abramovic'];
const MaleCelebs = ['Freeman', 'Duchamp', 'Mercury', 'Trump', 'Zuckerberg'];
const Celebrities = FemaleCelebs.concat(MaleCelebs);

/*
 * Attempts to stub any undefined properties specified in props
 * Returns true if the user is modified, else false
 */
function fillMissingProperties(user, props) {
  //console.log(props);
  const checkTargetAdData = (missing) => {
    if (user.adIssue && user.adIssue.length &&
      user.target && user.target._id.length) {
      if (!(user.targetImages && user.targetImages.length &&
        user.targetSlogans && user.targetSlogans.length &&
        user.targetInfluences && user.targetInfluences.length)) {
        user.computeTargetAdData();
        missing = arrayRemove(missing,
          ['targetImages', 'targetSlogans', 'targetInfluences']);
        modified = true;
      }
    }
    return missing;
  }

  const onUpdateProperty = (p) => {
    modified = true;
    missing = arrayRemove(missing, p);
    if (typeof user[p] === 'undefined') throw Error
      ('Could not stub user.' + p, user);
    let val = user[p];
    if (Array.isArray(val)) val = '[' + val.length + ']';
    if (p === 'target') val = val.name + '/#' + val._id;
    if (typeof val === 'object') val = JSON.stringify(val).substring(0, 60);
    console.warn('[STUB] Setting user.' + p + ': ' + val);
  };

  if (typeof props === 'undefined') return true;
  if (typeof user === 'undefined') throw Error('Null user');

  if (!Array.isArray(props)) props = [props];

  // a property is missing if its undefined or an empty array or string
  let missing = props.filter(p => typeof user[p] === 'undefined'
    || ((typeof user[p] === 'string' || Array.isArray(user[p]))
    && !user[p].length));

  if (!missing || !missing.length) return false; // all props are ok

  let modified = false; // check known props, 1-by-1
  let propStubber = {
    gender: () => rand(Genders),
    virtue: () => rand(Virtues),
    adIssue: () => rand(AdIssues),
    traits: () => User._randomTraits(),
    name: () => (rand(Cons) + rand(Vows) + rand(Cons)).ucf(),
    login: () => user.name + (+new Date()) + '@test.com',
    celebrity: () => rand(Celebrities),
    target: () => {
      if (!user.similars.length) throw Error('no similars');
      return rand(user.similars);
    }
  };

  console.log(missing);

  Object.keys(propStubber).forEach(p => {
    if (missing.includes(p)) {
      user[p] = propStubber[p]();
      if (p === 'target') user.targetId = user.target._id;
      onUpdateProperty(p);
    }
  });

  missing = checkTargetAdData(missing);

  if (missing.length) throw Error
    ('Unable to stub user properties: ' + missing);

  return modified;
}

function toNetworkString(user) {
  let safe = {};
  Object.keys(User.schema()).forEach(p => {
    let val = user[p];
    if (typeof val === 'undefined') return;
    if (Array.isArray(val) && !val.length) return;
    // TODO: deal with objects here
    safe[p] = user[p];
  });

  return JSON.stringify(safe);
}

function doConfig() {

  // get auth from .env or heroku configs
  DotEnv.config();

  const port = 8083;
  const env = process.env;
  const path = '/api/users/';
  const host = window.location.host.replace(/:[0-9]{4}$/, '');
  const mode = env.NODE_ENV !== 'production' ? 'DEV' : 'PROD';

  // use https if we're in production mode
  const proto = env.NODE_ENV !== 'production' ? 'http' : 'https';

  if (!env.REACT_APP_API_USER || !env.REACT_APP_API_SECRET) {
    console.error('\nRunning client without authentication; Server/DB'
      + ' will not be available. Are you missing a .env file ?\n');
    UserSession.serverDisabled = true;
  }

  const cid = env.REACT_APP_CLIENT_ID || -1;

  // Here we construct server host from window.location,
  // assuming server/db is on the same host as the web-app)
  const route = proto + '://' + host + ':' + port + path;

  //const host = env.REACT_APP_API_HOST || 'http://localhost:8083';
  const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;

  if (!auth || !auth.length) console.error("Auth required!");
  //console.log('route: '+route);
  return { auth: auth, route: route, clientId: cid, mode: mode };
}

function defaultSimilars() {
  return [
    { "_id": "111111111111111111111111", "name": "Remy", "traits": { "openness": 0.5818180970605207, "conscientiousness": 0.07645862267650672, "extraversion": 0.2607193320319028, "agreeableness": 0.012588228025398163, "neuroticism": 0.16712815071948772 } },
    { "_id": "222222222222222222222222", "name": "Bailey", "traits": { "openness": 0.10280703242247147, "conscientiousness": 0.6791763609042916, "extraversion": 0.6985730973994828, "agreeableness": 0.47335712795485274, "neuroticism": 0.32620076142720156 } },
    { "_id": "333333333333333333333333", "name": "Devin", "traits": { "openness": 0.26472484195144963, "conscientiousness": 0.2892253599406023, "extraversion": 0.32397862254097665, "agreeableness": 0.8301260855442676, "neuroticism": 0.6126764672471925 } },
    { "_id": "444444444444444444444444", "name": "Tyler", "traits": { "openness": 0.261833848989681, "conscientiousness": 0.19995491789138597, "extraversion": 0.6466838313828751, "agreeableness": 0.15648014141226163, "neuroticism": 0.37933032099722275 } },
    { "_id": "555555555555555555555555", "name": "Fran", "traits": { "openness": 0.42866686430348433, "conscientiousness": 0.4582048165214141, "extraversion": 0.37864167613148236, "agreeableness": 0.40931183419981254, "neuroticism": 0.46558790819496987 } },
    { "_id": "666666666666666666666666", "name": "Pat", "traits": { "openness": 0.7254487613475398, "conscientiousness": 0.3476980731832755, "extraversion": 0.9655087407390435, "agreeableness": 0.17024963297245255, "neuroticism": 0.6609212676018463 } },
    { "_id": "777777777777777777777777", "name": "Sam", "traits": { "openness": 0.9725230338248465, "conscientiousness": 0.27205052534770147, "extraversion": 0.07632586533756269, "agreeableness": 0.15602596134535318, "neuroticism": 0.4848698832786795 } },
    { "_id": "888888888888888888888888", "name": "Reed", "traits": { "openness": 0.2773518607894794, "conscientiousness": 0.8456532878428138, "extraversion": 0.4515471612661024, "agreeableness": 0.6249880747419794, "neuroticism": 0.6186244869965476 } },
    { "_id": "999999999999999999999999", "name": "Terry", "traits": { "openness": 0.30426635874427355, "conscientiousness": 0.5341590821850326, "extraversion": 0.509056193557774, "agreeableness": 0.8109949037515642, "neuroticism": 0.4252958718086144 } }
  ];
}

function arrayRemove(a, v) {
  return Array.isArray(v) ?
    a.filter(i => !v.includes(i)) : a.filter(i => i !== v)
}

function rand() {
  if (arguments.length === 1 && arguments[0].length) {
    return arguments[0][irand(arguments[0].length)];
  }
  var randnum = Math.random();
  if (!arguments.length) return randnum;
  return (arguments.length === 1) ? randnum * arguments[0] :
    randnum * (arguments[1] - arguments[0]) + arguments[0];
}

function irand() {
  var randnum = Math.random();
  if (!arguments.length) throw Error('requires args');
  return (arguments.length === 1) ? Math.floor(randnum * arguments[0]) :
    Math.floor(randnum * (arguments[1] - arguments[0]) + arguments[0]);
}

function shuffle(arr) {
  let newArray = arr.slice(),
    len = newArray.length,
    i = len;
  while (i--) {
    let p = parseInt(Math.random() * len),
      t = newArray[i];
    newArray[i] = newArray[p];
    newArray[p] = t;
  }
  return newArray;
}

/*
async function assignJsonResp(user, json) {
  if (!json) throw Error('Null json in assignJsonResp:' + user);
  if (json.status !== 200) throw Error(JSON.stringify(json));
  Object.assign(user, json.data);
  return user;
}


async function safeJson(user, res, route, func) {
  let [json, e] = handle(res.json());
  if (e || !json) return handleError(e, route, func);
  return assignJsonResp(user, json);
}

function handle(promise) {
  return promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]));
}
*/

async function safeFetch() {
  return fetch(...arguments)
    .then(resp => {
      //console.log('safeFetch1.resp',resp);
      return resp ? resp.json() :
        Promise.resolve([undefined, 'no-response'])
    })
    .then(json => {
      //console.log('safeFetch2.json',json);
      if (!json) return Promise.resolve([undefined, 'no-json-data'])
      if (json.status !== 200) {
        return Promise.resolve([undefined, json.status + '/' + (json.message || 'no-message')])
      }
      return [json.data, undefined];
    })
    .catch(error => Promise.resolve([undefined, error]));
}

function handleError(e, route, func) {
  UserSession.serverErrors++;
  route = route || 'unknown-route';
  func = func || 'unknown-function';
  console.error('[ERROR] UserSession(' + UserSession.serverErrors
    + ') :: ' + func + ' -> ' + route + '\n' + e);
  if (UserSession.serverErrors >= 3) {
    console.error("Disabling server calls after ["
      + UserSession.serverErrors + '] errors');
    UserSession.serverDisabled = true;
  }
  //if (process.env.NODE_ENV !== 'production') throw e;
}

export default UserSession;
