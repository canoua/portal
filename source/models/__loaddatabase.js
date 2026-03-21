import { connect, Schema, model } from "mongoose";

const dbURI = process.env.DBURI || 'mongodb://127.0.0.1:27017/';
const dbName = process.env.DBNAME || 'works';

// const scWork = new Schema({
//   title: String,
//   desc
// })

const scUser = new Schema({
  username: {
    type: String,
    index: true
  },
  password: Buffer,
  salt: Buffer
}, {
  versionKey: false
});

let User;

export async function connectToDB() {
  await connect(dbURI, { dbName: dbName });
  User = model('User', scUser);
}

export { User };