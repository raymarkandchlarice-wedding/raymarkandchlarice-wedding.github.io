/* DOM Content Functions */
const setSocialHashtag = (hashtag) => {
  const facebook = document.getElementById("facebook-social");
  const instagram = document.getElementById("instagram-social");
  const tiktok = document.getElementById("tiktok-social");
  const x = document.getElementById("x-social");

  facebook.setAttribute("href", `https://www.facebook.com/hashtag/${hashtag}`);
  instagram.setAttribute("href", `https://www.instagram.com/explore/tags/${hashtag}`);
  tiktok.setAttribute("href", `https://www.tiktok.com/tag/${hashtag}`);
  x.setAttribute("href", `https://x.com/hashtag/${hashtag}`);
}

/* Countdown Functions */
const getDate = async () => {
  try {
    const res = await fetch(
      "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Manila"
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.dateTime.slice(0, 23);
  }
  catch (error) { return null; }
}

const getTimeOffset = async () => {
  const apiDate = await getDate();
  if (!apiDate) return 0;
  return new Date(apiDate).getTime() - Date.now();
}

const updateCountdown = (weddingDate, timeOffset) => {
  const countdownEl = document.querySelector(".countdown");
  const finishedEl = document.querySelector(".countdown-finished");

  const now = new Date(Date.now() + timeOffset);
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


/* Run on DOMContentLoaded*/
document.addEventListener("DOMContentLoaded", async () => {

  /* Load social media hashtags */
  setSocialHashtag("Philippines");

  /* COUNTDOWN TIMER */
  const weddingDate = new Date("May 16, 2026 17:12:00").getTime();
  const timeOffset = await getTimeOffset();

  setInterval(() => { updateCountdown(weddingDate, timeOffset) }, 1000);
  updateCountdown(weddingDate, timeOffset);


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


  /* NAVBAR SCROLL EFFECT */
  window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
      navbar.style.background = "rgba(247,248,246,0.96)";
      navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
    }else {
      navbar.style.background = "rgba(247,248,246,0.90)";
      navbar.style.boxShadow = "none";
    }

  });


  /* MAP Event Listener */
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
});





