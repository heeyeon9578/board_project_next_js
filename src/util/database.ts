import { MongoClient } from 'mongodb'
 // useNewUrlParser 옵션을 제거합니다.
 const url = 'mongodb+srv://admin:gmldus9906^^@cluster0.pvj4t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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