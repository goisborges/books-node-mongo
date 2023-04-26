
import Express from 'express';
import fs from 'fs';
import dbConnect from './config/dbConnect.js';
import booksMongo from "./models/Book.js";
import dotenv from 'dotenv';
dotenv.config();


dbConnect.on('error', console.error.bind(console, 'connection error:'));
dbConnect.once('open', function () {
    console.log("Connected to MongoDB");
}
);

//create a server
const app = Express();

const booksFromJson = fs.readFileSync('books.json');
const booksJson = JSON.parse(booksFromJson);
console.log(booksJson);

app.use(Express.json())

//set a route / GET
app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.get('/books', (req, res) => {
    res.json(booksJson);
}
);


//set POST,  add a book
app.post('/books', (req, res, next) => {
    if (req.body.id == null || req.body.name == null || req.body.author == null) {
        res.send("Please enter all the details");
    }
    //if id exists, send a message
    else if (booksJson.some(book => book.id === req.body.id)) {
        res.send("Book ID already exists");
    }
    else {
        booksJson.push(req.body);
        

        //write the req.body to the file books.json

        fs.writeFileSync('books.json', JSON.stringify(booksJson));

        res.send("Book added on variable and external JSON file");
    }
}
);



//implement PUT, update a book
app.put('/books/:id', (req, res) => {
    let index = searchBookIndex(req.params.id);

    if (index !== -1) {
        booksJson[index].name = req.body.name;
        booksJson[index].author = req.body.author;

        fs.writeFileSync('books.json', JSON.stringify(booksJson));

        res.json(booksJson);
    }
    else {
        res.send("Book not found");

    }

}
);

function searchBookIndex(id) {
    console.log("Searching for book with id " + id + " in books.json")

    if (id) {
        console.log("Book found");
        return booksJson.findIndex(book => book.id == id);
    }
    else {
        return null;
    }

}

//GET a book
app.get('/books/:id', (req, res) => {
    let index = searchBookIndex(req.params.id);

    if (index !== -1) {
        res.json(booksJson[index]);
    }
    else {
        res.send("Book not found");

    }

}
);

//DELETE a book
app.delete('/books/:id', (req, res) => {
    let index = searchBookIndex(req.params.id);

    if (index !== -1) {
        booksJson.splice(index, 1);

        fs.writeFileSync('books.json', JSON.stringify(booksJson));

        res.json("Book successfully deleted");
    }
    else {
        res.send("Book not found");

    }

}
);

//methods for MongoDB
//get all books
app.get('/booksmongo', async (req, res) => {
    const books = await booksMongo.find({});
    await res.send(books);
}
);

//add a book
app.post('/booksmongo', async (req, res) => {
    const book = new booksMongo(req.body);
    await book.save();
    await res.send(book);
}
);





export default app;
