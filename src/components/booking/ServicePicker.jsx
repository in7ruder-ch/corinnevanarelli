"use client";
import { useEffect, useState } from "react";

export default function ServicePicker({ value, onChange }) {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(value || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;
        setServices(json.services || []);
        const initial = value || (json.services && json.services[0]?.id);
        setSelected(initial || null);
        if (initial) {
          const svc = (json.services || []).find(s => s.id === initial);
          onChange?.(svc);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [onChange, value]);

  function handleSelect(id) {
    setSelected(id);
    const svc = services.find(s => s.id === id);
    onChange?.(svc);
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <label className="text-sm font-medium">Service</label>
        <div className="text-sm text-neutral-500">Laden…</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Service</label>
      <div className="grid sm:grid-cols-3 gap-3">
        {services.map(s => {
          const active = selected === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s.id)}
              className={`text-left rounded-xl border p-4 transition
                ${active ? "border-black bg-black text-white" : "hover:bg-neutral-50"}`}
            >
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm opacity-80 mt-1">{s.durationMin} Min • CHF {s.price}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
