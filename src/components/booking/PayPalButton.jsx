"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - bookingId: string (requerido)
 * - onPaid: fn({ ok: true, orderId, captureId }) (opcional)
 */
export default function PayPalButton({ bookingId, onPaid }) {
  const containerRef = useRef(null);
  const renderedOnceRef = useRef(false); // evita doble render en Strict Mode
  const [sdkError, setSdkError] = useState(null);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "CHF";
  const intent = process.env.NEXT_PUBLIC_PAYPAL_INTENT || "capture";

  // Singleton: prometemos cargar el SDK una sola vez para toda la app
  async function ensurePaypalSdkLoaded() {
    if (!clientId) {
      throw new Error("Fehlende NEXT_PUBLIC_PAYPAL_CLIENT_ID");
    }

    // Ya cargado
    if (typeof window !== "undefined" && window.paypal?.Buttons) return;

    // ¿Hay un script existente? Reutilizar
    const qs = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      clientId
    )}&components=buttons&currency=${encodeURIComponent(
      currency
    )}&intent=${encodeURIComponent(intent)}&commit=true`;
    let script = document.querySelector(
      'script[src^="https://www.paypal.com/sdk/js"]'
    );

    // Reutiliza una promesa global para evitar cargas múltiples
    if (!window.__paypal_sdk_promise__) {
      window.__paypal_sdk_promise__ = new Promise((resolve, reject) => {
        if (!script) {
          script = document.createElement("script");
          script.src = qs;
          script.type = "text/javascript";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = (e) => reject(new Error("PayPal SDK load error"));
          document.body.appendChild(script);
        } else {
          // Si ya existe, esperamos un tick a que esté disponible window.paypal
          const check = () => {
            if (window.paypal?.Buttons) resolve();
            else setTimeout(check, 20);
          };
          check();
        }
      });
    }

    await window.__paypal_sdk_promise__;
    if (!window.paypal?.Buttons) {
      throw new Error("PayPal SDK not ready after load");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function mountButtons() {
      try {
        if (!bookingId || !containerRef.current) return;
        await ensurePaypalSdkLoaded();
        if (cancelled) return;

        // Evita doble render bajo Strict Mode / re-mounts
        if (renderedOnceRef.current) return;
        renderedOnceRef.current = true;

        const Buttons = window.paypal.Buttons({
          style: { layout: "vertical", shape: "rect", label: "paypal" },

          createOrder: async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ bookingId }),
            });
            if (!res.ok) {
              const txt = await res.text().catch(() => "");
              console.error("create-order failed:", txt);
              throw new Error("Create Order fehlgeschlagen");
            }
            const json = await res.json();
            if (!json?.id) {
              console.error("create-order invalid response:", json);
              throw new Error("Ungültige Antwort von create-order");
            }
            return json.id;
          },

          onApprove: async (data) => {
            try {
              const res = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  orderId: data.orderID,
                  bookingId,
                }),
              });
              if (!res.ok) {
                const txt = await res.text().catch(() => "");
                console.error("capture-order failed:", txt);
                throw new Error("Capture fehlgeschlagen");
              }
              const json = await res.json();
              onPaid?.({
                ok: !!json?.ok,
                orderId: data.orderID,
                captureId: json?.captureId,
              });
            } catch (e) {
              console.error("onApprove error:", e);
            }
          },

          onError: (err) => {
            console.error("PayPal Buttons onError:", err);
            setSdkError(
              "Ein Fehler ist mit PayPal aufgetreten. Bitte versuche es erneut."
            );
          },
        });

        // Render directo al contenedor (sin limpiar/agitar el DOM antes)
        await Buttons.render(containerRef.current);
      } catch (e) {
        console.error("PayPal init/render error:", e);
        setSdkError(
          e?.message || "PayPal konnte nicht initialisiert werden."
        );
      }
    }

    mountButtons();

    // Importante: NO destruimos el SDK global al desmontar
    return () => {
      cancelled = true;
      // No llamamos a destroy global (evita "zoid destroyed all components")
      // Tampoco removemos el script; queda cacheado para próximos montajes
    };
  }, [bookingId]);

  if (!bookingId) {
    return (
      <div className="text-sm text-neutral-600">Fehlende Buchung-ID.</div>
    );
  }

  return (
    <div className="mt-3">
      {sdkError && (
        <div className="mb-2 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
          {sdkError}
        </div>
      )}
      <div ref={containerRef} />
    </div>
  );
}
