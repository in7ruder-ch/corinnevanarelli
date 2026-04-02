// src/app/api/admin/slot-overrides/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabaseService";
import { validateAdminSession } from "@/lib/adminSession";

function json(payload, init = {}) {
    const res = NextResponse.json(payload, init);
    res.headers.set("Cache-Control", "no-store");
    return res;
}

// GET — lista overrides, filtrable por fecha
export async function GET(req) {
    try {
        const session = await validateAdminSession();
        if (!session) return json({ ok: false, error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date"); // YYYY-MM-DD, opcional

        const supabase = getSupabaseService();
        let query = supabase
            .from("slot_overrides")
            .select("id, service_id, date, time, type, created_at, services:service_id(title_de)")
            .order("date", { ascending: true })
            .order("time", { ascending: true });

        if (date) query = query.eq("date", date);

        const { data, error } = await query;
        if (error) throw error;

        const items = (data || []).map((r) => ({
            id: r.id,
            serviceId: r.service_id,
            serviceTitle: r.services?.title_de || null,
            date: r.date,
            time: r.time,
            type: r.type,
            createdAt: r.created_at,
        }));

        return json({ ok: true, items });
    } catch (e) {
        console.error("[/api/admin/slot-overrides GET]", e);
        return json({ ok: false, error: e?.message || "Internal error" }, { status: 500 });
    }
}

// POST — crea un override nuevo con validaciones
export async function POST(req) {
    try {
        const session = await validateAdminSession();
        if (!session) return json({ ok: false, error: "Unauthorized" }, { status: 401 });

        const { serviceId, date, time, type } = await req.json();

        if (!date || !time || !["OPEN", "BLOCKED"].includes(type)) {
            return json({ ok: false, error: "Missing or invalid fields" }, { status: 400 });
        }

        const supabase = getSupabaseService();

        // Construimos el timestamptz del slot para comparar con bookings

        const slotISO = new Date(`${date}T${time}:00`).toISOString();

        // Validación 1: ¿hay reserva activa en ese horario?
        const { data: conflictingBookings } = await supabase
            .from("bookings")
            .select("id, status, start_at, end_at")
            .or("status.eq.PAID,status.eq.PENDING,status.eq.CONFIRMED,and(status.eq.HOLD,hold_until.gt." + new Date().toISOString() + ")")
            .lte("start_at", slotISO)
            .gt("end_at", slotISO);

        const hasActiveBooking = (conflictingBookings || []).length > 0;

        if (type === "BLOCKED" && hasActiveBooking) {
            return json({
                ok: false,
                error: "Este horario tiene una reserva activa. No se puede bloquear.",
                code: "HAS_ACTIVE_BOOKING",
            }, { status: 409 });
        }

        // Validación 2 (warning): OPEN redundante si ya existe en reglas normales
        // Lo insertamos igual pero devolvemos un warning
        let warning = null;
        if (type === "OPEN") {
            const { data: existingSlots } = await supabase.rpc("get_available_slots", {
                p_date: date,
                p_service_id: serviceId || "a0000000-0000-0000-0000-000000000000", // dummy si no hay serviceId
            });
            const alreadyExists = (existingSlots || []).some((s) => {
                const d = new Date(s.start_at ?? s);
                return d.toISOString() === new Date(`${date}T${time}:00`).toISOString() ||
                    Math.abs(d.getTime() - new Date(slotISO).getTime()) < 60000;
            });
            if (alreadyExists) {
                warning = "Este slot ya existe en las reglas normales. Se creó igual pero es redundante.";
            }
        }

        // Si existe un override del tipo contrario para el mismo slot, lo eliminamos
        const oppositeType = type === "OPEN" ? "BLOCKED" : "OPEN";
        let deleteQuery = supabase
            .from("slot_overrides")
            .delete()
            .eq("date", date)
            .eq("time", time)
            .eq("type", oppositeType);

        if (serviceId) {
            deleteQuery = deleteQuery.eq("service_id", serviceId);
        } else {
            deleteQuery = deleteQuery.is("service_id", null);
        }

        await deleteQuery;

        // Insert
        const { data: inserted, error: insErr } = await supabase
            .from("slot_overrides")
            .insert({
                service_id: serviceId || null,
                date,
                time,
                type,
            })
            .select("id, service_id, date, time, type, created_at")
            .single();

        if (insErr) {
            if (String(insErr.code) === "23505") {
                return json({
                    ok: false,
                    error: "Ya existe un override para ese servicio, fecha y hora.",
                    code: "DUPLICATE",
                }, { status: 409 });
            }
            throw insErr;
        }

        return json({ ok: true, item: inserted, warning });
    } catch (e) {
        console.error("[/api/admin/slot-overrides POST]", e);
        return json({ ok: false, error: e?.message || "Internal error" }, { status: 500 });
    }
}