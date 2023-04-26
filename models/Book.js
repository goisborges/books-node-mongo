import mongoose from 'mongoose';

//how the schema is
const bookSchema = new mongoose.Schema({
    id: {type: String},
    name: {type: String, required: true},
    author: {type: String, required: true},
    pages: {type: Number, required: true},
}
)

//name of the database name - in this example is books
const books = mongoose.model('books',  bookSchema)

export default books;