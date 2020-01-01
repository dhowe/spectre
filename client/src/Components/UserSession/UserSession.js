import React from 'react';
import User from '../User/User';
import DotEnv from 'dotenv';
import FormData from 'form-data';

// We store the current User in React context for easy access
let UserSession = React.createContext({});

UserSession.defaultUsers = [
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
UserSession.storageKey = 'spectre-user';
UserSession.profileDir = User.profileDir;
UserSession.imageDir = User.imageDir;
UserSession.Cons = "bcdfghjklmnprstvxz";
UserSession.Vows = "aeiou";

// load default set of users in case no db
fetch('/default-users.json').then(res => res.json())
  .then(users => {
    UserSession.defaultUsers = users;
  }).catch(e => {
    console.error('UserSession.defaultUsers:', e);
  });

//////////////////////// functions //////////////////////

/*
 * Logs available fields to the console
 */
UserSession.log = u => u.toString();

/*
 * Clears data from browser session storage
 */
UserSession.clear = function() {
  sessionStorage.clear();
  console.log('[USER] Session initialized');
}

/*
 * Repairs a user using sessionStorage and db if needed (async)
 */
UserSession.ensure = function(user, props, onSuccess, onError) {

  onSuccess = onSuccess || (() => {});

  onError = onError || (e => {
    console.error('[ERROR] UserSession.ensure: ', e);
    if (process.env.NODE_ENV !== 'production') throw e;
  });

  const saveUser = (dirty) => {
    if (dirty) {
      UserSession.update(user, onSuccess, onError);
    }
    else {
      onSuccess(user);
    }
  }

  // handle missing user id
  if (props.includes('_id') && typeof user._id === 'undefined') {
    props = arrayRemove(props, '_id');
    const sid = sessionStorage.getItem(UserSession.storageKey);

    // redirect to /login here ? or stub a new user from scratch?
    if (!sid) throw Error('Undefined user._id not in session:' + user);

    user._id = JSON.parse(sid);
    console.warn('[SESS] Reloaded user._id: ' + user._id+' doing lookup');
    UserSession.lookup(user, json => {
      Object.assign(user, json);
      saveUser(UserSession.fillMissingProperties(user, props));
    }, onError);
  }
  else {
    saveUser(UserSession.fillMissingProperties(user, props));
  }
}

/*
 * Repairs a user (if needed) and returns it
 */
UserSession.validate = function(user, props) {
  UserSession.fillMissingProperties(user, props);
  return user;
}

/*
 * Attempts to stub any undefined properties specified in props
 * Returns true if the user is modified, else false
 */
UserSession.fillMissingProperties = function(user, props) {

  const onUpdateProperty = (p) => {
    modified = true;
    missing = arrayRemove(missing, p);
    let val = user[p];
    if (Array.isArray(val)) val = user[p].length + ' users';
    if (typeof val !== 'string') val = JSON.stringify
      (user[p]).substring(0, 75) + '...';
    console.warn('[STUB] Setting user.' + p + ': ' + val);
  };

  if (typeof props === 'undefined') return true;
  if (typeof user === 'undefined') throw Error('Null User');

  if (!Array.isArray(props)) props = [props];

  let missing = props.filter(p => typeof user[p] === 'undefined'
    || (Array.isArray(user[p]) && !user[p].length));

  if (!missing) return false; // all props are ok

  let prop = 'name', modified = false;

  if (missing.includes(prop)) {
    const cons = UserSession.Cons, vows = UserSession.Vows;
    user[prop] = (cons[Math.floor(Math.random() * cons.length)]
      + vows[Math.floor(Math.random() * vows.length)]
      + cons[Math.floor(Math.random() * cons.length)]).ucf();
    onUpdateProperty(prop);
  }

  prop = 'login';
  if (missing.includes(prop)) {
    user[prop] = user.name + (+new Date()) + '@test.com';
    onUpdateProperty(prop);
  }

  prop = 'virtue';
  if (missing.includes(prop)) {
    user[prop] = rand(['wealth', 'influence', 'truth', 'power']);
    onUpdateProperty(prop);
  }

  prop = 'gender';
  if (missing.includes(prop)) {
    user[prop] = rand(['male', 'female', 'other']);
    onUpdateProperty(prop);
  }

  prop = 'target';
  if (missing.includes(prop)) {
    if (!user.similars.length) throw Error('no similars');
    user[prop] = rand(user.similars);
    if (typeof user.target !== 'object') throw Error
      ('user.target != object', typeof user.target, user.target);
    onUpdateProperty(prop);
  }

  prop = 'traits';
  if (missing.includes(prop)) {
    user._randomizeTraits();
    onUpdateProperty(prop);
  }

  if (missing.length) throw Error
    ('Unable to stub user properties: ' + missing);

  return modified;
}

function handleResponse(res) {
  return res.json().then(json => {
    if (!res.ok || !json.status === 200) {
      return Promise.reject({
        status: json.status,
        statusText: json.message
      });
    }
    return json.data;
  }).catch(e => {
    return Promise.reject(e);
  });
}

// Create a new database record: /login only
UserSession.create = function(user, onSuccess, onError) {

  let { route, auth, cid, mode } = doConfig();
  let internalSuccess = (json) => {
    Object.assign(user, json);
    sessionStorage.setItem(UserSession.storageKey, JSON.stringify(user._id));
    //UserSession.sync(user);
    onSuccess && onSuccess(json);
  }
  if (!onError) onError = (e) => {
    console.error('UserSession.create: ', e);
    throw e;
  }

  if (user.clientId < 0) user.clientId = cid;

  console.log('[POST] ' + mode + '.create: ' + route);

  fetch(route, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .then(internalSuccess)
    .catch(onError);
}

/*
 * Loads users fields from database
 */
UserSession.lookup = function(user, onSuccess, onError) {

  if (!user || !user._id) throw Error('Invalid arg', user);

  const { route, auth, cid, mode } = doConfig();
  const internalSuccess = (json) => {
    Object.assign(user, json);
    onSuccess && onSuccess(json);
  }
  if (!onError) onError = (e) => {
    console.error('UserSession.lookup:', e);
    throw e;
  }

  if (user.clientId < 0) user.clientId = cid;

  const endpoint = route + user._id;
  console.log('[GET] ' + mode + '.lookup: ' + endpoint);

  fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
  })
    .then(handleResponse)
    .then(internalSuccess)
    .catch(onError);
}

UserSession.update = function(user, onSuccess, onError) {
  const { route, auth, cid, mode } = doConfig();
  const internalSuccess = (json) => {
    Object.assign(user, json);
    onSuccess && onSuccess(user);
  }
  if (!onError) onError = e => console.error(e);

  if (typeof user._id === 'undefined') throw Error('user._id required');

  const endpoint = route + user._id;

  console.log('[PUT] ' + mode + '.update: ' + endpoint);

  if (user.clientId < 0) user.clientId = cid;

  fetch(endpoint, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .then(internalSuccess)
    .catch(onError);
}

UserSession.similars = function(user, onSuccess, onError) {
  const { route, auth, cid, mode } = doConfig();
  const internalSuccess = (json) => {
    user.similars = json;
    onSuccess && onSuccess(user);
  }
  if (!onError) onError = e => console.error(e);

  if (typeof user._id === 'undefined') throw Error('user._id required');

  const endpoint = route + 'similars/' + user._id;

  console.log('[GET] ' + mode + '.similars: ' + endpoint);

  if (user.clientId < 0) user.clientId = cid;

  fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
  })
    .then(handleResponse)
    .then(internalSuccess)
    .catch(onError);
}

UserSession.postImage = function(user, image, onSuccess, onError) {

  let { route, auth, mode } = doConfig();
  if (!onSuccess) onSuccess = () => { };
  if (!onError) onError = (e) => console.error(e);


  //if (typeof image === 'string') image = toImageFile(image);

  let fdata = new FormData();
  fdata.append('profileImage', image);
  fdata.append('clientId', process.env.CLIENT_ID);
  fdata.append('videoId', 2);

  const endpoint = route + 'photo/' + user._id;

  console.log('[POST] ' + mode + '.postImage: ' + endpoint);

  fetch(endpoint, {
    method: "post",
    headers: { "Authorization": 'Basic ' + btoa(auth) },
    body: fdata // JSON.stringfy(fdata) ??
   })
    .then(handleResponse)
    .then(onSuccess)
    .catch(onError);
}


function doConfig() {

  // get auth from .env or heroku configs
  DotEnv.config();

  const env = process.env;
  const route = '/api/users/';
  const mode = env.NODE_ENV !== 'production' ? 'DEV' : 'PROD';

  const cid = env.REACT_APP_CLIENT_ID || -1;
  const host = env.REACT_APP_API_HOST || 'http://localhost:8083';
  const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;

  if (!auth || !auth.length) console.error("Auth required!");

  return { auth: auth, route: host + route, clientId: cid, mode: mode };
}

function arrayRemove(a, v) { return a.filter(i => i !== v) }

function rand() {
  if (arguments.length === 1 && Array.isArray(arguments[0])) {
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

export default UserSession;
