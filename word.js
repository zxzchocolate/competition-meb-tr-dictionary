(() => {
  const page = document.querySelector("[data-slug]");
  if (!page) return;
  const entry = window.TR_EN_DATABASE && window.TR_EN_DATABASE[page.dataset.slug];
  const list = document.getElementById("definitions");
  const status = document.getElementById("tdk-status");
  if (entry && list && status) {
    const item = document.createElement("li"); item.className = "definition";
    const number = document.createElement("span"); number.className = "sense-number"; number.textContent = "01";
    const body = document.createElement("div");
    const pos = document.createElement("span"); pos.className = "pos"; pos.textContent = entry.partOfSpeech;
    const meaning = document.createElement("div"); meaning.className = "sense-text"; meaning.textContent = entry.definition;
    body.append(pos, meaning); item.append(number, body); list.replaceChildren(item);
    status.textContent = "Loaded from the local dictionary database · works offline";
  } else if (status) status.textContent = "This word is not in the local dictionary database yet.";
  const overlay = document.createElement("script"); overlay.src = "../competition-overlay.js"; document.body.append(overlay);
})();