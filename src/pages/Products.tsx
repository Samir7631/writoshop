import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { books, categories } from "@/data/books";
import BookCard from "@/components/BookCard";
import { cn } from "@/lib/utils";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("category");

  const filtered = useMemo(
    () => (active ? books.filter((b) => b.category === active) : books),
    [active],
  );

  const setCategory = (category: string | null) => {
    if (category) setSearchParams({ category });
    else setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">All books</h1>
      <p className="mt-1 text-muted-foreground">
        Browse our full collection of curated titles.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory(null)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            !active
              ? "border-primary bg-primary text-primary-foreground"
              : "border-input bg-background hover:bg-accent",
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setCategory(cat.name)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === cat.name
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background hover:bg-accent",
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
