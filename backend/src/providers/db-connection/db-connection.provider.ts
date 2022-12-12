import * as mongoose from "mongoose";
import MongoServerSelectionError from "../exceptions/general/server-selection.exception";

let connection: typeof mongoose;

const ConnectToTheDatabase = async (): Promise<typeof mongoose> => {

    if (connection) {
        return connection;
    }
    
    const {
      DATABASE_USER,
      DATABASE_PASSWORD,
      MONGO_HOST,
      MONGO_PORT,
      MONGO_INITDB_DATABASE,
    } = process.env;

    try {
      mongoose.set('strictQuery', true);
      connection = await mongoose.connect(
        `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_INITDB_DATABASE}?authSource=${MONGO_INITDB_DATABASE}`
      );

      return connection;
    } catch {
      throw new MongoServerSelectionError();
    }
}

export default ConnectToTheDatabase;