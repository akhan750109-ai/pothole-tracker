const canvas = document.querySelector('#sofa-canvas');
const ctx = canvas.getContext('2d');
const hero = document.querySelector('.hero');
const progressLine = document.querySelector('.progress span');
const loadingLabel = document.querySelector('.loading-label');
const frameTotal = 100;
const frames = [];
let target = 0, smooth = 0, renderedFrame = -1;
const dpr = Math.min(window.devicePixelRatio || 1, 2);

function framePath(index) { return `frames/frame_${String(index).padStart(4, '0')}.jpg`; }
function resize() { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; drawFrame(Math.round(smooth * (frameTotal - 1)), true); }
function drawFrame(index, force = false) {
  const image = frames[index];
  if (!image || !image.complete || (!force && index === renderedFrame)) return;
  const width = innerWidth, height = innerHeight, imageRatio = image.naturalWidth / image.naturalHeight, canvasRatio = width / height;
  let sourceWidth = image.naturalWidth, sourceHeight = image.naturalHeight, sourceX = 0, sourceY = 0;
  if (canvasRatio > imageRatio) { sourceHeight = image.naturalWidth / canvasRatio; sourceY = (image.naturalHeight - sourceHeight) / 2; }
  else { sourceWidth = image.naturalHeight * canvasRatio; sourceX = (image.naturalWidth - sourceWidth) / 2; }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
  renderedFrame = index;
}
function setScrollTarget() { const bounds = hero.getBoundingClientRect(); target = Math.max(0, Math.min(1, -bounds.top / (bounds.height - innerHeight))); }
function animate() { smooth += (target - smooth) * .11; drawFrame(Math.round(smooth * (frameTotal - 1))); progressLine.style.width = `${smooth * 100}%`; requestAnimationFrame(animate); }

let loaded = 0;
for (let i = 0; i < frameTotal; i++) {
  const image = new Image(); image.decoding = 'async'; image.src = framePath(i);
  image.onload = () => { loaded++; loadingLabel.querySelector('span').textContent = `${Math.round(loaded / frameTotal * 100)}%`; if (loaded === 1) drawFrame(0, true); if (loaded === frameTotal) { loadingLabel.style.opacity = '0'; setTimeout(() => loadingLabel.remove(), 450); } };
  frames.push(image);
}
addEventListener('scroll', setScrollTarget, { passive: true });
addEventListener('resize', resize, { passive: true });
resize(); setScrollTarget(); animate();
