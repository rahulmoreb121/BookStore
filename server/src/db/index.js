import mongoose, { mongo } from 'mongoose'
import { Db_Name } from '../constant.js'

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${Db_Name}`
    )
    console.log(
      `\n mongo db connected Host${connectionInstance.connection.host}`
    )
  } catch (error) {
    console.log('Mongo DB Connection Error', error)
    process.exit(1)
  }
}

export default connectDB;
