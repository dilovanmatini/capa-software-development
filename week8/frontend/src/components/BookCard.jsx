export default function BookCard({ book }) {
    return (
        <div className="border border-gray-300 rounded p-4 mb-3">
            <h2 className="font-bold">{book.name}</h2>
            <p>${book.price}</p>
        </div>
    );
}
