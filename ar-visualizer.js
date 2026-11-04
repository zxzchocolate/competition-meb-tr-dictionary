(() => {
  const page = document.querySelector("[data-slug]");
  if (!page || document.getElementById("ar-launch")) return;
  const slug = page.dataset.slug;
  const scenes = {
    "ve":["＋","Connecting two ideas","Two floating shapes move together."],
    "bir":["1","One","A single object appears, then duplicates into a pair."],
    "bu":["●","This","A nearby object is highlighted."],
    "shu":["◉","That one","A selected object is highlighted at a distance."],
    "o":["◎","He / she / it / that","A distant point is selected."],
    "ben":["I","Me","A simple first-person silhouette."],
    "sen":["YOU","You","A second-person marker faces the viewer."],
    "biz":["WE","Us","Several figures gather together."],
    "siz":["YOU+","You (plural / polite)","A group of figures appears."],
    "onlar":["•••","They","A group stands together at a distance."],
    "cok":["×5","Many / much","Several copies multiply around the scene."],
    "daha":["↑","More","A progress bar grows to show more."],
    "ne":["?","What?","A question mark floats in the scene."],
    "icin":["→","For","A gift moves toward its recipient."],
    "ile":["↔","With","Two objects connect."],
    "de-da":["＋","Also / too","A second matching object appears."],
    "var":["✓","There is","An object appears in the scene."],
    "yok":["∅","There is not","An object fades away."],
    "gibi":["≈","Like / as","Two similar shapes appear side by side."],
    "ama":["↯","But","Two contrasting shapes face each other."],
    "insan":["♙","Human","A human-shaped figure stands in the room."],
    "sey":["◇","Thing","A simple object rotates."],
    "ev":["⌂","House / home","A little house appears in the scene."],
    "su":["≈","Water","Blue waves ripple."],
    "yemek":["◒","Food / eat","A plate of food appears."],
    "gun":["☼","Day","A sun rises above the horizon."],
    "zaman":["◷","Time","A clock hand rotates."],
    "simdi":["NOW","Now","A bright marker highlights the present moment."],
    "sonra":["→","Later / after","A marker moves forward on a timeline."],
    "once":["←","Before","A marker moves backward on a timeline."],
    "burada":["⌖","Here","A location marker appears nearby."],
    "orada":["◎","There","A location marker appears farther away."],
    "iyi":["＋","Good / well","A positive symbol glows."],
    "guzel":["✧","Beautiful","A geometric flower slowly opens."],
    "buyuk":["↗","Big / large","A small shape scales up."],
    "kucuk":["↘","Small","A large shape scales down."],
    "olmak":["◌","Be / become","A shape transforms into another."],
    "yapmak":["⚙","Do / make","A simple construction assembles."],
    "gelmek":["←","Come","A figure moves toward the viewer."],
    "gitmek":["→","Go","A figure moves away from the viewer."],
    "istemek":["♡","Want","A target object is drawn toward a heart marker."],
    "bilmek":["⌘","Know","A lightbulb switches on."],
    "gormek":["◉","See","A focus ring scans the scene."],
    "almak":["↓","Take / get","An object moves into a hand-shaped marker."],
    "merhaba":["HI","Hello","Two friendly figures wave."],
    "evet":["✓","Yes","A check mark appears."],
    "hayir":["×","No","A cross appears."],
    "lutfen":["PLEASE","Please","A request card gently appears."],
    "tesekkurler":["♥","Thank you","A heart appears and pulses."],
    "nasil":["?","How?","A question path unfolds."]
  };
  const scene = scenes[slug] || ["◇", page.dataset.title || "Word", "A visual representation of this word."];
  const button = document.createElement("button");
  button.id = "ar-launch"; button.type = "button"; button.innerHTML = '<span class="ar-launch-icon">⌗</span><span><b>VIEW IN AR</b><small>Apple · Android · Web</small></span><span class="ar-launch-arrow">↗</span>';
  const translation = page.querySelector(".translation");
  if (translation) translation.insertAdjacentElement("afterend", button);
  const modal = document.createElement("section");
  modal.id = "ar-stage"; modal.hidden = true; modal.setAttribute("role","dialog"); modal.setAttribute("aria-modal","true"); modal.setAttribute("aria-label","AR word visualizer");
  modal.innerHTML = '<div class="ar-stage-top"><span>TR / EN · CAMERA EXPERIENCE</span><button type="button" class="ar-close" aria-label="Close">×</button></div><div class="ar-camera"><video playsinline muted autoplay></video><div class="ar-camera-fallback"></div><div class="ar-reticle"><i></i><i></i><i></i><i></i></div><div class="ar-object-wrap"><div class="ar-object"></div><div class="ar-object-shadow"></div></div><div class="ar-caption"><span class="ar-caption-word"></span><b class="ar-caption-title"></b><p class="ar-caption-desc"></p></div><div class="ar-camera-status">CAMERA OFF · VISUAL PREVIEW</div></div><div class="ar-stage-bottom"><button type="button" class="ar-camera-toggle">START CAMERA</button><span>Screen-anchored demo · no spatial tracking</span></div>';
  document.body.append(modal);
  const video=modal.querySelector("video"), object=modal.querySelector(".ar-object");
  modal.querySelector(".ar-caption-word").textContent=page.dataset.title || slug;
  modal.querySelector(".ar-caption-title").textContent=scene[1];
  modal.querySelector(".ar-caption-desc").textContent=scene[2];
  object.textContent=scene[0];
  object.classList.add("ar-motion-"+( /run|come|go|eat|make|become|swim/.test(slug) ? "action" : "float"));
  let stream=null;
  async function stopCamera(){if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}video.srcObject=null;modal.classList.remove("camera-on");modal.querySelector(".ar-camera-status").textContent="CAMERA OFF · VISUAL PREVIEW";modal.querySelector(".ar-camera-toggle").textContent="START CAMERA";}
  async function startCamera(){
    if(!navigator.mediaDevices?.getUserMedia){modal.querySelector(".ar-camera-status").textContent="CAMERA NOT AVAILABLE · VISUAL PREVIEW";return;}
    try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});video.srcObject=stream;await video.play();modal.classList.add("camera-on");modal.querySelector(".ar-camera-status").textContent="CAMERA LIVE · SCREEN-ANCHORED DEMO";modal.querySelector(".ar-camera-toggle").textContent="STOP CAMERA";}
    catch(e){modal.querySelector(".ar-camera-status").textContent=e.name==="NotAllowedError"?"CAMERA PERMISSION DENIED · VISUAL PREVIEW":"CAMERA UNAVAILABLE · VISUAL PREVIEW";}
  }
  button.addEventListener("click",()=>{modal.hidden=false;document.body.classList.add("ar-open");});
  modal.querySelector(".ar-close").addEventListener("click",async()=>{await stopCamera();modal.hidden=true;document.body.classList.remove("ar-open");});
  modal.querySelector(".ar-camera-toggle").addEventListener("click",()=>stream?stopCamera():startCamera());
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)modal.querySelector(".ar-close").click();});
})();