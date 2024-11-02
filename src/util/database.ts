import { MongoClient } from 'mongodb'
 // useNewUrlParser 옵션을 제거합니다.
 const url = process.env.DATABASE_KEY;

let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}
export { connectDB }