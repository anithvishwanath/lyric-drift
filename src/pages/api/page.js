export const prerender = false;

export async function GET({ request }) {
  const targetUrl = new URL(request.url).searchParams.get("url");
  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "Missing url parameter" }), { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LyricDrift/1.0)" },
    });
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 502 });
  }
}
