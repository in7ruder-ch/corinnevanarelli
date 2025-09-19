export default function CenteredSection({
  id,
  title,
  body,                 // string o JSX con varios <p>
  padTop = true,
  padBottom = true,
}) {
  const padY = [
    padTop ? 'pt-16 md:pt-24' : 'pt-0',
    padBottom ? 'pb-16 md:pb-24' : 'pb-0',
  ].join(' ');

  return (
    <section id={id} className={`bg-white ${padY}`}>
      {/* mismo ancho que el resto de secciones */}
      <div className="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]">
        {/* contenedor estrecho centrado para el contenido editorial */}
        <div className="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]">
          <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] text-center leading-tight font-normal text-neutral-900 [text-wrap:balance] break-words">
            {title}
          </h2>

          <div className="mt-8 text-[15px] md:text-base leading-relaxed space-y-5 text-neutral-800">
            {typeof body === 'string' ? <p>{body}</p> : body}
          </div>
        </div>
      </div>
    </section>
  );
}