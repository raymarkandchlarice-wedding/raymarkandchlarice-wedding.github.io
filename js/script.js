/* MOBILE MENU */
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

/* CLOSE MENU ON LINK CLICK */
document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });

});

/* COUNTDOWN TIMER */
const weddingDate = new Date("June 21, 2026 00:00:00").getTime();
const countdownEl = document.querySelector(".countdown");
const finishedEl = document.querySelector(".countdown-finished");

function updateCountdown() {

  const now = Date.now();
  const gap = weddingDate - now;

  if (gap <= 0) {
    countdownEl.classList.add("hidden");
    finishedEl.classList.remove("hidden");
    return;
  }

  countdownEl.classList.remove("hidden");
  finishedEl.classList.add("hidden");

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(gap / day);
  const hours = Math.floor((gap % day) / hour);
  const minutes = Math.floor((gap % hour) / minute);
  const seconds = Math.floor((gap % minute) / second);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

}

setInterval(updateCountdown, 1000);

updateCountdown();

/* NAVBAR SCROLL EFFECT */
window.addEventListener("scroll", () => {

  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {

    navbar.style.background = "rgba(247,248,246,0.96)";
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";

  } else {

    navbar.style.background = "rgba(247,248,246,0.90)";
    navbar.style.boxShadow = "none";

  }

});


/* MAP */
const buttons = document.querySelectorAll(".map-btn");

const ceremonyMap = document.getElementById("ceremony-map");
const receptionMap = document.getElementById("reception-map");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    const type = btn.dataset.map;

    // update active button
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // swap full map wrappers
    ceremonyMap.classList.remove("active-map");
    receptionMap.classList.remove("active-map");

    if (type === "ceremony") {
      ceremonyMap.classList.add("active-map");
    } else {
      receptionMap.classList.add("active-map");
    }

  });
});