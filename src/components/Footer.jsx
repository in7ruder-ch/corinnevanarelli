export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Corinne Vanarelli. Alle Rechte vorbehalten.</p>
        <nav className="flex items-center gap-4">
          <a href="#" className="hover:opacity-80">Impressum</a>
          <a href="#" className="hover:opacity-80">Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}
