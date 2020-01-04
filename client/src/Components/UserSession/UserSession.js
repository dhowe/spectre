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
UserSession.browserStorage = true;
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

// TODO: Should all be rewritten with async/await *****************************

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
      console.log('[STUB] No user._id, creating new user');
      UserSession.fillMissingProperties(user, ['login', 'name', 'gender']);
      await UserSession.create(user);
      // if (props.includes('target') && !u.similars.length) { // need similars
      //   user = await UserSession.similars(user);
      //   console.log('[STUB] Inserted new user/similars:', user.toString());
      // }
      // else { // no similars needed
      //   console.log('[STUB] Inserted new user:', user.toString());
      // }
    }
    else {
      user._id = JSON.parse(sid);
      console.warn('[SESS] Reloaded user._id: ' + user._id + ' doing lookup');
      await UserSession.lookup(user);
    }
  }
  // should have user with id here, now check properties
  if (!user || !user._id) throw Error('INVALID STATE');
  let modified = UserSession.fillMissingProperties(user, props);
  if (modified) await UserSession.update(user);

  return user;
}

UserSession.ensureOLD = function(user, props, onSuccess, onError) {

  onSuccess = onSuccess || (() => { });

  onError = onError || (e => {
    console.error('[ERROR] UserSession.ensure: ', e);
    if (process.env.NODE_ENV !== 'production') throw e;
  });

  const saveUser = (dirty, success, fail) => {
    success = success || onSuccess;
    fail = fail || onError;
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
    if (!sid) {
      console.log('[STUB] No user._id, creating new user');
      UserSession.fillMissingProperties(user, ['login', 'name', 'gender']);
      UserSession.create(user, (u) => {
        if (props.includes('target') && !u.similars.length) {
          UserSession.similars(user, user => {
            console.log('[STUB] Inserted new user/similars:', user.toString());
            UserSession.ensure(user, props, onSuccess, onError);
          }, onError);
          return;
        }
        console.log('[STUB] Inserted new user:', user.toString());
        UserSession.ensure(user, props, onSuccess, onError);
      }, e => console.error(e));
      return;
    }

    user._id = JSON.parse(sid);
    console.warn('[SESS] Reloaded user._id: ' + user._id + ' doing lookup');
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
    if (typeof user[p] === 'undefined') {
      throw Error('Could not stub user.' + p, user);
    }
    let val = user[p];
    if (Array.isArray(val)) val = '[' + val.length + ']';
    if (typeof val !== 'string') {
      val = JSON.stringify(val).substring(0, 75) + '...';
    }
    console.warn('[STUB] Setting user.' + p + ': ' + val);
  };

  if (typeof props === 'undefined') return true;
  if (typeof user === 'undefined') throw Error('Null User');

  if (!Array.isArray(props)) props = [props];
  let missing = props.filter(p => typeof user[p] === 'undefined'
    || (Array.isArray(user[p]) && !user[p].length));
  if (!missing) return false; // all props are ok
  let prop, modified = false;

  prop = 'name';
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

  prop = 'adIssue';
  if (missing.includes(prop)) {
    user[prop] = rand(['remain', 'leave']);
    onUpdateProperty(prop);
  }

  // prop = 'influences';
  // if (missing.includes(prop)) {
  //   user[prop] = user.targetAdInfluences();
  //   //console.log('influences: '+user[prop] );
  //   onUpdateProperty(prop);
  // }

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
      body: JSON.stringify(user)
    })
    assignJsonResp(user, await response.json());
    UserSession.browserStorage && sessionStorage.setItem
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
      body: JSON.stringify(user)
    })
    return assignJsonResp(user, await response.json());
  }
  catch (e) {
    console.error('UserSession.create');
    throw e;
  }
}

UserSession.similars = async (user) => {
  if (!user || !user._id) throw Error('Invalid arg', user);
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
    a.filter(i => v.includes(i)) : a.filter(i => i !== v)
}

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
