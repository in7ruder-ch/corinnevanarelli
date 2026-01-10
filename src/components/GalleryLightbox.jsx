"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function GalleryLightbox({ title, images = images.length }) {
    // images: [{ src: string, alt: string, placeholder?: string }]
    const validImages = useMemo(
        () => images.filter((img) => Boolean(img?.src)),
        [images]
    );

    const [open, setOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);

    const openAt = (idx) => {
        setActiveIdx(idx);
        setOpen(true);
    };

    const close = () => setOpen(false);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight")
                setActiveIdx((i) => (i + 1) % validImages.length);
            if (e.key === "ArrowLeft")
                setActiveIdx((i) => (i - 1 + validImages.length) % validImages.length);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, validImages.length]);

    return (
        <div>
            {title ? (
                <h3 className="mb-4 text-lg md:text-xl font-semibold text-neutral-900">
                    {title}
                </h3>
            ) : null}

            <div className="grid gap-4 md:grid-cols-3">
                {images.map((img, idx) => {
                    const { src, alt, placeholder } = img || {};
                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => src && openAt(validImages.findIndex((v) => v.src === src))}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                            aria-label={alt || "Open image"}
                            disabled={!src}
                        >
                            {src ? (
                                <>
                                    <Image
                                        src={src}
                                        alt={alt || ""}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </>
                            ) : (
                                <div className="h-full w-full rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center text-sm text-neutral-400">
                                    {placeholder || "Image coming soon"}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Modal */}
            {open && validImages[activeIdx] ? (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
                    role="dialog"
                    aria-modal="true"
                    onMouseDown={(e) => {
                        // click fuera para cerrar
                        if (e.target === e.currentTarget) close();
                    }}
                >
                    <div className="relative w-full max-w-5xl">
                        <button
                            type="button"
                            onClick={close}
                            className="absolute -top-12 right-0 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white"
                        >
                            Close
                        </button>

                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
                            <Image
                                src={validImages[activeIdx].src}
                                alt={validImages[activeIdx].alt || ""}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </div>

                        {/* navegación (opcional) */}
                        {validImages.length > 1 ? (
                            <div className="mt-3 flex items-center justify-between text-white">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveIdx((i) => (i - 1 + validImages.length) % validImages.length)
                                    }
                                    className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                >
                                    Prev
                                </button>
                                <p className="text-sm opacity-80">
                                    {activeIdx + 1} / {validImages.length}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setActiveIdx((i) => (i + 1) % validImages.length)}
                                    className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                >
                                    Next
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
