
import app from './app.js';

const port = process.env.PORT || 4000;

const routes = {
    '/': '<h1>Home</h1>',
    '/books': '<h1>Books</h1>',
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}
);