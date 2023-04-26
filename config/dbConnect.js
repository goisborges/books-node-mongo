import mongoose from 'mongoose';

//books-node is the name of the collection
mongoose.connect('mongodb+srv://goisborges:MongoM%40rcos81@cluster0.ughnlpf.mongodb.net/books-node');

let db = mongoose.connection;

export default db;