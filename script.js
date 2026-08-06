/* ============================================================
   SCRIPT — password unlock + scroll reveal animations
   ============================================================ */

const PASSCODE = "03061988";

const SONGS = [
  { title: "Paraluman", spotifyUrl: "https://open.spotify.com/track/2jbf9EytR7fzpSrPWAYCf9" },
  { title: "Fix You", spotifyUrl: "https://open.spotify.com/track/7LVHVU3tWfcxj5aiPFEW4Q" },
  { title: "Change", spotifyUrl: "https://open.spotify.com/track/3ExweHKZF9B752DPQByRVT" },
  { title: "You Belong With Me", spotifyUrl: "https://open.spotify.com/track/1qrpoAMXodY6895hGKoUpA" }
];

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Soft floating particles ---------- */
  const particlesWrap = document.getElementById("particles");
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 6 + 3;
    p.style.width = p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.animationDelay = (Math.random() * 14) + "s";
    p.style.animationDuration = (12 + Math.random() * 8) + "s";
    particlesWrap.appendChild(p);
  }

  /* ---------- Password unlock ---------- */
  const lockScreen = document.getElementById("lock-screen");
  const pwInput = document.getElementById("pw-input");
  const pwSubmit = document.getElementById("pw-submit");
  const pwError = document.getElementById("pw-error");
  const mainContent = document.getElementById("main-content");

  function tryPassword() {
    if (pwInput.value.trim() === PASSCODE) {
      lockScreen.classList.add("hidden");
      setTimeout(() => {
        mainContent.style.display = "block";
        initReveal();
        initSongs();
      }, 500);
    } else {
      pwInput.classList.remove("shake");
      void pwInput.offsetWidth;
      pwInput.classList.add("shake");
      pwError.textContent = "That's not quite it. Please try again.";
      pwError.classList.add("show");
    }
  }
  pwSubmit.addEventListener("click", tryPassword);
  pwInput.addEventListener("keydown", (e) => { if (e.key === "Enter") tryPassword(); });

  /* ---------- Songs From My Heart ---------- */
  function initSongs() {
    const wrap = document.getElementById("song-list");
    SONGS.forEach(song => {
      const item = document.createElement("div");
      item.className = "song-item";
      item.innerHTML = `<span class="song-play">▶</span><span class="song-title">${song.title}</span>`;
      item.addEventListener("click", () => window.open(song.spotifyUrl, "_blank"));
      wrap.appendChild(item);
    });
  }

  /* ---------- Scroll reveal for sections ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
    }, { threshold: 0.2 });
    items.forEach(i => obs.observe(i));
  }
});
