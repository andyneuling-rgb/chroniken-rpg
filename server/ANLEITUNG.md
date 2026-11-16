# Chroniken: automatischer KI-Spielleiter ohne Firebase

Die Datei `server/cloudflare-worker.js` ist der vorbereitete Vermittlungsserver zwischen der öffentlichen Chroniken-Website und Google Gemini.

Die eigentliche Web-App läuft unter:
https://andyneuling-rgb.github.io/chroniken-rpg/

## Was du einmalig einrichten musst

### 1. Gemini API Key holen
- Öffne https://aistudio.google.com/api-keys
- Erstelle bzw. wähle einen API-Schlüssel für ein Projekt mit verfügbarer **kostenloser Gemini-API-Stufe**.
- **Behalte ihn für dich.** Nicht in ChatGPT, nicht auf GitHub und nicht in die Chroniken-Web-App einfügen.
- Die API ist kontingentiert; kostenlose Nutzung ist **nicht unbegrenzt**.

### 2. Cloudflare Worker anlegen
- Öffne https://dash.cloudflare.com/ und lege ein kostenloses Cloudflare-Konto an, falls noch keines existiert.
- Gehe zu **Workers & Pages** und erstelle einen Worker (z. B. `chroniken-ki`).
- Öffne **Edit code** / **Edit** im Cloudflare-Editor.
- Kopiere den vollständigen Inhalt von `server/cloudflare-worker.js` aus diesem GitHub-Repository hinein und wähle **Deploy**.
- Kopiere danach die Worker-Adresse, etwa `https://chroniken-ki.DEIN-NAME.workers.dev`.

### 3. Zwei geheime Einstellungen in Cloudflare hinterlegen
Öffne beim Worker **Settings → Variables and Secrets → Add**. Beide Einträge erhalten den Typ **Secret**.

| Name | Wert |
| --- | --- |
| `GEMINI_API_KEY` | Dein persönlicher API-Key aus Google AI Studio |
| `CHRONIKEN_ACCESS_TOKEN` | Ein selbst gewählter **langer, zufälliger Zugangscode** mit mindestens 20 Zeichen (am besten 32+) |

Speichere/Deploy die beiden Secrets. Den `CHRONIKEN_ACCESS_TOKEN` musst du für den nächsten Schritt bereithalten; den Gemini-Key danach nicht mehr eingeben.

### 4. Chroniken auf dem iPhone verbinden
- Öffne https://andyneuling-rgb.github.io/chroniken-rpg/
- Wähle Johanna Reborn, dann die Registerkarte **Sichern**.
- Unter **KI-Spielleiter direkt in der App** gibst du nur diese Daten ein:
  - die Worker-Adresse `https://…workers.dev`
  - **deinen langen CHRONIKEN_ACCESS_TOKEN** (nicht den Gemini-Key).
- Tippe auf **KI-Verbindung speichern und prüfen**.
- Sobald **KI-Server bereit** erscheint, öffne **Spielen**, wähle eine Handlung und prüfe die erste echte Erzählung. Erst nach einer erfolgreichen ersten Antwort gilt die Verbindung als vollständig getestet.

Der Code und dein bisheriger Spielstand werden hierbei nicht zurückgesetzt.

## Sicherheitsregeln
- Niemals den Gemini-Key in die öffentliche `index.html` schreiben.
- Schicke Geheimnisse nicht an ChatGPT.
- Der Worker lässt nur Anfragen von `https://andyneuling-rgb.github.io` aus zu und verlangt zusätzlich den Zugangscode. Der Worker selbst ist öffentlich erreichbar, die KI-Funktion benötigt den privaten Token.
- Die Worker-Adresse und der Zugangscode liegen im `localStorage` deines Safari-Browsers. Nutze ein privates Gerät und teile den Code nicht.
- Spielzüge werden **nur lokal im Browser** als JSON gespeichert. Regelmäßig ein Backup exportieren.
- Die KI kann strukturierte Änderungsvorschläge zu Besitz und Geld zurückgeben; derzeit werden diese **nicht automatisch gebucht**. Dadurch werden keine erfundenen Geldbewegungen vorgenommen.
- Sende nicht mehr persönliche Daten an ein KI-Modell, als für die Geschichte nötig sind.
- Bei Fehler 429 ist das freie Gemini-API-Kontingent erreicht. Dann später erneut versuchen oder den manuellen Modus nutzen.

## Kosten
Cloudflare Workers hat aktuell einen kostenlosen Tarif (100.000 Requests pro Tag). Gemini 2.5 Flash bietet je nach Projekt und Verfügbarkeit eine kostenlose API-Stufe mit individuellen Raten- und Tokenlimits. Cloudflare und Google können ihre Tarife ändern. Wenn ein Anbieter eine Zahlungsmethode oder ein Upgrade verlangt, **nicht zustimmen**, sofern du keine Kosten möchtest.

## Dateien
- `index.html` – Web-App, manuelle Übergabe und optionale direkte Worker-Verbindung.
- `server/cloudflare-worker.js` – serverseitiger KI-Proxy mit geheim gehaltenem Gemini-Key.
- `daten/johanna_2026-11-15_kanon.json` – letzter geprüfter Falkenried-Spielstand.
- `archiv/johanna_2026-11-14_v0_2_2.json` – jüngstes vollständiges historisches Ausgangsarchiv.

## Fehlersuche
- **„KI manuell“**: Worker-Adresse/Zugangscode fehlt oder Test schlägt fehl. Siehe Fehler unter Sichern.
- **„Zugangscode ungültig“**: Wert muss genau wie `CHRONIKEN_ACCESS_TOKEN` in Cloudflare geschrieben sein.
- **„Geheime Schlüssel fehlen“**: Beide Secrets fehlen oder wurden nicht deployed.
- **„Gemini-Anfrage fehlgeschlagen“**: Google-Zugang oder Modellkontingent prüfen.
- **„Kein Spielzug gespeichert“**: Antwort vom Modell war nicht im geforderten JSON-Format. Daten bleiben unverändert.

Es wurde **noch keine echte Anfrage mit deinem Gemini-Key** getestet. Erst wenn du den Worker eingerichtet hast, können wir die Verbindung prüfen.
