import dotenv from 'dotenv';

dotenv.config();

const Mongo_Credentials = {
    Mongo_URI: `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@clustersavefiledata.yqgpot6.mongodb.net/`,
    DB_Name: 'files',
    Collection_Name: 'excels'
};

export { Mongo_Credentials }