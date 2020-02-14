import UserModel from './user-model';
import mongoose from 'mongoose';
import { dbUrl, prod } from './config';
import { ObjectID } from 'mongodb';

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
  let user = { _id: new ObjectID('111111111111111111111111') };
  UserModel.aggregate(
    [
      { $match: { 'traits.openness': { $gte: 0 }, "_id": { $ne: user._id }, hasImage: true } },
      { $sort: { clientId: -1, lastUpdate: 1 } },
      {
        $group: {
          _id: "$clientId", // group by client-id
          id: { $last: "$_id" },
          name: { $last: "$name" },
          login: { $last: "$login" },
          lastUpdate: { $last: "$lastUpdate" },
          lastPage: { $last: "$lastPage" },
          hasImage: { $last: "$hasImage" },
        }
      },
      { $project: { _id: "$id", clientId: "$_id", lastUpdate: 1, hasImage: 1, name: 1, lastPage: 1, login: 1 } }
    ],
    (err, users) => {
      if (err) console.log('error', err);
      console.log('users', users);
    }
  );
})();
