import { supabaseServer } from "@/lib/supabase";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("services")
      .select("id, title_de, duration_min, price_chf, active")
      .eq("active", true)
      .order("id", { ascending: true });

    if (error) throw error;

    // Adaptamos el shape para el front actual
    const services = (data || []).map(s => ({
      id: s.id,
      title: s.title_de || s.id,
      durationMin: s.duration_min,
      price: Number(s.price_chf)
    }));

    return Response.json({ services });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ services: [] }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }
}
