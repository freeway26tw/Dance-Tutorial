// ===== Two Step 教室 互動腳本 =====

const dancer = document.getElementById("dancer");
const playBtn = document.getElementById("playBtn");
const speed = document.getElementById("speed");
const speedVal = document.getElementById("speedVal");
const beatLabel = document.getElementById("beatLabel");
const soundToggle = document.getElementById("soundToggle");
const beatDots = Array.from(document.querySelectorAll(".beat-dot"));
const stepCards = Array.from(document.querySelectorAll(".step-card"));

const BASE_BEAT_MS = 600; // 一拍的基準毫秒數（速度 = 1 時）
let playing = false;
let beatIndex = 0;
let timer = null;
let audioCtx = null;

// 每一拍對應的提示文字 + 火柴人左右位移（像素）
const BEATS = [
  { text: "1 ｜ 右腳往右踏", x: 36 },
  { text: "2 ｜ 左腳併過去", x: 36 },
  { text: "3 ｜ 左腳往左踏", x: -36 },
  { text: "4 ｜ 右腳併過去", x: -36 },
];

function currentBeatMs() {
  // 速度數字越大 -> 拍子越快 -> 毫秒越短
  return BASE_BEAT_MS / parseFloat(speed.value);
}

function speedText(v) {
  const n = parseFloat(v);
  if (n < 0.8) return "慢速";
  if (n > 1.2) return "快速";
  return "正常";
}

// 播放單一節拍聲（Web Audio，不需外部檔案）
function tick(strong) {
  if (!soundToggle.checked) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = strong ? 880 : 600;
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.13);
}

function renderBeat(i) {
  const beat = BEATS[i];
  beatLabel.textContent = beat.text;
  dancer.style.transform = `translateX(${beat.x}px)`;

  beatDots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  stepCards.forEach((c, idx) => c.classList.toggle("highlight", idx === i));

  tick(i === 0); // 第 1 拍用比較重的音
}

function loop() {
  renderBeat(beatIndex);
  beatIndex = (beatIndex + 1) % BEATS.length;
  timer = setTimeout(loop, currentBeatMs());
}

function start() {
  playing = true;
  beatIndex = 0;
  dancer.classList.add("dancing");
  dancer.style.setProperty("--beat", `${currentBeatMs() * 2}ms`);
  playBtn.textContent = "⏸ 暫停";
  // 解除瀏覽器的 audio 限制（需使用者互動後才能播聲）
  if (soundToggle.checked && !audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  loop();
}

function stop() {
  playing = false;
  clearTimeout(timer);
  dancer.classList.remove("dancing");
  dancer.style.transform = "translateX(0)";
  beatDots.forEach((d) => d.classList.remove("active"));
  stepCards.forEach((c) => c.classList.remove("highlight"));
  beatLabel.textContent = "做得好！再來一次？";
  playBtn.textContent = "▶ 播放示範";
}

playBtn.addEventListener("click", () => (playing ? stop() : start()));

speed.addEventListener("input", () => {
  speedVal.textContent = speedText(speed.value);
  if (playing) {
    dancer.style.setProperty("--beat", `${currentBeatMs() * 2}ms`);
  }
});

// ===== 練習檢查表 =====
const checklist = document.getElementById("checklist");
const doneMsg = document.getElementById("doneMsg");
const checkboxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));

function updateChecklist() {
  const allDone = checkboxes.every((c) => c.checked);
  doneMsg.hidden = !allDone;
  if (allDone) doneMsg.scrollIntoView({ behavior: "smooth", block: "center" });
}
checkboxes.forEach((c) => c.addEventListener("change", updateChecklist));
