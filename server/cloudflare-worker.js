// Chroniken: Gemini proxy for GitHub Pages (Cloudflare Workers Free).
// Environment secrets in Cloudflare, NEVER in GitHub:
// GEMINI_API_KEY, CHRONIKEN_ACCESS_TOKEN
const ALLOWED_ORIGIN = "https://andyneuling-rgb.github.io";
const MODEL = "gemini-2.5-flash";

function cors() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Chroniken-Token",
    "Access-Control-Max-Age": "3600",
    "Vary": "Origin",
    "Cache-Control": "no-store"
  };
}
function reply(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors(), "Content-Type": "application/json; charset=utf-8" }
  });
}
export default {
  async fetch(request, env) {
    try {
      const origin = request.headers.get("Origin");
      if (origin !== ALLOWED_ORIGIN) return new Response("Origin not permitted", { status: 403 });
      const pathname = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors() });
      if (!env.GEMINI_API_KEY || !env.CHRONIKEN_ACCESS_TOKEN) {
        return reply({ configured: false, error: "Geheime Schlüssel fehlen in Cloudflare Workers." }, 503);
      }
      const token = request.headers.get("X-Chroniken-Token") || "";
      if (token.length < 20 || token !== env.CHRONIKEN_ACCESS_TOKEN) {
        return reply({ configured: false, error: "Zugangscode ungültig." }, 401);
      }
      if (pathname === "/status" && request.method === "GET") {
        return reply({ configured: true, model: MODEL });
      }
      if (pathname !== "/play" || request.method !== "POST") return reply({ error: "Endpunkt nicht gefunden." }, 404);
      if (Number(request.headers.get("Content-Length") || 0) > 160000) {
        return reply({ error: "Erzählkontext zu groß." }, 413);
      }
      const payload = await request.json();
      const prompt = payload?.prompt;
      if (typeof prompt !== "string" || prompt.length < 50 || prompt.length > 120000) {
        return reply({ error: "Ungültiger oder zu langer Erzählkontext." }, 400);
      }
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.75,
              maxOutputTokens: 4096
            }
          })
        }
      );
      if (!res.ok) {
        if (res.status === 429) return reply({ error: "Kostenloses Gemini-Limit erreicht. Bitte später erneut versuchen." }, 429);
        if (res.status === 403 || res.status === 401) return reply({ error: "Gemini-Zugriff verweigert. API-Schlüssel im Worker prüfen." }, 502);
        return reply({ error: "Gemini-Anfrage fehlgeschlagen (" + res.status + ")." }, 502);
      }
      const data = await res.json();
      const text = (data.candidates?.[0]?.content?.parts || []).map(part => part.text || "").join("").trim();
      if (!text) return reply({ error: "Gemini hat keinen Erzähltext geliefert." }, 502);
      let story;
      try {
        story = JSON.parse(text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));
      } catch {
        return reply({ error: "Gemini lieferte keine gültige JSON-Erzählung. Keine Änderung gespeichert." }, 502);
      }
      if (
        typeof story.narration !== "string" ||
        story.narration.length < 60 ||
        story.narration.length > 15000 ||
        !Array.isArray(story.options) ||
        story.options.length < 2 ||
        story.options.length > 4 ||
        story.options.some(x => typeof x !== "string" || !x.trim() || x.length > 450)
      ) return reply({ error: "Die Modellantwort entspricht nicht dem Erzählformat. Kein Spielzug gespeichert." }, 502);
      return reply({
        narration: story.narration,
        options: story.options,
        proposed_events: Array.isArray(story.proposed_events) ? story.proposed_events.slice(0, 12) : [],
        model: MODEL
      });
    } catch (e) {
      return reply({ error: "Der KI-Dienst ist momentan nicht erreichbar." }, 502);
    }
  }
};
