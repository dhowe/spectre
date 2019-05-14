import React from 'react';
import User from '../User/user';
import DotEnv from 'dotenv';

let UserSession = React.createContext(new User());

let doConfig = () => {

  // get auth from .env or heroku configs
  DotEnv.config();
  const env = process.env;
  const route = '/api/users/';
  const host = env.REACT_APP_API_HOST || 'http://localhost:8083';

  const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;
  if (!auth || !auth.length) console.error("Auth required!");

  return { auth: auth, route: host + route };
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

UserSession.createUser = function (currentUser, onSuccess, onError) {

  let { route, auth } = doConfig();

  // Do POST to API: '/api/users';
  console.log('POST: ' + route);
  fetch(route, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(currentUser)
    })
    .then(handleResponse.bind(this))
    .then(onSuccess.bind(this))
    .catch(onError.bind(this));
}

export default UserSession;
