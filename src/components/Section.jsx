// src/components/Section.jsx
export default function Section({
  id,
  className = "",
  containerClass,   // ⬅️ NUEVO
  children,
}) {
  
  const defaultContainer = "mx-auto max-w-5xl px-4 sm:px-6"; 

  return (
    <section id={id} className={className}>
      <div className={containerClass ?? defaultContainer}>
        {children}
      </div>
    </section>
  );
}
