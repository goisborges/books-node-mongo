import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//books-node is the name of the collection
mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@cluster0.ughnlpf.mongodb.net/books-node`);

let db = mongoose.connection;

export default db;