"use client";
import { useEffect, useRef, useState } from "react";

function injectPayPalSdk(clientId) {
  return new Promise((resolve, reject) => {
    // Evitar duplicados
    if (window.paypal) return resolve(window.paypal);

    const url = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&components=buttons&currency=CHF`;

    const s = document.createElement("script");
    s.src = url;
    s.async = true;
    s.onload = () => {
      if (window.paypal) return resolve(window.paypal);
      reject(new Error("PayPal SDK loaded but window.paypal missing"));
    };
    s.onerror = () => reject(new Error("Failed to load PayPal SDK script"));
    document.head.appendChild(s);
  });
}

export default function PayPalButton({ bookingId, onPaid }) {
  const containerRef = useRef(null);
  const [err, setErr] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let destroyed = false;

    (async () => {
      try {
        // ⚠️ El valor se inyecta en build. Debe existir en .env.local + reiniciar dev server.
        const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

        if (!clientId || clientId === "TU_CLIENT_ID_SANDBOX") {
          setErr(
            "Falta NEXT_PUBLIC_PAYPAL_CLIENT_ID o estás usando el placeholder. Verificá .env.local y reiniciá 'npm run dev'."
          );
          return;
        }

        const paypal = await injectPayPalSdk(clientId);
        if (destroyed) return;
        if (!containerRef.current) {
          setErr("No hay contenedor para renderizar el botón.");
          return;
        }

        setReady(true);

        paypal
          .Buttons({
            style: { layout: "vertical", shape: "rect", label: "paypal" },

            createOrder: async () => {
              const res = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ bookingId }),
              });
              const json = await res.json();
              if (!res.ok || !json.orderID) {
                throw new Error(
                  json?.error ? JSON.stringify(json.error) : "Create order failed"
                );
              }
              return json.orderID;
            },

            onApprove: async (data) => {
              const res = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ orderID: data.orderID }),
              });
              const json = await res.json();
              if (!res.ok || !json.ok) {
                throw new Error(
                  json?.error ? JSON.stringify(json.error) : "Capture failed"
                );
              }
              onPaid?.(json);
            },

            onError: (e) => {
              setErr(
                `PayPal SDK error${e?.message ? `: ${e.message}` : ""}`
              );
            },
          })
          .render(containerRef.current);
      } catch (e) {
        setErr(e?.message || String(e));
      }
    })();

    return () => {
      destroyed = true;
    };
  }, [bookingId, onPaid]);

  return (
    <div className="mt-4">
      {!ready && !err && (
        <p className="text-sm text-neutral-500">Lade PayPal…</p>
      )}
      {err && (
        <p className="text-sm text-red-600 mb-2">
          {err}
        </p>
      )}
      <div ref={containerRef} />
    </div>
  );
}
