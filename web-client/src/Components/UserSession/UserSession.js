import React from 'react';
import User from '../User/user';
import DotEnv from 'dotenv';

let UserSession = React.createContext(new User());

UserSession.createUser = function(currentUser, onSuccess, onError) {

  // get auth from .env or heroku configs
  DotEnv.config();
  const env = process.env;
  const route = '/api/users/';
  const host = env.REACT_APP_API_HOST || 'http://localhost:8083';

  const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;
  if (!auth || !auth.length) console.error("Auth required!");
  const apiUrl = host + route;

  function handleResponse(response) {
    return response.json()
      .then((json) => {
        if (!response.ok) {
          const error = Object.assign({}, json, {
            status: response.status,
            statusText: response.statusText,
          });
          return Promise.reject(error);
        }
        return json;
      });
  }

  // Do POST to API: '/api/users';
  console.log('POST: '+apiUrl);
  fetch(apiUrl, {
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
