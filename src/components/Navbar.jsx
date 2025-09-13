"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Corinne Vanarelli
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#angebote" className="hover:opacity-80">Angebote</Link>
          <Link href="#stimmen" className="hover:opacity-80">Stimmen</Link>
          <Link href="#kontakt" className="hover:opacity-80">Kontakt</Link>
          <Link href="/book" className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90">
            Jetzt buchen
          </Link>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded border"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3">
            <Link href="#angebote" onClick={() => setOpen(false)}>Angebote</Link>
            <Link href="#stimmen" onClick={() => setOpen(false)}>Stimmen</Link>
            <Link href="#kontakt" onClick={() => setOpen(false)}>Kontakt</Link>
            <Link href="/book" className="px-4 py-2 rounded-lg bg-black text-white w-fit" onClick={() => setOpen(false)}>
              Jetzt buchen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
