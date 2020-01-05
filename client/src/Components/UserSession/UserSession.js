import React from 'react';
import User from '../User/User';
import DotEnv from 'dotenv';
import FormData from 'form-data';

// We store the current User in React context for easy access
let UserSession = React.createContext({});

UserSession.useBrowserStorage = true;
UserSession.storageKey = 'spectre-user';
UserSession.profileDir = User.profileDir;
UserSession.imageDir = User.imageDir;
UserSession.Cons = "bcdfghjklmnprstvxz".split('');
UserSession.Vows = "aeiou".split('');

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
UserSession.ensure = async (user, props) => {

  // do we have an id, if not repair it
  if (props.includes('_id') && typeof user._id === 'undefined') {
    props = arrayRemove(props, '_id');

    // do we have an id in session
    const sid = sessionStorage.getItem(UserSession.storageKey);
    if (!sid) {
      console.warn('[STUB] No user._id, creating new user');
      UserSession.fillMissingProperties(user,
          ['login', 'name', 'gender',  'virtue', 'adIssue', 'traits']);
      await UserSession.create(user);
      console.warn('[STUB] Setting user._id: ' + user._id);
    }
    else {
      user._id = JSON.parse(sid);
      console.warn('[SESS] Reloaded user._id: ' + user._id + ' doing lookup');
      await UserSession.lookup(user);
    }
  }
  // should have user with id here, now check properties
  if (!user || !user._id) throw Error('INVALID STATE');

  if (props.includes('target') && !user.similars.length) {
    user = await UserSession.similars(user);
    console.warn('[STUB] Fetched similars:', user.toString());
  }

  let modified = UserSession.fillMissingProperties(user, props);
  if (modified) await UserSession.update(user);

  return user;
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
    if (typeof val === 'object') val = JSON.stringify(val).substring(0,60);
    console.warn('[STUB] Setting user.' + p + ': ' + val);
  };

  if (typeof props === 'undefined') return true;
  if (typeof user === 'undefined') throw Error('Null User');

  if (!Array.isArray(props)) props = [props];
  let missing = props.filter(p => typeof user[p] === 'undefined'
    || (Array.isArray(user[p]) && !user[p].length));

  if (!missing) return false; // all props are ok

  let modified = false; // check known props, 1-by-1

  let propStubber = {
    adIssue: () => rand(['remain', 'leave']),
    gender: () => rand(['male', 'female', 'other']),
    virtue: () => rand(['wealth', 'influence', 'truth', 'power']),
    traits: () => User._randomTraits(),
    name: () => (rand(UserSession.Cons) +
      rand(UserSession.Vows) + rand(UserSession.Cons)).ucf(),
    login: () => user.name + (+new Date()) + '@test.com',
    target: () => {
      if (!user.similars.length) throw Error('no similars');
      return rand(user.similars);
    }
  };

  Object.keys(propStubber).forEach(p => {
    if (missing.includes(p)) {
      user[p] = propStubber[p]();
      onUpdateProperty(p);
    }
  });
  //
  // prop = 'name';
  // if (missing.includes(prop)) {
  //   const cons = UserSession.Cons, vows = UserSession.Vows;
  //   user[prop] = (cons[Math.floor(Math.random() * cons.length)]
  //     + vows[Math.floor(Math.random() * vows.length)]
  //     + cons[Math.floor(Math.random() * cons.length)]).ucf();
  //   onUpdateProperty(prop);
  // }

  // prop = 'login';
  // if (missing.includes(prop)) {
  //   user[prop] = user.name + (+new Date()) + '@test.com';
  //   onUpdateProperty(prop);

  //
  // prop = 'gender';
  // if (missing.includes(prop)) {
  //   user[prop] = rand(['male', 'female', 'other']);
  //   onUpdateProperty(prop);
  // }

  // prop = 'traits';
  // if (missing.includes(prop)) {
  //   user._randomizeTraits();
  //   onUpdateProperty(prop);
  // }
  //
  // prop = 'adIssue';
  // if (missing.includes(prop)) {
  //   user[prop] = rand(['remain', 'leave']);
  //   onUpdateProperty(prop);
  // }
  //
  // prop = 'target';
  // if (missing.includes(prop)) {
  //   if (!user.similars.length) throw Error('no similars');
  //   user[prop] = rand(user.similars);
  //   if (typeof user.target !== 'object') throw Error
  //     ('user.target != object', typeof user.target, user.target);
  //   onUpdateProperty(prop);
  // }

  missing = checkTargetAdData(missing);

  if (missing.length) throw Error
    ('Unable to stub user properties: ' + missing);

  return modified;
}
//
// function handleResponse(res) {
//   return res.json().then(json => {
//     if (!res.ok || !json.status === 200) {
//       return Promise.reject({
//         status: json.status,
//         statusText: json.message
//       });
//     }
//     return json.data;
//   }).catch(e => {
//     return Promise.reject(e);
//   });
// }

// Create a new database record: /login only
UserSession.create = async (user) => {
  let { route, auth, cid, mode } = doConfig();
  if (user.clientId < 0) user.clientId = cid;
  try {
    console.log('[POST] ' + mode + '.create: ' + route);
    let response = await fetch(route, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
      body: toNetworkString(user)
    })
    assignJsonResp(user, await response.json());
    UserSession.useBrowserStorage && sessionStorage.setItem
      (UserSession.storageKey, JSON.stringify(user._id));
    // TODO: remove? stringify
    return user;
  }
  catch (e) {
    console.error('UserSession.create');
    throw e;
  }
}

/*
 * Loads users fields from database
 */
UserSession.lookup = async (user) => {
  if (!user || !user._id) throw Error('Invalid arg', user);
  const { route, auth, cid, mode } = doConfig();
  if (user.clientId < 0) user.clientId = cid;
  const endpoint = route + user._id;
  try {
    console.log('[GET] ' + mode + '.lookup: ' + endpoint);
    let response = await fetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
    })
    return assignJsonResp(user, await response.json());
  }
  catch (e) {
    console.error('UserSession.create');
    throw e;
  }
}

UserSession.update = async (user) => {
  if (!user || !user._id) throw Error('Invalid arg', user);
  const { route, auth, cid, mode } = doConfig();
  const endpoint = route + user._id;

  if (user.clientId < 0) user.clientId = cid;
  try {
    console.log('[PUT] ' + mode + '.update: ' + endpoint);
    let response = await fetch(endpoint, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
      body: toNetworkString(user)
    })
    return assignJsonResp(user, await response.json());
  }
  catch (e) {
    console.error('UserSession.create');
    throw e;
  }
}

function toNetworkString(user) {
  let safe = {};
  Object.keys(User.schema()).forEach(p => safe[p] = user[p]);
  return JSON.stringify(safe);
}

UserSession.similars = async (user) => {
  if (!user || !user._id.length) {
    throw Error('Invalid user\n' + user);
  }
  if (!user.traits || typeof user.traits.openness === 'undefined') {
    throw Error('No traits for user #' + user._id);
  }
  const { route, auth, cid, mode } = doConfig();
  const endpoint = route + 'similars/' + user._id;
  if (user.clientId < 0) user.clientId = cid;
  try {
    console.log('[GET] ' + mode + '.similars: ' + endpoint);
    let response = await fetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
    });
    const json = await response.json();
    if (json.status !== 200) throw Error(JSON.stringify(json));
    user.similars = json.data;
    return user;
  }
  catch (e) {
    console.error('UserSession.create');
    throw e;
  }
}

UserSession.postImage = async (user, image) => { // TODO: test

  let { route, auth, mode } = doConfig();
  //if (typeof image === 'string') image = toImageFile(image);
  let fdata = new FormData();
  fdata.append('profileImage', image);
  fdata.append('clientId', process.env.CLIENT_ID);
  fdata.append('videoId', 2);

  const endpoint = route + 'photo/' + user._id;
  try {
    console.log('[POST] ' + mode + '.postImage: ' + endpoint);
    let response = await fetch(endpoint, {
      method: "post",
      headers: { "Authorization": 'Basic ' + btoa(auth) },
      body: fdata // JSON.stringfy(fdata) ??
    })
    return response.json(); // what to do here?
  }
  catch (e) {
    console.error('UserSession.create');
    throw e;
  }
}

function assignJsonResp(user, json) {
  if (json.status !== 200) throw Error(JSON.stringify(json));
  Object.assign(user, json.data);
  return user;
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

export default UserSession;
