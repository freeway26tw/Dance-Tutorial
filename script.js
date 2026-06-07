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

// ===== 單一舞步循環練習（YouTube IFrame API）=====
const PRACTICE_VIDEO_ID = "YRDa_0NO2U4";

// 每個舞步：名稱 + 起始秒數（end 由下一個的 start 自動推算）
// 時間戳取自影片下方觀眾留言 @mel_etmoa
const MOVE_TIMES = [
  { name: "Running man", t: 11 },
  { name: "Humpty Hump", t: 37 },
  { name: "Roof top", t: 49 },
  { name: "Criss Cross", t: 59 },
  { name: "LL Cool J", t: 77 },
  { name: "Woah", t: 87 },
  { name: "Reject", t: 99 },
  { name: "Butterfly", t: 113 },
  { name: "Toss it up", t: 128 },
  { name: "Walk it out", t: 135 },
  { name: "Aunt viv", t: 146 },
  { name: "Monastery", t: 156 },
  { name: "Prep", t: 164 },
  { name: "Scissors", t: 183 },
  { name: "Marge", t: 200 },
  { name: "Locked in", t: 212 },
  { name: "Heel toe", t: 222 },
  { name: "Real love", t: 239 },
  { name: "Robocop", t: 252 },
  { name: "Party Machine", t: 262 },
  { name: "Boppin", t: 272 },
  { name: "Jump rope", t: 281 },
  { name: "Party Duke", t: 291 },
  { name: "The WOP", t: 305 },
  { name: "Do the 40's", t: 322 },
  { name: "Roger Rabbit", t: 326 },
  { name: "Tone WOP", t: 338 },
  { name: "Guess", t: 350 },
  { name: "Creep", t: 360 },
  { name: "Carlton", t: 370 },
  { name: "Wu Tang", t: 380 },
  { name: "Bernie", t: 390 },
  { name: "Shamrock", t: 399 },
  { name: "Crab", t: 409 },
  { name: "Cabbage patch", t: 419 },
  { name: "Lean wit it Rock wit it", t: 433 },
  { name: "The Rock", t: 441 },
  { name: "Smeeze", t: 456 },
  { name: "Back breaker", t: 464 },
  { name: "Spongebob", t: 472 },
  { name: "Around the world", t: 479 },
  { name: "Superman", t: 490 },
  { name: "Bartsimpson", t: 500 },
  { name: "Canel walk", t: 515 },
  { name: "Snake", t: 528 },
  { name: "Alf", t: 543 },
  { name: "Nae Nae", t: 553 },
  { name: "Gucci", t: 561 },
  { name: "Wrecking Shop", t: 572 },
  { name: "ATL Stomp", t: 584 },
  { name: "Happy Feet", t: 594 },
  { name: "Pepper Seed", t: 612 },
  { name: "Fly Girls", t: 629 },
  { name: "Packman", t: 640 },
  { name: "Steve Martin", t: 648 },
  { name: "Jerk", t: 658 },
  { name: "Cat Daddy", t: 665 },
  { name: "Dougie", t: 677 },
  { name: "New Edition", t: 687 },
  { name: "Sexy Walk", t: 696 },
  { name: "Bankhead Bounce", t: 706 },
  { name: "Get Sturdy", t: 715 },
  { name: "Hit dem folks", t: 725 },
  { name: "Fred Stanford", t: 732 },
  { name: "Kick step", t: 744 },
  { name: "Roller Skate", t: 756 },
  { name: "Milly Rock", t: 767 },
  { name: "Box Step", t: 776 },
  { name: "Harlem Shake", t: 784 },
  { name: "House Party", t: 793 },
  { name: "Reebok", t: 803 },
  { name: "Pop lock and drop it", t: 815 },
  { name: "Upstairs Downstairs", t: 823 },
  { name: "Kick Back", t: 833 },
  { name: "Shmoney", t: 843 },
  { name: "BK Bounce", t: 855 },
  { name: "Bobby Brown", t: 862 },
  { name: "ED lover", t: 872 },
  { name: "Chicken Noodle soup", t: 882 },
  { name: "Mike Tyson", t: 897 },
  { name: "Janet Jackson", t: 906 },
  { name: "Twist In", t: 914 },
  { name: "Stick N Roll", t: 924 },
  { name: "Jack in the Box", t: 931 },
  { name: "Smurf", t: 941 },
  { name: "Nasty", t: 954 },
  { name: "C Walk", t: 960 },
  { name: "Pump", t: 969 },
  { name: "Mary J Bligh", t: 980 },
  { name: "TLC", t: 999 },
  { name: "Fila", t: 1006 },
  { name: "Jump out It", t: 1019 },
  { name: "Bedrock", t: 1026 },
  { name: "Schoolcraft", t: 1039 },
  { name: "Hitchhiker", t: 1046 },
  { name: "Kid N Play", t: 1057 },
  { name: "Stanky Leg", t: 1066 },
  { name: "RockAway", t: 1076 },
  { name: "Doug E Fresh", t: 1085 },
  { name: "Flava Flav", t: 1095 },
  { name: "Biz Markie", t: 1115 },
  { name: "Heavy D", t: 1125 },
  { name: "Pin Drop", t: 1133 },
  { name: "James Brown", t: 1142 },
  { name: "Carnell Stomp", t: 1163 },
];

// 推算每段的 end（最後一個給個合理預設長度）
const MOVES = MOVE_TIMES.map((m, i) => ({
  name: m.name,
  start: m.t,
  end: i < MOVE_TIMES.length - 1 ? MOVE_TIMES[i + 1].t : m.t + 14,
}));

const moveListEl = document.getElementById("moveList");
const nowPlayingEl = document.getElementById("nowPlaying");

let ytPlayer = null;
let currentMove = null;
let loopTimer = null;

// 產生舞步按鈕
MOVES.forEach((move, idx) => {
  const btn = document.createElement("button");
  btn.className = "move-btn";
  btn.dataset.idx = idx;
  const mm = String(Math.floor(move.start / 60));
  const ss = String(move.start % 60).padStart(2, "0");
  btn.innerHTML = `<span class="move-name">${idx + 1}. ${move.name}</span><span class="move-time">${mm}:${ss}</span>`;
  btn.addEventListener("click", () => playMove(idx));
  moveListEl.appendChild(btn);
});

// 載入 YouTube IFrame API
(function loadYT() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
})();

// API 載入完成後的全域 callback
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("ytPlayer", {
    videoId: PRACTICE_VIDEO_ID,
    playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
    events: { onStateChange: onPlayerStateChange },
  });
}

function playMove(idx) {
  const move = MOVES[idx];
  currentMove = move;
  nowPlayingEl.textContent = `🔁 循環中：${idx + 1}. ${move.name}`;

  // 高亮目前選的按鈕
  Array.from(moveListEl.children).forEach((b, i) =>
    b.classList.toggle("active", i === idx)
  );

  if (!ytPlayer || !ytPlayer.loadVideoById) return;
  ytPlayer.loadVideoById({
    videoId: PRACTICE_VIDEO_ID,
    startSeconds: move.start,
    endSeconds: move.end,
  });
  startLoopWatch();
}

// 用輪詢確保播到段尾就跳回段首（比單純 loop 參數更可靠）
function startLoopWatch() {
  clearInterval(loopTimer);
  loopTimer = setInterval(() => {
    if (!ytPlayer || !currentMove || !ytPlayer.getCurrentTime) return;
    const tNow = ytPlayer.getCurrentTime();
    if (tNow >= currentMove.end - 0.25 || tNow < currentMove.start - 1) {
      ytPlayer.seekTo(currentMove.start, true);
    }
  }, 250);
}

function onPlayerStateChange(e) {
  // 影片因 endSeconds 結束時，跳回段首繼續循環
  if (e.data === YT.PlayerState.ENDED && currentMove) {
    ytPlayer.seekTo(currentMove.start, true);
    ytPlayer.playVideo();
  }
}

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
