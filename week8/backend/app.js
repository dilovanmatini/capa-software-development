const express = require("express");

const app = express();
const PORT = 3000;

// In-memory "database" of books
const books = [
    { id: 1, title: "Clean Code", price: 25 },
    { id: 2, title: "Atomic Habits", price: 20 },
    { id: 3, title: "Refactoring", price: 30 },
];

// Home route
app.get("/", (req, res) => {
    res.send(message);
});

// Return the list of books
app.get("/book", (req, res) => {
    res.status(404).json(books);
});

// Add a new book
app.post("/books", (req, res) => {
    console.log("Request body:", req.body);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
