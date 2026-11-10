// Interactive 3D library shelf (three.js r170, self-hosted).
// mountShelf(container, glbUrl) draws the shelf into a transparent canvas inside `container`
// and resolves to a cleanup function. Visitors drag sideways to turn the shelf (limited to
// about ±25° so the Qur'an always faces the front); on a mouse it also leans gently towards
// the pointer. With reduced motion it stays still. Rendering pauses while off screen.
import * as THREE from './three.module.min.js';
import { GLTFLoader } from './GLTFLoader.js';
import { DRACOLoader } from './DRACOLoader.js';
import { RoomEnvironment } from './RoomEnvironment.js';

const LIMIT = 0.42;   // max turn either way, radians (~24°)
const BASE = 0.16;    // resting angle: a gentle 3/4 view from the left, like the render

export async function mountShelf(container, glbUrl) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.className = 'lib-3d-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.5;
  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x1a2033, 0.6));

  // Neutral key from the front-left, a warm gold spot on the Qur'an, and a soft rim.
  const key = new THREE.DirectionalLight(0xfff4e6, 1.6);
  key.position.set(-1.2, 2.2, 2.4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -1.4; key.shadow.camera.right = 1.4; key.shadow.camera.top = 1; key.shadow.camera.bottom = -1;
  key.shadow.bias = -0.0005; key.shadow.normalBias = 0.01;
  scene.add(key);
  const gold = new THREE.SpotLight(0xd9b26a, 9, 4, 0.5, 0.6, 1.5);
  gold.position.set(-0.9, 1.4, 1.1);
  scene.add(gold, gold.target);
  const rim = new THREE.DirectionalLight(0xbcc8ff, 0.5);
  rim.position.set(1.5, 1, -1.5);
  scene.add(rim);

  const draco = new DRACOLoader().setDecoderPath(new URL('./draco/', import.meta.url).href);
  const loader = new GLTFLoader().setDRACOLoader(draco);
  const gltf = await loader.loadAsync(glbUrl);
  draco.dispose();

  const model = gltf.scene;
  model.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);                 // centre the shelf on the pivot
  const pivot = new THREE.Group();
  pivot.add(model);
  scene.add(pivot);

  const quran = model.getObjectByName('Book_quran');
  if (quran) { const p = new THREE.Vector3(); quran.getWorldPosition(p); gold.target.position.copy(p); }

  const camera = new THREE.PerspectiveCamera(28, 2.4, 0.05, 50);
  function frame() {
    const w = container.clientWidth, h = container.clientHeight || w / 2.4;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Fit the shelf's width (plus a margin) in view, looking slightly down at it.
    const fitW = size.x * 0.97, fitH = size.y * 1.25;
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const distH = (fitH / 2) / Math.tan(vFov / 2);
    const distW = (fitW / 2) / (Math.tan(vFov / 2) * camera.aspect);
    const d = Math.max(distH, distW) + size.z;
    camera.position.set(0, d * 0.16, d);
    camera.lookAt(0, size.y * 0.12, 0);
    camera.updateProjectionMatrix();
  }
  frame();
  container.appendChild(canvas);

  // Interaction: drag sideways to turn; hover leans a little on a mouse.
  let last = performance.now(), target = BASE, angle = reduce ? BASE : BASE - 0.25, dragging = false, startX = 0, startTarget = 0, touched = false, t0 = performance.now();
  const clamp = v => Math.max(BASE - LIMIT, Math.min(BASE + LIMIT, v));
  const onDown = e => { dragging = true; touched = true; startX = e.clientX; startTarget = target; container.classList.add('is-dragging'); container.classList.add('was-touched'); };
  const onMove = e => {
    if (dragging) target = clamp(startTarget + (e.clientX - startX) / container.clientWidth * 1.6);
    else if (e.pointerType === 'mouse' && !reduce && !touched) {
      const r = container.getBoundingClientRect();
      target = clamp(BASE + ((e.clientX - r.left) / r.width - 0.5) * 0.35);
    }
  };
  const onUp = () => { dragging = false; container.classList.remove('is-dragging'); };
  canvas.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
  // Keyboard: arrow keys on the focused figure turn the shelf too.
  const onKey = e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); touched = true; target = clamp(target + (e.key === 'ArrowRight' ? 0.12 : -0.12)); } };
  container.addEventListener('keydown', onKey);

  let visible = true, raf = 0, shown = false;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } });
  io.observe(container);
  const ro = new ResizeObserver(frame);
  ro.observe(container);

  function loop(now) {
    raf = 0;
    if (!visible) return;
    // A slow idle sway until the visitor takes over.
    const sway = (!reduce && !touched && !dragging) ? Math.sin((now - t0) / 2600) * 0.07 : 0;
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    angle += ((target + sway) - angle) * (reduce ? 1 : 1 - Math.exp(-dt * 3.5)); // same feel at any frame rate
    pivot.rotation.y = angle;
    renderer.render(scene, camera);
    if (!shown) { shown = true; container.classList.add('is-3d'); }
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
    canvas.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    container.removeEventListener('keydown', onKey);
    scene.traverse(o => { if (o.isMesh) { o.geometry.dispose(); [].concat(o.material).forEach(m => { for (const k in m) if (m[k]?.isTexture) m[k].dispose(); m.dispose(); }); } });
    scene.environment?.dispose(); pmrem.dispose(); renderer.dispose(); canvas.remove();
    container.classList.remove('is-3d');
  };
}
