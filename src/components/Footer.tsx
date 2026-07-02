export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Writoshop. All rights reserved.</p>
        <p>Curated books • UPI / GPay payments</p>
      </div>
    </footer>
  );
}
