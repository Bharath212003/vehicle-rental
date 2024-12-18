import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDb server started: ${connect.connection.host}`)
  } catch (error) {
    console.error(`Error ${error.message}`)
  }
}
mongoose.set('strictQuery', true);

export default connectDb
