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

  const overlay = document.createElement("script");
  overlay.src = "../competition-overlay.js?v=2";
  document.body.append(overlay);

  // Load the AR launcher with a cache-busting version and report failures visibly.
  const ar = document.createElement("script");
  ar.src = "../ar-visualizer.js?v=3";
  ar.onload = () => {
    if (!document.getElementById("ar-launch")) {
      const fallback = document.createElement("button");
      fallback.id = "ar-launch";
      fallback.type = "button";
      fallback.textContent = "3D / AR viewer failed to initialize — reload this page";
      fallback.style.display = "block";
      fallback.style.margin = "0 0 36px";
      fallback.addEventListener("click", () => location.reload());
      const translation = page.querySelector(".translation");
      if (translation) translation.insertAdjacentElement("afterend", fallback);
    }
  };
  ar.onerror = () => {
    const fallback = document.createElement("p");
    fallback.className = "loading";
    fallback.textContent = "3D / AR viewer could not load. Check your connection and refresh.";
    const translation = page.querySelector(".translation");
    if (translation) translation.insertAdjacentElement("afterend", fallback);
  };
  document.body.append(ar);
})();