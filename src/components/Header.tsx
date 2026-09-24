import { Link, NavLink } from "react-router-dom";
import { BookOpen, ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Books", end: false },
  { to: "/about", label: "About", end: false },
  { to: "/contact", label: "Contact", end: false },
];

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">Writoshop</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/cart"
            className="relative ml-1 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="ml-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
