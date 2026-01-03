'use client';

import { useState } from "react";
import ServicePicker from "./booking/ServicePicker";
import DateTimePicker from "./booking/DateTimePicker";
import Summary from "./booking/Summary";

export default function BookClient({ initialSelectedId }) {
  const [service, setService] = useState(null);
  const [datetime, setDatetime] = useState({ date: null, timeISO: null });

  return (
    <div
      className="mt-8 grid lg:grid-cols-[1fr,360px] gap-8"
      style={{ color: "var(--text)" }}
    >
      <div className="space-y-8">
        {/* Preselección por query param ?serviceId=... */}
        <ServicePicker initialSelectedId={initialSelectedId} onChange={setService} />

        {/* El picker emite { date, timeISO } */}
        <DateTimePicker onChange={setDatetime} service={service} />
      </div>

      <aside>
        <Summary service={service} datetime={datetime} />
      </aside>
    </div>
  );
}
