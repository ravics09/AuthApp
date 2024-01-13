import dotenv from 'dotenv';
import { ConnectOptions, connect } from "mongoose";

dotenv.config({ path: '.env-dev' });

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}
const options: ConnectOptions & ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const dbUri: string | undefined = process.env.DB_URI


const connectDB = async () => { // Replace with your actual MongoDB database URI
  if (!dbUri) {
    throw new Error('DB_URI is not defined in the environment configuration');
  }

  try {
    await connect(dbUri, options);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
