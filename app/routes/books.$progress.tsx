import { useParams, Link } from "@remix-run/react";

const aFewSampleBooks = [
  {
    title: "The Lord of the Rings",
    author_name: "J.R.R. Tolkien",
  },
  {
    title: "Harry Potter",
    author_name: "J.K. Rowling",
  },
  {
    title: "Red Rising",
    author_name: "Pierce Brown",
  },
];

export default function Books() {
  const { progress } = useParams();
  return (
    <div className="h-screen bg-red-200">
      <Link to="/">
        <h1>BookTracker</h1>
      </Link>
      <div className="card">
        <h1>All books {progress}</h1>
        {aFewSampleBooks.map((book) => (
          <div className="card" key={book.title}>
            <h3>{book.title}</h3>
            <p>{book.author_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
