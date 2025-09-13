export default function ServiceCard({ title, duration, price, bullets = [], ctaHref = "/book" }) {
  return (
    <div className="rounded-2xl border p-6 flex flex-col">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{duration} • {price}</p>
      <ul className="mt-4 space-y-2 list-disc list-inside text-neutral-700">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <a href={ctaHref} className="mt-6 inline-block px-4 py-2 rounded-lg bg-black text-white text-center hover:opacity-90">
        Jetzt buchen
      </a>
    </div>
  );
}
