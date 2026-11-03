# Turkish 50 — TR / EN Dictionary

A 50-entry Turkish–English word list with individual HTML pages.

## Features
- Search the index in Turkish or English.
- Open a dedicated page for each word.
- English equivalents are concise learner translations.
- Turkish definitions and available example sentences load from the official Turkish Language Association (TDK) Güncel Türkçe Sözlük API.
- Each entry links directly to its TDK source.
- Responsive editorial layout; plain HTML, CSS and JavaScript.

## Data and attribution
The Turkish definitions are fetched from `https://sozluk.gov.tr/gts?ara={word}`. TDK is the source for the Turkish senses and examples. English equivalents are translations prepared for this learning list, not official TDK translations. The TDK endpoint requires an internet connection and may be unavailable temporarily.

The list is a practical learner-focused selection of common words, not a statistically verified corpus-frequency ranking.

## Run locally
Open `index.html` in a browser while connected to the internet. The index search works locally; word pages contact the TDK endpoint to retrieve definitions.

## GitHub Pages
The workflow deploys the static site from `main`. If needed, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.

Repository: https://github.com/zxzchocolate/competition-meb-tr-dictionary
