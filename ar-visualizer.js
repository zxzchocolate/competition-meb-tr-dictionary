(() => {
  const page = document.querySelector("[data-slug]");
  if (!page || document.getElementById("ar-launch")) return;
  const slug = page.dataset.slug;
  const scenes = {
    "ve":["＋","Connecting two ideas","Two things connect."],
    "bir":["1","One","A single item."],"bu":["●","This","Something close by."],
    "shu":["◉","That one","Something farther away."],"o":["◎","He / she / it / that","A person or thing."],
    "ben":["I","Me","The speaker."],"sen":["YOU","You","The person being spoken to."],
    "biz":["WE","Us","A group including the speaker."],"siz":["YOU+","You (plural / polite)","A group being addressed."],
    "onlar":["•••","They","A group of people or things."],"cok":["×5","Many / much","A collection of several things."],
    "daha":["↑","More","An increasing amount."],"ne":["?","What?","A question."],"icin":["→","For","Something intended for someone."],
    "ile":["↔","With","Two things together."],"de-da":["＋","Also / too","An additional thing."],"var":["✓","There is","Something exists."],
    "yok":["∅","There is not","Something is absent."],"gibi":["≈","Like / as","A comparison."],"ama":["↯","But","A contrast."],
    "insan":["♙","Human","A person."],"sey":["◇","Thing","An object."],"ev":["⌂","House / home","A place to live."],
    "su":["≈","Water","Water in motion."],"yemek":["◒","Food / eat","Food and eating."],"gun":["☼","Day","The daytime sky."],
    "zaman":["◷","Time","Time passing."],"simdi":["NOW","Now","The present moment."],"sonra":["→","Later / after","A point in the future."],
    "once":["←","Before","A point in the past."],"burada":["⌖","Here","A nearby location."],"orada":["◎","There","A distant location."],
    "iyi":["＋","Good / well","A positive result."],"guzel":["✧","Beautiful","Something pleasing to see."],
    "buyuk":["↗","Big / large","A large size."],"kucuk":["↘","Small","A small size."],"olmak":["◌","Be / become","A change of state."],
    "yapmak":["⚙","Do / make","Making or building something."],"gelmek":["←","Come","Moving closer."],"gitmek":["→","Go","Moving away."],
    "istemek":["♡","Want","Desire for something."],"bilmek":["⌘","Know","Understanding something."],"gormek":["◉","See","Looking at something."],
    "almak":["↓","Take / get","Receiving or taking something."],"merhaba":["HI","Hello","A greeting."],"evet":["✓","Yes","Agreement."],
    "hayir":["×","No","Refusal or negation."],"lutfen":["PLEASE","Please","A polite request."],"tesekkurler":["♥","Thank you","Showing gratitude."],
    "nasil":["?","How?","A question about the way something happens."]
  };
  const models = {
    person:"https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    action:"https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
    movement:"https://modelviewer.dev/shared-assets/models/Horse.glb",
    object:"https://modelviewer.dev/shared-assets/models/lantern.glb"
  };
  const people = new Set(["ben","sen","biz","siz","onlar","insan","merhaba","o"]);
  const movers = new Set(["gelmek","gitmek","once","sonra","burada","orada"]);
  const actions = new Set(["yemek","olmak","yapmak","istemek","bilmek","gormek","almak"]);
  const model = people.has(slug) ? models.person : movers.has(slug) ? models.movement : actions.has(slug) ? models.action : models.object;
  const scene = scenes[slug] || ["◇", page.dataset.title || "Word", "A 3D visual for this word."];
  const button = document.createElement("button");
  button.id = "ar-launch"; button.type = "button";
  button.innerHTML = '<span class="ar-launch-icon">⌗</span><span><b>VIEW IN 3D / AR</b><small>iPhone · Android · Browser</small></span><span class="ar-launch-arrow">↗</span>';
  const translation = page.querySelector(".translation");
  if (translation) translation.insertAdjacentElement("afterend", button);
  const modal = document.createElement("section");
  modal.id = "ar-stage"; modal.hidden = true; modal.setAttribute("role","dialog"); modal.setAttribute("aria-modal","true"); modal.setAttribute("aria-label","3D word visualizer");
  modal.innerHTML = '<div class="ar-stage-top"><span>TR / EN · 3D WORD VIEWER</span><button type="button" class="ar-close" aria-label="Close">×</button></div><div class="ar-viewer"><div class="ar-word-label"><span class="ar-caption-word"></span><b class="ar-caption-title"></b><p class="ar-caption-desc"></p></div><model-viewer camera-controls auto-rotate rotation-per-second="22deg" shadow-intensity="1" exposure="1" ar ar-modes="webxr scene-viewer quick-look" ar-placement="floor" ar-scale="auto" touch-action="pan-y" alt="3D illustration for this dictionary word"><button slot="ar-button" class="ar-native-button">PLACE IN YOUR ROOM</button><div slot="ar-failure" class="ar-failure">AR is not supported here. You can still rotate the 3D model above.</div></model-viewer><div class="ar-model-note">3D illustration · model represents the word category</div></div><div class="ar-stage-bottom"><span>Drag to rotate · Pinch to zoom</span><span>AR needs a compatible phone and browser</span></div>';
  document.body.append(modal);
  const viewer=modal.querySelector("model-viewer");
  viewer.src=model;
  modal.querySelector(".ar-caption-word").textContent=page.dataset.title || slug;
  modal.querySelector(".ar-caption-title").textContent=scene[1];
  modal.querySelector(".ar-caption-desc").textContent=scene[2];
  const loader=document.createElement("script");
  loader.type="module";
  loader.src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.4.0/model-viewer.min.js";
  document.head.append(loader);
  button.addEventListener("click",()=>{modal.hidden=false;document.body.classList.add("ar-open");});
  modal.querySelector(".ar-close").addEventListener("click",()=>{modal.hidden=true;document.body.classList.remove("ar-open");});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)modal.querySelector(".ar-close").click();});
})();
