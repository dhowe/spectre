import UserModel from './user-model';
import mongoose from 'mongoose';
import { dbUrl, apiUser, profDir, clientDir, certs, prod } from './config';

const opts = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true };
const dbstr = prod ? dbUrl : dbUrl + '-dev';

(async () => {
  try {
    await mongoose.connect(dbstr, opts);
    mongoose.connection.on('error', console.error);
  } catch (e) {
    console.error('\n[DB] ' + e.name + '...');
    console.error('[DB] Unable to connect to ' + dbstr + '\n');
    throw e;
  }
  UserModel.aggregate( // actual field is lastPageVisit.time
    [
      { $match: { 'traits.openness': { $gte: 0 }, 'hasImage': true } },
      { $sort: { clientId: -1, createdAt: -1 } },
      {
        $group: {
          _id: "$clientId",
          id: { $last: "$_id" },
          createdAt: { $last: "$createdAt" },

          // additional fields
          name:  { $last: "$name" },
          login:  { $last: "$login" },
          updated:  { $last: "$lastPageVisit.time" },
          page:  { $last: "$lastPageVisit.page" },
        }
      },
      { $project: { _id: "$id", clientId: "$_id", createdAt: 1, hasImage:1, name:1, updated:1, page:1, login:1 } }
    ],
    (err, users) => {
      if (err) console.log('error', err);
      console.log('users', users);
    }
  );
})();

//(async function() {

//})();
