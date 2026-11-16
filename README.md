# Chroniken – Lebendige Welten

Statische, Firebase-freie Fantasy-Rollenspiel-Web-App für **Johanna Reborn**. Der Quellcode ist öffentlich und kann über GitHub Pages veröffentlicht werden.

## Aktueller Spielstand
- **Falkenried statt Hohenrain:** Der Hof ist gekauft und vollständig abbezahlt. Johanna, Marta, Alva und Wenke besitzen je einen gleichberechtigten Anteil.
- Rika wohnt mit im Hof und hat **10 von 100 Silber** für einen späteren fünften Anteil eingezahlt.
- **Johanna 217 Silber persönlich, Hofkasse 33 Silber**, davon sind Rikas 10 Silber bereits enthalten (letzter überprüfbarer Checkpoint am 15.11.2026 gegen 10:55).
- Die Gießkanne wurde für **7 Silber** aus der Hofkasse gekauft. Die Regentonne und Dachrinne für **17 Silber** sind nur angeboten.
- Ein Badehaus-Inventurauftrag über **60 Silber** ist angenommen; Johanna, Wenke und Heda würden je 20 erhalten. **Noch keine Auszahlung.**
- Keine der drei noch offenen Optionen (Regentonne, Rika-Tagesauftrag, Badehaus-Zugang) wurde danach als gewählt bestätigt.
- Kiesel ist nach der neueren Bildfestlegung eine **sehr große Katze**, nicht die ältere Dachs-/Stollenwühler-Darstellung.

## Vollständige Daten
- `index.html`: gesamte startfähige App inklusive vier eingebetteter älterer Karten.
- `daten/johanna_2026-11-15_kanon.json`: jüngster aus dem Spielchat rekonstruierter Checkpoint.
- `archiv/johanna_2026-11-14_v0_2_2.json`: neueres vollständiges Ausgangsarchiv (124 Festlegungsbereiche, 26 Sitzungen, 52 Änderungen, Welt, Figuren, Beziehungsregeln, zukünftiger Plot und Kalender).
- Kalender: **13 × 28 Tage plus Neujahr**, aktueller Monat **Hochsonnenmond** (6. Monat).
- Ältere Quellen werden nicht still zum aktuellen Spielstand erklärt. Stellenweise fehlen Zwischenprotokolle.

## Karten und Bilder
Die vier eingebetteten Karten sind ältere **Entwürfe**. Es liegt keine aktuelle verifizierte Hofkarte für Falkenried vor. Unter **Bilder** kannst du neuere Karten für einzelne Schauplätze auf deinem Gerät auswählen, ohne die Originalentwürfe zu löschen. Eigene Karten und Bilder werden in diesem Browser lokal gespeichert, nicht nach GitHub hochgeladen.

## Spielen und Sicherung
Die App speichert Spielzüge nur lokal im Browser. Regelmäßig unter **Sichern** ein JSON-Backup exportieren. Wenn du den Cache löschst oder das Gerät wechselst, gehen lokale Daten sonst möglicherweise verloren.

Die KI ist noch **nicht automatisch angebunden**. Du kannst den erweiterten Kontext aus der App nach ChatGPT oder Gemini kopieren, die Erzählung dort als JSON generieren lassen und in die App zurück übernehmen. Niemals einen geheimen API-Schlüssel direkt in `index.html` speichern.

## Veröffentlichung
Für GitHub Pages unter **Settings → Pages** als Quelle **Deploy from a branch**, `main`, `/(root)` einstellen. Erwartete URL: `https://andyneuling-rgb.github.io/chroniken-rpg/`.

## Prüfung
Alle Aktualisierungen wurden über die GitHub-Schnittstelle übertragen und zurückgelesen. Der tatsächliche Ablauf im iPhone-Browser und die vollständige GitHub-Pages-Deployment-Statusprüfung sind nicht automatisiert abgeschlossen.
