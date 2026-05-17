/* Run on DOMContentLoaded*/
document.addEventListener("DOMContentLoaded", async() => {

  /* MOBILE MENU */
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    const isExpanded = nav.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(isExpanded));
  });

  /* CLOSE MENU ON LINK CLICK */
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
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

      if(type === "ceremony") {
        ceremonyMap.classList.add("active-map");
      } 
      else {
        receptionMap.classList.add("active-map");
      }

    });
  });


});