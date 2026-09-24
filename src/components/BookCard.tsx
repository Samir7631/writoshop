import { Link } from "react-router-dom";

import { formatPrice, type Book } from "@/data/books";
import { useCart } from "@/context/CartContext";

export default function BookCard({ book }: { book: Book }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      <Link to={`/products/${book.id}`} className="block overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
            {book.category}
          </span>
          <span className="text-muted-foreground">
            {book.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>
        <Link
          to={`/products/${book.id}`}
          className="font-semibold leading-snug hover:underline"
        >
          {book.title}
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {book.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">{formatPrice(book.price)}</span>
          <div className="flex gap-2">
            <Link
              to={`/products/${book.id}`}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              View
            </Link>
            <button
              onClick={() => addItem(book)}
              className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
