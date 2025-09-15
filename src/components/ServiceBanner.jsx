import Image from "next/image";

export default function ServiceBanner({
    title = "Ontologisches Coaching",
    imageSrc = "",
    imageAlt = "",
}) {
    return (
        <section
            className="relative w-full h-[23svh] md:h-[28svh] lg:h-[31svh] mt-32" // ⬅️ empuja 8rem
            aria-label="Service Banner"
        >
            {/* Imagen de fondo */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
            </div>

            {/* Contenido centrado */}
            <div className="h-full w-full grid place-items-center text-center px-4 sm:px-6 md:px-12 lg:px-16">
                <h1 className="whitespace-pre-line text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                    {title}
                </h1>
            </div>
        </section>
    );
}
