let request = require('sync-request');
const FormData = request.FormData;
const assert = require('chai').assert;
require('dotenv').config();
const env = process.env;

let likeIds = ["5845317146", "6460713406", "22404294985", "35312278675", "105930651606", "171605907303", "199592894970", "274598553922", "340368556015", "100270610030980"];
let token = getAuthToken();
let json = predictFromLikeIds(token, likeIds);
console.log("Prediction:", json);

// REPLY: {"timestamp":"2019-04-04T22:42:41.643+0000","status":403,"error":"Forbidden","message":"Access Denied","path":"/like_ids"}

////////////////////////////////////////////////////////////////////////////////

function getAuthToken() {

  let res = request('POST', 'https://api.applymagicsauce.com/auth', {
    json: {
      "customer_id": env.CUSTOMER_ID,
      "api_key": env.API_KEY
    }
  });
  return JSON.parse(res.getBody('utf8')).token;
}

function predictFromLikeIds(tok, ids) {

  console.log('predictFromLikeIds(' + tok + ')');

  let form = new FormData();
  form.append('json', ids);

  try {
    let res = request('POST', 'https://api.applymagicsauce.com/like_ids', {
      headers: {
        "X-Auth-Token": tok
      },
      json: ids
    });
    return JSON.parse(res.getBody('utf8'));
  } catch (e) {
    console.log('ERROR:', e.statusCode);
    return JSON.parse(e.body).message;
  }
}
