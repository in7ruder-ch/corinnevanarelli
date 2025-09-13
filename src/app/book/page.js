"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServicePicker from "../../components/booking/ServicePicker";
import DateTimePicker from "../../components/booking/DateTimePicker";
import Summary from "../../components/booking/Summary";
import { useState } from "react";

export default function BookPage() {
  const [service, setService] = useState(null);
  const [datetime, setDatetime] = useState({ date: null, timeISO: null });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-semibold">Booking</h1>
        <p className="mt-3 text-neutral-700">Wähle deinen Service sowie Datum und Uhrzeit.</p>

        <div className="mt-8 grid lg:grid-cols-[1fr,360px] gap-8">
          <div className="space-y-8">
            <ServicePicker onChange={setService} />
            {/* 👇 pasamos el servicio seleccionado */}
            <DateTimePicker onChange={setDatetime} service={service} />
          </div>

          <aside>
            <Summary service={service} datetime={datetime} />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
