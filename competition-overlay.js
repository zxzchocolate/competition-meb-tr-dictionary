(() => {
  if (document.getElementById("meb-demo-overlay")) return;
  const words = [["ve","ve","and"],["bir","bir","a; one"],["bu","bu","this"],["shu","şu","that; this one"],["o","o","he; she; it; that"],["ben","ben","I; me"],["sen","sen","you (singular)"],["biz","biz","we; us"],["siz","siz","you (plural or polite)"],["onlar","onlar","they; them"],["cok","çok","very; much; many"],["daha","daha","more; further; still"],["ne","ne","what"],["icin","için","for; because of"],["ile","ile","with; by means of"],["de-da","de / da","also; too; in; at (suffix)"],["var","var","there is; exists; have"],["yok","yok","there is not; absent; none"],["gibi","gibi","like; as"],["ama","ama","but"],["insan","insan","person; human"],["sey","şey","thing; matter"],["ev","ev","house; home"],["su","su","water"],["yemek","yemek","food; meal; to eat"],["gun","gün","day"],["zaman","zaman","time"],["simdi","şimdi","now"],["sonra","sonra","after; later"],["once","önce","before; earlier"],["burada","burada","here"],["orada","orada","there"],["iyi","iyi","good; well"],["guzel","güzel","beautiful; nice; good"],["buyuk","büyük","big; large; great"],["kucuk","küçük","small; little; young"],["olmak","olmak","to be; to become; to happen"],["yapmak","yapmak","to do; to make"],["gelmek","gelmek","to come"],["gitmek","gitmek","to go; to leave"],["istemek","istemek","to want; to wish"],["bilmek","bilmek","to know; to be able"],["gormek","görmek","to see"],["almak","almak","to take; to get; to buy"],["merhaba","merhaba","hello"],["evet","evet","yes"],["hayir","hayır","no"],["lutfen","lütfen","please"],["tesekkurler","teşekkürler","thanks; thank you"],["nasil","nasıl","how; in what way"]];
  const database = window.TR_EN_DATABASE || {};
  const path = location.pathname.split("/").pop().replace(/\.html$/, "");
  let index = words.findIndex(w => w[0] === path);
  if (index < 0) index = Math.floor(Math.random() * words.length);
  const root = document.createElement("section");
  root.id = "meb-demo-overlay";
  root.setAttribute("aria-label", "MEB competition demonstration overlay");
  root.innerHTML = '<div class="meb-demo-head"><span class="meb-demo-mark">DEMO OVERLAY</span><div class="meb-demo-actions"><button type="button" data-action="min" aria-label="Minimize">−</button><button type="button" data-action="hide" aria-label="Close">×</button></div></div><div class="meb-demo-body"><div class="meb-demo-kicker">MEB COMPETITION · PRACTICE ONLY</div><div class="meb-demo-number"></div><div class="meb-demo-word" lang="tr"></div><div class="meb-demo-english"></div><div class="meb-demo-definition"></div><div class="meb-demo-foot"><button type="button" data-action="prev">← PREV</button><button type="button" data-action="random">RANDOM</button><button type="button" data-action="next">NEXT →</button></div><div class="meb-demo-disclaimer">Unofficial learner demo · Not an MEB tool</div></div>';
  document.body.append(root);
  const launcher = document.createElement("button");
  launcher.id = "meb-demo-launcher"; launcher.type = "button"; launcher.textContent = "OPEN DEMO";
  launcher.setAttribute("aria-label", "Open competition demo overlay"); document.body.append(launcher);
  const $ = s => root.querySelector(s);
  function render() {
    const w = words[index], entry = database[w[0]];
    $(".meb-demo-number").textContent = String(index + 1).padStart(2, "0") + " / 50";
    $(".meb-demo-word").textContent = w[1];
    $(".meb-demo-english").textContent = w[2];
    $(".meb-demo-definition").textContent = entry ? entry.partOfSpeech + " — " + entry.definition : "Learner definition unavailable on this page.";
  }
  function navigate(next) {
    index = (next + words.length) % words.length; render();
    if (words.some(w => w[0] === path)) location.href = words[index][0] + ".html";
  }
  root.addEventListener("click", e => {
    const action = e.target.closest("button")?.dataset.action;
    if (!action) return;
    if (action === "hide") { root.hidden = true; launcher.hidden = false; }
    if (action === "min") root.classList.toggle("is-min");
    if (action === "prev") navigate(index - 1);
    if (action === "next") navigate(index + 1);
    if (action === "random") navigate(Math.floor(Math.random() * words.length));
  });
  launcher.addEventListener("click", () => { root.hidden = false; launcher.hidden = true; });
  const head = root.querySelector(".meb-demo-head"); let drag = null;
  head.addEventListener("pointerdown", e => {
    if (e.target.closest("button")) return;
    const r = root.getBoundingClientRect(); drag = {x:e.clientX-r.left,y:e.clientY-r.top};
    head.setPointerCapture(e.pointerId);
  });
  head.addEventListener("pointermove", e => {
    if (!drag) return;
    root.style.left = Math.max(0, Math.min(innerWidth-root.offsetWidth, e.clientX-drag.x)) + "px";
    root.style.top = Math.max(0, Math.min(innerHeight-44, e.clientY-drag.y)) + "px";
    root.style.right = "auto"; root.style.bottom = "auto";
  });
  head.addEventListener("pointerup", () => drag = null);
  document.addEventListener("keydown", e => {
    if (e.altKey && e.shiftKey && e.key.toLowerCase() === "m") {
      root.hidden = !root.hidden; launcher.hidden = !root.hidden;
    }
  });
  render();
})();