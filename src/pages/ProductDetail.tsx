import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";

import { books, formatPrice } from "@/data/books";
import { useCart } from "@/context/CartContext";
import BookCard from "@/components/BookCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <Link
          to="/products"
          className="mt-4 inline-block text-primary hover:underline"
        >
          ← Back to all books
        </Link>
      </div>
    );
  }

  const related = books.filter(
    (b) => b.category === book.category && b.id !== book.id,
  );

  const handleAdd = () => {
    addItem(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to books
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <img
          src={book.image}
          alt={book.title}
          className="w-full rounded-xl object-cover"
        />
        <div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {book.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">{book.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {book.inStock ? "In stock" : "Out of stock"}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {book.description}
          </p>
          <div className="mt-8 flex items-center gap-6">
            <span className="text-3xl font-bold">{formatPrice(book.price)}</span>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added
                </>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            More in {book.category}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
