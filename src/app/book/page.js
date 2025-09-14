"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServicePicker from "../../components/booking/ServicePicker";
import DateTimePicker from "../../components/booking/DateTimePicker";
import Summary from "../../components/booking/Summary";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BookPage() {
  const sp = useSearchParams();
  const initialSelectedId = sp.get("serviceId");

  const [service, setService] = useState(null);
  const [datetime, setDatetime] = useState({ date: null, timeISO: null });

  // ✅ condición mínima para mostrar el CTA
  const canShowCTA = Boolean(service && datetime?.date && datetime?.timeISO);

  function handleReserve() {
    console.log("RESERVAR →", { service, datetime });
    // acá luego conectamos con tu API/checkout
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-semibold">Booking</h1>
        <p className="mt-3 text-neutral-700">
          Wähle deinen Service sowie Datum und Uhrzeit.
        </p>

        <div className="mt-8 grid lg:grid-cols-[1fr,360px] gap-8">
          <div className="space-y-8">
            <ServicePicker
              initialSelectedId={initialSelectedId}
              onChange={setService}
            />
            <DateTimePicker onChange={setDatetime} service={service} />
          </div>

          <aside>
            <Summary service={service} datetime={datetime} />
            {/* ⬇️ CTA visible solo cuando hay service + datetime */}
            {canShowCTA && (
              <button
                onClick={handleReserve}
                className="mt-4 w-full rounded-lg px-4 py-3 font-semibold border"
              >
                Reservar
              </button>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
