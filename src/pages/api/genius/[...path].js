export const prerender = false;

export async function GET({ params, request }) {
  const token = process.meta.env.GENIUS_API_KEY;
  if (!token) {
    return new Response(JSON.stringify({ error: "GENIUS_API_KEY env var not set" }), { status: 500 });
  }

  const geniusPath = params.path ? "/" + params.path : "";
  const searchParams = new URL(request.url).searchParams;

  const fwd = new URLSearchParams();
  for (const [k, v] of searchParams.entries()) {
    if (k !== "access_token") fwd.set(k, v);
  }

  const targetUrl = `https://api.genius.com${geniusPath}${fwd.size ? "?" + fwd.toString() : ""}`;

  try {
    const res = await fetch(targetUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "LyricDrift/1.0",
      },
    });
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 502 });
  }
}
