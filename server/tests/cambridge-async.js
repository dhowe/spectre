const axios = require('axios');
require('dotenv').config();
const env = process.env;

let likeIds = ["5845317146", "6460713406", "22404294985", "35312278675", "105930651606", "171605907303", "199592894970", "274598553922", "340368556015", "100270610030980"];

async function getAuthToken() {
  return axios({
    method: "post",
    url: "https://api.applymagicsauce.com/auth",
    data: {
      "customer_id": env.CUSTOMER_ID,
      "api_key": env.API_KEY
    }
  }).then(res => res.data.token);
}

async function fromLikeIds(token, ids) {
  //console.log('predictFromLikeIds', token, ids.length);
  return axios({
    method: "post",
    url: "https://api.applymagicsauce.com/like_ids",
    headers: { "X-Auth-Token": token },
    data: ids
  })
}

async function predictFromLikeIds(cb) {
  const token = 'v443deq0vjeiqt1bpto27o425g';
  //const token = await getAuthToken();
  const response = await fromLikeIds(token, likeIds);
  cb(response.data.predictions);
}

function printP(preds) {
  for (var i = 0; i < preds.length; i++) {
    console.log(preds[i].trait+': '+preds[i].value);
  }
}

predictFromLikeIds(printP);
