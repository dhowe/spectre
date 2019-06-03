import fs from 'fs';
import data from './generated-users.js';
//let data = fs.readFileSync('./auto_generated_users.json');
let defaults = JSON.parse(data);
console.log(defaults.length);
