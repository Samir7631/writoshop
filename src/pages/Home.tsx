import { Link } from "react-router-dom";
import { ShoppingBag, QrCode, BookHeart } from "lucide-react";

import { books, categories } from "@/data/books";
import BookCard from "@/components/BookCard";

const features = [
  {
    icon: ShoppingBag,
    title: "Easy ordering",
    text: "Browse, add to cart and check out in a minute.",
  },
  {
    icon: QrCode,
    title: "UPI payment",
    text: "Scan a QR with GPay or any UPI app to pay.",
  },
  {
    icon: BookHeart,
    title: "Curated books",
    text: "Every title is read and chosen by our team.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              New titles every week
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Discover Books That Inspire Your Mind
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Explore ebooks, story books, colouring books and learning resources
              curated by Writoshop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Shop Books
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                Login
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Trusted by readers • UPI / GPay payments
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {books.map((book) => (
              <img
                key={book.id}
                src={book.image}
                alt={book.title}
                loading="lazy"
                className="h-40 w-full rounded-xl object-cover shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured books</h2>
            <p className="mt-1 text-muted-foreground">
              Hand-picked favourites from our shelf.
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-medium text-primary hover:underline"
          >
            See all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            Browse by category
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
