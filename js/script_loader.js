const SCRIPT_VERSION = "2.6.0";
const scripts = [
    "js/libs/gsap.min.js",
    "js/libs/scrollTrigger.min.js",
    `js/animation.min.js?v=${SCRIPT_VERSION}`,
    `js/script.min.js?v=${SCRIPT_VERSION}`,
    `js/listener.min.js?v=${SCRIPT_VERSION}`,
    `js/content.min.js?v=${SCRIPT_VERSION}`
];

const loadScripts = (index = 0) => {
    if(index >= scripts.length) {
        console.log("All scripts loaded");
        return;
    }

    const script = document.createElement("script");
    script.src = scripts[index];
    script.onload = () => loadScripts(index + 1);
    document.body.appendChild(script);
}

loadScripts();