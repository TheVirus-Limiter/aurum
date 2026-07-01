/* SEVORA product hero, Three.js r149.
   Adapted from the founder's original render into a responsive, container
   fitted canvas with drag to rotate, reduced motion support, offscreen
   pause, and a graceful fallback when WebGL is unavailable. */
(function () {
  var mount = document.getElementById("sevora-device");
  if (!mount) return;

  function fail() { mount.setAttribute("data-webgl", "off"); }

  if (!window.THREE) { fail(); return; }
  var THREE = window.THREE;

  // quick WebGL capability check
  try {
    var test = document.createElement("canvas");
    if (!(test.getContext("webgl") || test.getContext("experimental-webgl"))) { fail(); return; }
  } catch (e) { fail(); return; }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  mount.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.cursor = "grab";
  renderer.domElement.setAttribute("role", "img");
  renderer.domElement.setAttribute(
    "aria-label",
    "A slowly rotating render of the SEVORA probe, a bone white sensor with a gold ring and a glowing green status light, its tip resting in grain."
  );

  var COL = {
    bone: 0xe9e1d2, espresso: 0x2c2218, espHi: 0x3a2f22,
    gold: 0xb07a1e, grain: 0xc99a4e, led: 0x49c26a,
  };

  var hemi = new THREE.HemisphereLight(0xfff6e8, 0x6b5a44, 0.55);
  scene.add(hemi);
  var key = new THREE.DirectionalLight(0xfff2dc, 2.0);
  key.position.set(6, 10, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1; key.shadow.camera.far = 40;
  key.shadow.camera.left = -8; key.shadow.camera.right = 8;
  key.shadow.camera.top = 8; key.shadow.camera.bottom = -8;
  key.shadow.bias = -0.0004; key.shadow.radius = 6;
  scene.add(key);
  var fill = new THREE.DirectionalLight(0xe8d8c0, 0.5);
  fill.position.set(-7, 3, 4);
  scene.add(fill);
  var rim = new THREE.DirectionalLight(0xffe6b8, 1.3);
  rim.position.set(-4, 6, -8);
  scene.add(rim);

  var ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.16 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -3.2;
  ground.receiveShadow = true;
  scene.add(ground);

  function makeBandTexture() {
    var c = document.createElement("canvas");
    c.width = 1024; c.height = 256;
    var x = c.getContext("2d");
    x.fillStyle = "#e9e1d2"; x.fillRect(0, 0, c.width, c.height);
    x.fillStyle = "#2c2218";
    x.textAlign = "center"; x.textBaseline = "middle";
    x.font = '700 86px Archivo, Arial, sans-serif';
    x.letterSpacing = "14px";
    x.fillText("SEVORA", 512, 96);
    x.fillStyle = "#b07a1e";
    x.beginPath(); x.arc(512 + 196, 96, 11, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#8a7459";
    x.font = '600 30px "Archivo Narrow", Arial, sans-serif';
    x.letterSpacing = "8px";
    x.fillText("PROTECT EVERY HARVEST", 512, 170);
    var t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    return t;
  }

  function makeGlowSprite(hex) {
    var c = document.createElement("canvas");
    c.width = c.height = 128;
    var g = c.getContext("2d");
    var grd = g.createRadialGradient(64, 64, 2, 64, 64, 62);
    var col = new THREE.Color(hex);
    var r = Math.round(col.r * 255), gg = Math.round(col.g * 255), b = Math.round(col.b * 255);
    grd.addColorStop(0, "rgba(" + r + "," + gg + "," + b + ",0.95)");
    grd.addColorStop(0.35, "rgba(" + r + "," + gg + "," + b + ",0.35)");
    grd.addColorStop(1, "rgba(" + r + "," + gg + "," + b + ",0)");
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    var tex = new THREE.CanvasTexture(c);
    var mat = new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
    return new THREE.Sprite(mat);
  }

  var matBone = new THREE.MeshStandardMaterial({ color: COL.bone, roughness: 0.62, metalness: 0.04 });
  var matBand = new THREE.MeshStandardMaterial({ map: makeBandTexture(), roughness: 0.55, metalness: 0.04 });
  var matEsp = new THREE.MeshStandardMaterial({ color: COL.espresso, roughness: 0.5, metalness: 0.18 });
  var matEspHi = new THREE.MeshStandardMaterial({ color: COL.espHi, roughness: 0.45, metalness: 0.2 });
  var matGold = new THREE.MeshStandardMaterial({ color: COL.gold, roughness: 0.28, metalness: 0.92 });
  var matVent = new THREE.MeshStandardMaterial({ color: 0x140f0a, roughness: 0.7, metalness: 0.1 });
  var matLED = new THREE.MeshStandardMaterial({ color: COL.led, emissive: COL.led, emissiveIntensity: 1.4, roughness: 0.3 });

  var device = new THREE.Group();
  var R = 1.18;

  var body = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 4.0, 64), matBone);
  body.castShadow = true; body.receiveShadow = true;
  device.add(body);

  var band = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.012, R + 0.012, 1.05, 64, 1, true), matBand);
  band.position.y = 0.15; band.castShadow = true;
  device.add(band);

  var ring = new THREE.Mesh(new THREE.TorusGeometry(R + 0.02, 0.045, 20, 80), matGold);
  ring.rotation.x = Math.PI / 2; ring.position.y = 1.55; ring.castShadow = true;
  device.add(ring);

  var cap = new THREE.Mesh(new THREE.SphereGeometry(R, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2), matEsp);
  cap.scale.y = 0.55; cap.position.y = 2.0; cap.castShadow = true;
  device.add(cap);
  var capCollar = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.18, 64), matEspHi);
  capCollar.position.y = 2.0; capCollar.castShadow = true;
  device.add(capCollar);

  var led = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 24), matLED);
  led.position.set(0, 2.0 + 0.55 * R + 0.02, 0);
  device.add(led);
  var ledGlow = makeGlowSprite(COL.led);
  ledGlow.position.copy(led.position);
  ledGlow.scale.set(1.1, 1.1, 1.1);
  device.add(ledGlow);

  var ventBlock = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.96, 0.95, 64), matEsp);
  ventBlock.position.y = -2.45; ventBlock.castShadow = true;
  device.add(ventBlock);
  for (var i = 0; i < 3; i++) {
    var groove = new THREE.Mesh(new THREE.TorusGeometry(R * 0.985, 0.03, 12, 70), matVent);
    groove.rotation.x = Math.PI / 2;
    groove.position.y = -2.2 - i * 0.26;
    device.add(groove);
  }
  var holes = 16;
  for (var h = 0; h < holes; h++) {
    var a = (h / holes) * Math.PI * 2;
    var hole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.2, 12), matVent);
    hole.rotation.z = Math.PI / 2;
    hole.position.set(Math.cos(a) * R * 0.99, -2.45, Math.sin(a) * R * 0.99);
    hole.lookAt(0, -2.45, 0);
    hole.rotateX(Math.PI / 2);
    device.add(hole);
  }

  var tip = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.96, 0.18, 2.1, 48), matEsp);
  tip.position.y = -3.95; tip.castShadow = true;
  device.add(tip);
  var tipPoint = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), matEsp);
  tipPoint.position.y = -5.0;
  device.add(tipPoint);

  device.position.y = 0.6;
  device.scale.setScalar(0.86);
  scene.add(device);

  var grainGroup = new THREE.Group();
  var kernelGeo = new THREE.SphereGeometry(0.16, 12, 10);
  var kernelMat = new THREE.MeshStandardMaterial({ color: COL.grain, roughness: 0.75, metalness: 0.02 });
  // deterministic scatter so the render is stable frame to frame
  var seed = 20260630;
  function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
  for (var g2 = 0; g2 < 60; g2++) {
    var k = new THREE.Mesh(kernelGeo, kernelMat);
    var ka = rnd() * Math.PI * 2;
    var rad = rnd() * 3.4;
    k.position.set(Math.cos(ka) * rad, -3.05 + rnd() * 0.12, Math.sin(ka) * rad);
    k.scale.set(1, 0.62 + rnd() * 0.2, 0.78);
    k.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3);
    k.castShadow = true; k.receiveShadow = true;
    grainGroup.add(k);
  }
  scene.add(grainGroup);

  /* ---- fit camera to container ---- */
  var CENTER_Y = -0.42;
  var HALF_H = 3.85, HALF_W = 1.95;
  function resize() {
    var w = mount.clientWidth || 400;
    var hgt = mount.clientHeight || 480;
    renderer.setSize(w, hgt, false);
    var aspect = w / hgt;
    camera.aspect = aspect;
    var fovY = (camera.fov * Math.PI) / 180;
    var dV = HALF_H / Math.tan(fovY / 2);
    var fovX = 2 * Math.atan(Math.tan(fovY / 2) * aspect);
    var dH = HALF_W / Math.tan(fovX / 2);
    camera.position.set(0, CENTER_Y + 1.0, Math.max(dV, dH) + 1.1);
    camera.lookAt(0, CENTER_Y, 0);
    camera.updateProjectionMatrix();
  }
  resize();
  if (window.ResizeObserver) { new ResizeObserver(resize).observe(mount); }
  else { window.addEventListener("resize", resize); }

  /* ---- drag to rotate ---- */
  var dragging = false, lastX = 0, velocity = 0, manual = false;
  var el = renderer.domElement;
  el.addEventListener("pointerdown", function (e) {
    dragging = true; manual = true; lastX = e.clientX;
    el.style.cursor = "grabbing";
    el.setPointerCapture && el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    lastX = e.clientX;
    device.rotation.y += dx * 0.01;
    velocity = dx * 0.01;
  });
  function endDrag() { dragging = false; el.style.cursor = "grab"; if (reduce) renderer.render(scene, camera); }
  el.addEventListener("pointerup", endDrag);
  el.addEventListener("pointercancel", endDrag);
  el.addEventListener("pointerleave", function () { if (dragging) endDrag(); });

  /* ---- render loop with offscreen + hidden pause ---- */
  var t = 0, raf = null, visible = true;
  function frame() {
    raf = requestAnimationFrame(frame);
    t += 0.01;
    if (!reduce) {
      if (dragging) {
        // follow the pointer, handled in pointermove
      } else if (manual && Math.abs(velocity) > 0.0003) {
        device.rotation.y += velocity;
        velocity *= 0.94; // inertia settling back toward auto spin
      } else {
        device.rotation.y += 0.0055;
      }
      device.position.y = 0.6 + Math.sin(t * 0.9) * 0.07;
      var pulse = 0.9 + Math.sin(t * 2.4) * 0.5;
      matLED.emissiveIntensity = 1.0 + pulse * 0.9;
      ledGlow.scale.setScalar(0.95 + pulse * 0.5);
      ledGlow.material.opacity = 0.55 + pulse * 0.35;
    }
    renderer.render(scene, camera);
  }
  function start() { if (!raf && visible) frame(); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  if (reduce) {
    // static, well framed single render (LED steady, no motion)
    matLED.emissiveIntensity = 1.5;
    device.rotation.y = -0.35;
    renderer.render(scene, camera);
    // still allow drag interaction to re-render
    el.addEventListener("pointermove", function () { if (dragging) renderer.render(scene, camera); });
  } else {
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (ents) {
        visible = ents[0].isIntersecting;
        if (visible) start(); else stop();
      }, { threshold: 0.05 }).observe(mount);
    } else { start(); }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
    start();
  }

  window.__sevoraDevice = { renderer: renderer, scene: scene, camera: camera, device: device };
})();
