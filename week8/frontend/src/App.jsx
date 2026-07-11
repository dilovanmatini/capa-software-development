import { useState, useEffect } from "react";
import BookCard from "./BookCard";

function App() {
    const [books] = useState([
        { id: 1, title: "Clean Code", price: 25 },
        { id: 2, title: "Atomic Habits", price: 20 },
        { id: 3, title: "Refactoring", price: 30 },
    ]);

    const [loadCount, setLoadCount] = useState(0);

    useEffect(() => {
        console.log("Loading books...");
        setLoadCount(loadCount + 1);
    });

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Book Store</h1>

            <button
                onClick={showBooks}
                className="mb-6 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Show Books
            </button>

            {books.map((book) => (
                <BookCard book={book} />
            ))}
        </div>
    );
}

export default App;
