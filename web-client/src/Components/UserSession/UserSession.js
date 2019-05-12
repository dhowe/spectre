import React from 'react';
import User from '../User/user';

let user = new User({name:'TestUser'});

const UserSession = React.createContext(user);

export default UserSession;
