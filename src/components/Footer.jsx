export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-600 flex flex-col md:flex-row items-center justify-center gap-4">
        <p>© {new Date().getFullYear()} Corinne Vanarelli. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
