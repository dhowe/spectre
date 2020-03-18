import React from 'react';
import DotEnv from 'dotenv';
import User from '../User/User';
import FormData from 'form-data';
import DefaultUsers from './default-users';

const { route, auth, mode } = doConfig();

// We store the current User in React context for easy access
let UserSession = React.createContext({});

UserSession.clientId = -1;
UserSession.serverErrors = 0;
UserSession.useBrowserStorage = true;
UserSession.defaultUsers = DefaultUsers;
UserSession.publicUrl = User.publicUrl;
UserSession.serverDisabled = typeof auth === 'undefined';
UserSession.adIssues = User.adIssues;
UserSession.epochDate = User.epochDate;
UserSession.oceanTraits = User.oceanTraits;
UserSession.oceanDesc = User.oceanDesc;
UserSession.oceanDesc3p = User.oceanDesc3p;
UserSession.oceanDesc2p = User.oceanDesc2p;
UserSession.storageKey = 'spectre-user';
UserSession.postexpKey = 'spectre-post';
UserSession.profileDir = '/profiles/';
UserSession.imageDir = '/imgs/';

localIPs(ip => (UserSession.clientId = ip), '192.');

/*
 * Creates a new database record: /login only
 */
UserSession.create = async (user) => {

  if (UserSession.serverDisabled) return;

  user.clientId = UserSession.clientId;

  //console.log('[POST] User.create: ' + route, user.clientId);
  const [json, e] = await safeFetch(route, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
    body: toNetworkString(user)
  });

  if (e) return (typeof e === 'string' && e.startsWith('491'))
    ? 'EmailInUse' : handleError(e, route, 'create');

  UserSession.useBrowserStorage && sessionStorage.setItem
    (UserSession.storageKey, JSON.stringify(json._id));

  return user.assign(json);
}

UserSession.fromToken = async (token) => {

  //console.log('UserSession.fromToken', token);

  if (!token) {
    console.log('[UserSession] no auth token found');
    return Promise.resolve(false);
  }

  token = token.startsWith('#') ? token.substring(1) : token;

  if (UserSession.serverDisabled) return;

  // pass uid or login value (email-address)
  const endpoint = route + 'auth/' + token;

  try {
    console.log('[GET] ' + mode + '.fromToken: ' + endpoint);
    const [json, e] = await safeFetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
    })
    if (e) return Promise.resolve(false); // invalid token

    UserSession.useBrowserStorage && sessionStorage.setItem
      (UserSession.postexpKey, JSON.stringify(json._id));

    return User.create(json);
  }
  catch (e) {
    handleError(e, endpoint, 'fromToken[2]');
  }
}

UserSession.computeInfluencesFor = User.computeInfluencesFor;

UserSession.targetImage = (target) => {
  let fname = ((target && typeof target._id !== 'undefined'
    && target._id.length) ? target._id : 'default') + '.jpg';
  return (target ? UserSession.profileDir : UserSession.imageDir) + fname;
}

/*
 * Clears data from browser session storage
 */
UserSession.clear = (context) => {
  sessionStorage.clear();
  if (context) context = new User();
  UserSession.serverErrors = 0;
  UserSession.serverDisabled = false;
  console.log('[USER] Session initialized');
}

UserSession.generateDescription = (target, adIssue, tmpl) => {
  return target ? target.generateDescription(tmpl, adIssue) : {
    //opening: '',
    description: '',
    closing: '',
    trait: ''
  }
}

UserSession.generateBasicDesc = (target, adIssue) => {
  if (!target) return ['', '', '', ''];
  let { opening, closing } = UserSession.generateDescription(target, adIssue);
  return !adIssue ? [opening.slice(0, 2).join(' '), opening[2], opening[3]] :
    [opening.slice(0, 2).join(' '), opening[2], opening[3], closing.join(' ')];
}

UserSession.oceanData = (target, adIssue) => {
  let df = { trait: '', category: 0, targetAd: { image: '', slogan: '' } };
  if (target) {
    df = User.definingTrait(target);
    df.targetAd = target.targetAd;
    df.targetAd.image = target.targetAd.image;
    df.targetAd.slogan = target.targetAd.slogan;
  }
  return {
    trait: df.trait,
    category: df.category,
    targetAd: {
      image: df.targetAd.image,
      slogan: df.targetAd.slogan
    },
    age: target ? target.age : 25,
    gender: target ? target.gender : 'female',
    genderProb: target ? target.genderProb : .9,
    name: target ? target.name : '',
    traits: target ? target.traits : {},
    image: UserSession.targetImage(target),
    objPron: target ? target.objPron() : 'them',
    persPron: target ? target.persPron() : 'they',
    possPron: target ? target.possPron() : 'their',
    updatedAt: target ? target.updatedAt : new Date(),
    sentences: UserSession.generateBasicDesc(target, adIssue)
  };
}

UserSession.postUser = () => User.create(UserSession.defaultUsers[0]);

/*
 * Repairs a user using sessionStorage and db if needed (async)
 */
UserSession.ensure = async (user, props, opts) => {

  const allowNoId = opts && opts.allowNoId;
  const forceUpdate = opts && opts.forceUpdate;

  const checkSession = async (user) => {
    // do we have an id in session
    const sid = sessionStorage.getItem(UserSession.storageKey);
    if (!sid) {
      console.log('[STUB] No user._id, creating new user');
      fillMissingProps(user, ['name', 'login',
        'virtue', 'traits', 'celebrity', 'updatedAt']);

      await UserSession.create(user); // save new user
      console.log('[STUB] Setting user._id: ' + user._id);
      return false;
    }
    else {
      let uid = JSON.parse(sid);
      console.log('[SESS] Reloaded user._id: ' + uid + ' doing lookup');
      let json = await UserSession.lookup(uid);
      Object.assign(user, json);
      return true;
    }
  }

  try {
    //let userLookup = false;
    let modified = false;

    // do we have an id, if not check session, and try to repair
    if (!allowNoId && typeof user._id === 'undefined') {
      /*userLookup = */await checkSession(user);
    }

    // should have user with id here, if not, then probably no server
    if (!user || (!allowNoId && !user._id)) {
      user._id = -1;
      console.warn('[STUB] Unable to set user._id, using ' + user._id, user);
    }

    // similars: if we need a target then we need similars
    if (props.includes('target') && !user.target) {
      if (!props.includes('similars')) props.unshift('similars');
      //console.log('  added similars', props);
    }

    // if we need a similars then, we need traits
    if (props.includes('similars') && !user.similars) {
      props = arrayRemove(props, 'similars');
      if (!User.hasOceanTraits(user)) modified = fillMissingProps(user, ['traits']);
      user = await UserSession.targets(user);
      console.log('[STUB] Fetched similars:', user.toString());
    }

    // // if we need hasImage, we need to check the db
    if (props.includes('hasImage') && !user.hasImage) {
      props = arrayRemove(props, 'hasImage');
      if (user._id !== -1) {
        let foundImage = await UserSession.hasPhoto(user._id);
        if (foundImage) user.hasImage = true;
      }
      console.log('[USER] ' + user._id + '.hasImage = ' + user.hasImage);
    }

    // stub any other properties and update if needed
    modified = fillMissingProps(user, props) || modified;
    if (modified || forceUpdate) await UserSession.update(user);
  }
  catch (e) {
    handleError(e, 'no-route', 'ensure');
  }

  return user;
}

/*
 * Repairs a user (if needed) and returns it
 */
UserSession.validate = (user, props) => {
  fillMissingProps(user, props);
  return user;
}

/*
 * Loads a user's properties from database
 */
UserSession.lookup = async (uid) => {

  if (UserSession.serverDisabled) return;

  if (!uid) throw Error('Invalid uid:', uid);

  // pass uid or login value (email-address)
  const endpoint = route + (/@/.test(uid) ? 'email/' : '') + uid;

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
    return User.create(json);
  }
  catch (e) {
    handleError(e, endpoint, 'lookup[2]');
  }
}

/*
 * Loads a user's properties from database
 */
UserSession.hasPhoto = async (uid) => {

  if (UserSession.serverDisabled) return;

  if (!uid) throw Error('Invalid uid:', uid);

  const endpoint = route + 'photo/' + uid;

  try {
    console.log('[GET] ' + mode + '.hasPhoto: ' + endpoint);
    const [bool, e] = await safeFetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
    })
    if (e) return handleError(e, route, 'lookup[1]');
    return bool;
  }
  catch (e) {
    handleError(e, endpoint, 'lookup[2]');
  }
}

/*
 * Updates database with user's properties
 */
UserSession.update = async (user) => {

  if (UserSession.serverDisabled) return;

  if (!user || !user._id) throw Error('Invalid user', user);

  const endpoint = route + user._id;

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
    return user.assign(json);
  }
  catch (e) {
    handleError(e, endpoint, 'update[2]');
  }
}

/*
 * Fetch targets for a user (requires traits)
 * Returns a mix of recent and similar users
 */
UserSession.targets = async (user) => {

  if (!user) throw Error('Null user in UserSession.targets');

  if (UserSession.serverDisabled || user._id === -1) {
    handleError('No user id', route, 'targets[1]');
    user.similars = defaultSimilars();
    return user;
  }

  if (!user.traits || typeof user.traits.openness >= 0) {
    throw Error('No traits for user #' + user._id);
  }

  const endpoint = route + 'targets/' + user._id;

  try {
    console.log('[GET] ' + mode + '.targets: ' + endpoint);
    const [json, e] = await safeFetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
    });
    if (e) return handleError(e, route, 'targets[2]');

    if (!Array.isArray(json)) throw Error
      ('Expected JSON array got ' + typeof json + ' -> ' + json);

    user.similars = json.map(sim => User.create(sim));

    return user; // ?
  }
  catch (e) {
    handleError(e, endpoint, 'targets[3]');
  }
}

/*
 * Fetch similars for a user (requires traits)
 * Returns most similar users regardless of recentness
 */
UserSession.similars = async (user) => {

  if (!user) throw Error('Null user in UserSession.similars');

  if (UserSession.serverDisabled || user._id === -1) {
    handleError('No user id', route, 'similars[1]');
    user.similars = defaultSimilars();
    return user;
  }

  if (!user.traits || typeof user.traits.openness === 'undefined') {
    throw Error('No traits for user #' + user._id);
  }

  const endpoint = route + 'similars/' + user._id;

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

    user.similars = json.map(sim => User.create(sim));

    return user; // ?
  }
  catch (e) {
    handleError(e, endpoint, 'similars[3]');
  }
}

/*
 * Uploads image to the server asynchronously
 *
 * Note that we don't wait for it - if the function returns false
 * it means we didn't get the image
 *
 * If it returns true it means ONLY that we attempted to send it.
 * To check if it succeeded, we need to check user.hasImage later
 */
UserSession.uploadImage = (user, data) => {

  if (!user || !user._id || user._id === -1) {
    console.error('[IMAGE] Bad user/id: ' + user);
    return false;
  }

  const toImageFile = (data, fname) => {
    const arr = data.split(',');
    if (!data || data.length <= 6) {
      data && console.error(data);
      console.error('[IMAGE] Bad image data: ' + data);
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
    () => console.log('[WEBCAM] Upload OK'));

  return true;
}

UserSession.postImage = async (user, image, onError, onSuccess) => { // TODO: test

  if (UserSession.serverDisabled) return;

  const fdata = new FormData();
  fdata.append('profileImage', image);
  //fdata.append('clientId', UserSession.clientId);
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

UserSession.sendMail = async (uid, email) => { // unused for now

  if (UserSession.serverDisabled) return;

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

UserSession.shuffle = (array) => { // in-place
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; // returns same array
}

/* Randomizes set of celebrities */
UserSession.randomCelebrities = () => {
  return UserSession.shuffle(UserSession.shuffle(MaleCelebs)
    .splice(0, 4).concat(FemaleCelebs));
}

UserSession.possPron = (t) => { // used for target in ocean profile
  switch (t.gender) {
    case 'male':
      return 'his';
    case 'female':
      return 'her';
    default:
      return 'their';
  }
}

UserSession.objPron = (t) => { // used for target in ocean profile
  switch (t.gender) {
    case 'male':
      return 'him';
    case 'female':
      return 'her';
    default:
      return 'them';

  }
}

UserSession.persPron = (t) => {// used for target in ocean profile
  switch (t.gender) {
    case 'male':
      return 'he';
    case 'female':
      return 'she';
    default:
      return 'they';
  }
}

/////////////////////////////// Helpers //////////////////////////////////////

const Cons = "bcdfghjklmnprstvxz".split('');
const Vows = "aeiou".split('');
const Genders = ['male', 'female'];
const Virtues = ['wealth', 'influence', 'truth', 'power'];
const FemaleCelebs = ['Kardashian', 'Abramovic'];
const MaleCelebs = ['Freeman', 'Duchamp', 'Mercury', 'Trump', 'Zuckerberg'];
const Celebrities = FemaleCelebs.concat(MaleCelebs);

function toNetworkString(user) { // don't send undefined or empty arrays
  let safe = {};
  Object.keys(User.schema()).forEach(p => {
    let val = user[p];
    if (typeof val === 'undefined') return;
    if (Array.isArray(val) && !val.length) return;
    // TODO: deal with objects here (count keys?)
    safe[p] = user[p];
  });

  return JSON.stringify(safe);
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
  let randnum = Math.random();
  if (!arguments.length) return randnum;
  return (arguments.length === 1) ? randnum * arguments[0] :
    randnum * (arguments[1] - arguments[0]) + arguments[0];
}

function irand() {
  let randnum = Math.random();
  if (!arguments.length) throw Error('requires args');
  return (arguments.length === 1) ? Math.floor(randnum * arguments[0]) :
    Math.floor(randnum * (arguments[1] - arguments[0]) + arguments[0]);
}

// function shuffle(arr) {
//   let newArray = arr.slice(),
//     len = newArray.length,
//     i = len;
//   while (i--) {
//     let p = parseInt(Math.random() * len),
//       t = newArray[i];
//     newArray[i] = newArray[p];
//     newArray[p] = t;
//   }
//   return newArray;
// }

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

        // HANDLE SPECIFIC ERROR CODES HERE (See user-controller.js)

        // if (json.status === 449) throw Error('');
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
  return undefined;
}

function doConfig() {

  DotEnv.config(); // not needed in react

  const port = 8083;
  const env = process.env;
  const path = '/api/users/';
  const host = typeof window !== 'undefined' ? window.location.host.replace(/:[0-9]{4}$/, '') : 'localhost'; // for-node
  const mode = env.NODE_ENV !== 'production' ? 'DEV' : 'PROD';

  // use https if we're in production mode
  const proto = env.NODE_ENV !== 'production' ? 'http' : 'https';

  if (!env.REACT_APP_API_USER || !env.REACT_APP_API_SECRET) {
    console.error('\nRunning client without authentication; Server/DB'
      + ' will not be available. Are you missing a .env file ?\n');
    UserSession.serverDisabled = true;
  }

  const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;

  // Here we construct server host from window.location,
  // assuming server/db is on the same host as the web-app)
  const route = proto + '://' + host + ':' + port + path;

  return { route, auth, mode };
}

// hack that uses RTC to get local ip
function localIPs(cb, prefix) {

  if (typeof window === 'undefined') return cb('localhost');

  const PeerConnect = window.RTCPeerConnection
    || window.mozRTCPeerConnection
    || window.webkitRTCPeerConnection;
  const pc = new PeerConnect({ iceServers: [] }), noop = () => { }, localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

  function iterateIP(ip) {
    if (ip && !localIPs[ip] && (!prefix || ip.startsWith(prefix))) cb(ip);
    localIPs[ip] = true;
  }

  //create a bogus data channel
  pc.createDataChannel('');

  // create offer & set local description
  pc.createOffer().then((sdp) => {
    sdp.sdp.split('\n').forEach((line) => {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });
    pc.setLocalDescription(sdp, noop, noop);

  }).catch(e => console.error('[SESSION] ' + e));

  // listen for candidate events
  pc.onicecandidate = function(ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate
      || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}

function stubMissingProps(user, props) {

  let modified = false; // check known props, 1-by-1

  function onUpdateProperty(p) {
    modified = true;
    props = arrayRemove(props, p);
    if (typeof user[p] === 'undefined') throw Error
      ('Could not stub user.' + p, user);
    let val = user[p];
    if (Array.isArray(val)) val = '[' + val.length + ']';
    if (typeof val === 'object') val = JSON.stringify(val).substring(0, 60);
    console.log('[STUB] Setting user.' + p + ': ' + val);
  };

  //console.log(missing);
  const propStubber = {
    age: () => irand(20, 60),
    gender: () => rand(Genders),
    virtue: () => rand(Virtues),
    adIssue: () => rand(UserSession.adIssues),
    traits: () => User.randomTraits(),
    name: () => (rand(Cons) + rand(Vows) + rand(Cons)).ucf(),
    login: () => user.name + Date.now() + '@test.com',
    celebrity: () => rand(Celebrities),
    updatedAt: () => new Date(),
    target: () => {
      if (!user.similars || !user.similars.length) throw Error
        ('propStubber.target -> no similars')
      let target = rand(user.similars);
      if (!target.age) target.age = irand(20, 60);
      if (!target.gender) target.gender = rand(Genders);
      User.computeInfluencesFor(target);
      return target;
    }
  };

  Object.keys(propStubber).forEach(p => {
    if (props.includes(p)) {
      user[p] = propStubber[p]();
      if (p === 'target') {
        user.targetId = user.target._id;
        User.computeInfluencesFor(user.target, UserSession.adIssues);
        //console.log('  target: '+user.targetId+"/"+JSON.stringify(user.target));
      }
      onUpdateProperty(p);
    }
  });

  return modified;
}

/*
 * Attempts to stub any undefined properties specified in props
 * Returns true if the user is provided and modified, else false
 */
function fillMissingProps(user, props) {

  //console.log('stubMissingProps.missing', user, props);

  if (typeof props === 'undefined') return true;

  if (!Array.isArray(props)) props = [props];

  // a property is missing if its undefined or an empty array or string
  let missing = props.filter(p => typeof user[p] === 'undefined'
    || ((typeof user[p] === 'string' || Array.isArray(user[p]))
      && !user[p].length) || (p === 'traits' && user[p].openness < 0));

  return missing.length ? stubMissingProps(user, missing) : false;
}

export default UserSession;
