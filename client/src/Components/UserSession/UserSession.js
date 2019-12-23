import React from 'react';
import User from '../User/User';
import DotEnv from 'dotenv';
import FormData from 'form-data';

// We store the current User in React context for easy access
let UserSession = React.createContext(new User());

UserSession.defaultUsers = function(onSuccess, onError) {
  fetch('/default-users.json').then(res => res.json())
    .then(data => {
      if (!onSuccess) throw Error('Callback required');
      onSuccess(data);
    }).catch(e => {
      console.error('UserSession.defaultUsers failed', e);
      if (onError) onError(e);
    });
}

UserSession.storageKey = 'spectre-user';
UserSession.profileDir = User.profileDir
UserSession.imageDir = User.imageDir
UserSession.defaults = [
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

let doConfig = () => {

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

let handleResponse = (res) => {
  return res.json()
    .then((json) => {
      if (!res.ok) {
        const error = Object.assign({}, json, {
          status: res.status,
          statusText: res.statusText,
        });
        return Promise.reject(error);
      }
      return json;
    });
}

UserSession.get = function(ctx) {
  if (!ctx) {
    // && (idOptional || typeof ctx._id !== 'undefined')) return ctx;
    let json = sessionStorage.getItem(UserSession.storageKey);
    console.log('[WARN] Retrieving User from localstorage', json);
    ctx = JSON.parse(json);
  }
  return ctx;
}

UserSession.sync = function(ctx) {
  ctx && sessionStorage.setItem(UserSession.storageKey, JSON.stringify(ctx));
}

UserSession.clear = function() {
  sessionStorage.clear();
}

//////////////////////////////////////////////////////////////////////

UserSession.init = function(onSuccess, onError) {

  let { route, auth, mode } = doConfig();
  if (!onError) onError = (e) => console.error(e);
  if (!onSuccess) onSuccess = (json) => { } // no-op;

  console.log('[GET] ' + mode + '.init: ' + route);

  fetch(route, {
    method: "get",
    headers: { "Authorization": 'Basic ' + btoa(auth) },
  })
    .then(handleResponse.bind(this))
    .then(onSuccess.bind(this))
    .catch(onError.bind(this));
}

// Create a new database record: /login only
UserSession.create = function(user, onSuccess, onError) {

  let { route, auth, cid, mode } = doConfig();
  let internalSuccess = (json) => {
    Object.assign(user, json);
    UserSession.sync(user);
    onSuccess && onSuccess(json);
  }
  if (!onError) onError = (e) => {
    console.error('UserSession.create: '+e);
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
    .then(handleResponse.bind(this))
    .then(internalSuccess.bind(this))
    .catch(onError.bind(this));
}

UserSession.update = function(user, onSuccess, onError) {

  UserSession.sync(user);
  user = UserSession.get(user);

  let { route, auth, cid, mode } = doConfig();
  if (!onSuccess) onSuccess = json => Object.assign(user, json);
  if (!onError) onError = e => console.error(e);

  if (typeof user._id === 'undefined') throw Error('user._id required');

  console.log('[PUT] ' + mode + '.update: ' + route);

  if (user.clientId < 0) user.clientId = cid;

  fetch(route + user._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
    body: JSON.stringify(user)
  })
    .then(handleResponse.bind(this))
    .then(onSuccess.bind(this))
    .catch(onError.bind(this));
}

UserSession.postImage = function(user, image, onSuccess, onError) {

  let { route, auth, mode } = doConfig();
  if (!onSuccess) onSuccess = () => { };
  if (!onError) onError = (e) => console.error(e);

  console.log('[POST] ' + mode + '.postImage: ' + route);
  //if (typeof image === 'string') image = toImageFile(image);

  let fdata = new FormData();
  fdata.append('profileImage', image);
  fdata.append('clientId', process.env.CLIENT_ID);
  fdata.append('videoId', 2);

  fetch(route + 'photo/' + (user._id || 567), {
    method: "post",
    headers: { "Authorization": 'Basic ' + btoa(auth) },
    body: fdata
  })
    .then(handleResponse.bind(this))
    .then(onSuccess.bind(this))
    .catch(onError.bind(this));
}

export default UserSession;
