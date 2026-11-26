// ====== SETTINGS ======
// Where signups are sent. Create a free form at https://formspree.io,
// then paste its endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
// Every signup arrives as { email, code } — that list is what you check
// codes against at the door on December 3.
const FORM_ENDPOINT = "";

// Protest start: Union Square, NYC — Dec 3, 12:00 PM New York time (EST = UTC-5).
const PROTEST_START = new Date("2026-12-03T12:00:00-05:00");
// ======================

// Countdown
(function countdown() {
  const els = ["d", "h", "m", "s"].map((k) => document.getElementById("cd-" + k));
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    let diff = Math.max(0, PROTEST_START - Date.now());
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5); diff -= h * 36e5;
    const m = Math.floor(diff / 6e4); diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    [d, h, m, s].forEach((v, i) => (els[i].textContent = pad(v)));
  }
  tick();
  setInterval(tick, 1000);
})();

// Random code, e.g. MSF-7KQ2-XW9P (no 0/O/1/I to avoid mix-ups at the door)
function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  const s = Array.from(bytes, (b) => chars[b % chars.length]).join("");
  return "MSF-" + s.slice(0, 4) + "-" + s.slice(4);
}

const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

const form = document.getElementById("signup");
const emailEl = document.getElementById("email");
const errEl = document.getElementById("err");
const btn = document.getElementById("submit");
const ticket = document.getElementById("ticket");

function showTicket(email, code) {
  document.getElementById("code").textContent = code;
  document.getElementById("ticket-email").textContent = email;
  form.hidden = true;
  ticket.hidden = false;
}

// Returning visitor on the same device: show their code again
const saved = store.get("misfits-ticket");
if (saved && saved.email && saved.code) showTicket(saved.email, saved.code);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errEl.textContent = "";
  const email = emailEl.value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errEl.textContent = "That email doesn't look right.";
    emailEl.focus();
    return;
  }

  const code = makeCode();
  btn.disabled = true;
  btn.textContent = "Signing up…";

  try {
    if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, code, event: "Misfits NYC — Dec 3" }),
      });
      if (!res.ok) throw new Error("Request failed");
    } else {
      console.warn("[Misfits] FORM_ENDPOINT is empty in app.js — signups are not being saved anywhere.");
    }
    store.set("misfits-ticket", { email, code });
    showTicket(email, code);
  } catch {
    errEl.textContent = "Couldn't sign you up. Check your connection and try again.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Sign up";
  }
});

document.getElementById("copy").addEventListener("click", async (e) => {
  const code = document.getElementById("code").textContent;
  try {
    await navigator.clipboard.writeText(code);
    e.target.textContent = "Copied ✓";
    setTimeout(() => (e.target.textContent = "Copy code"), 1800);
  } catch {}
});

// Copy donation wallet addresses
document.querySelectorAll("[data-copy]").forEach((b) => {
  b.addEventListener("click", async () => {
    const text = document.getElementById(b.dataset.copy).textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      b.textContent = "Copied ✓";
      setTimeout(() => (b.textContent = "Copy"), 1800);
    } catch {}
  });
});
