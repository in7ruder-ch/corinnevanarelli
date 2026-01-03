// src/components/Section.jsx
export default function Section({
  id,
  className = "",
  containerClass,
  children,
  style,            // ⬅️ permite override puntual (hero, testimonials, etc.)
}) {
  const defaultContainer = "mx-auto max-w-5xl px-4 sm:px-6";

  return (
    <section
      id={id}
      className={className}
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        ...style,
      }}
    >
      <div className={containerClass ?? defaultContainer}>
        {children}
      </div>
    </section>
  );
}
