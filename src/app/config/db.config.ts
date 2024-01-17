import dotenv from 'dotenv';
import { ConnectOptions, connect } from "mongoose";
 
dotenv.config({ path: '.env-dev' });

const connectDB = async () => { 
  const dbUri: string | undefined = process.env.DB_URI || 'mongodb://admin:password@my-mongodb:27017/authapp';
  const options : ConnectOptions = {
    authSource: "admin",
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  }

  if (!dbUri) {
    throw new Error('DB_URI is not defined in the environment configuration');
  }

  try {
    await connect(dbUri, options);
    console.log('Connected with MongoDB Server');
  } catch (error) {
    throw Error(`Error while connecting with MongoDB Server: ${error}`);
  }
};

export default connectDB;
