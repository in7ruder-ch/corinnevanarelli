import { supabaseServer } from "@/lib/supabase";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id, status, start_at, end_at, customer_name, customer_email,
        paypal_order_id, paypal_capture_id, service_id,
        services ( id, title_de, duration_min, price_chf )
      `)
      .order("start_at", { ascending: true });

    if (error) throw error;

    const rows = (data || []).map((b) => ({
      id: b.id,
      status: b.status,
      start_at: b.start_at,
      end_at: b.end_at,
      name: b.customer_name,
      email: b.customer_email,
      paypal_order_id: b.paypal_order_id,
      paypal_capture_id: b.paypal_capture_id,
      service_id: b.service_id,
      service_title: b.services?.title_de || b.service_id,
      price: Number(b.services?.price_chf || 0),
      durationMin: b.services?.duration_min || null
    }));

    return Response.json({ bookings: rows });
  } catch (e) {
    console.error(e);
    return Response.json({ bookings: [] }, { status: 200 });
  }
}
