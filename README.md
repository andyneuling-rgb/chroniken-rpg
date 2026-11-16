# Chroniken – Lebendige Welten

Private, Firebase-freie Fantasy-Rollenspiel-Web-App mit **Johanna Reborn** als erster Kampagne.

## Was enthalten ist
- `index.html`: gesamte Web-App als eine Datei, inklusive eingebetteter Karten.
- Rekonstruierter Spielstand bis zum Hohenrain-Wartungsauftrag; die Konsequenz der bereits gewählten Zulaufschließung ist noch offen.
- Figuren, Chronik, Regeln, 2W10-Würfel, lokaler Spielstand, Bildgalerie.
- JSON-Export und -Import als manuelle Datensicherung.
- **Kein Firebase, kein Cloud-Konto, kein KI-Schlüssel im Browser.**

## KI-Erzählungen
Die App hat derzeit **keine automatische KI-Anbindung**. Mit der manuellen Übergabe kannst du Handlung und Kontext nach ChatGPT oder Gemini kopieren und anschließend die generierte Antwort zurück in die App übernehmen. Einen Schlüssel für Gemini niemals öffentlich in `index.html` ablegen.

## Veröffentlichung
GitHub ist momentan nur der **private Quellcode-Speicher**. Die Datei ist hochgeladen, aber **noch keine öffentliche Website**. Bei kostenlosen GitHub-Tarifen ist GitHub Pages für private Repositories möglicherweise nicht verfügbar. Für Pages kannst du nach bewusster Entscheidung zur Veröffentlichung das Repository ggf. öffentlich machen und unter **Settings → Pages → Deploy from a branch → main / (root)** aktivieren. Achtung: Dabei werden auch die eingebetteten Spielwelttexte und Karten öffentlich sichtbar. Alternativ einen statischen Hoster nutzen, der private Quellen erlaubt.

## Datensicherheit
Spielstand und selbst hochgeladene Bilder liegen nur im jeweiligen Browser, nicht automatisch bei GitHub. Vor Browser-/Gerätewechsel oder Cache-Löschung JSON-Backup erstellen. Selbst hinzugefügte Bilder liegen im lokalen Gerätespeicher. Die komplette Referenzbild-Sammlung ist noch nicht importiert.

## Teststand
`index.html` wurde hochgeladen und über den GitHub-Connector zurückgelesen. Eine echte iPhone-End-to-End-Prüfung, eine automatische Gemini-Verbindung und eine Veröffentlichung stehen noch aus.
