export default function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}
