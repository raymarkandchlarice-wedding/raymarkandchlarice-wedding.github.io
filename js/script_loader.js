const SCRIPT_BUILD_VERSION = "6.30.26" //reache all

//scripts version
const ANIMATION_VERSION = "2.6.0";
const SCRIPT_VERSION = "2.6.0";
const LISTENER_VERSION = "2.7.0";
const DATA_VERSION = "2.9.0";

const scripts = [
    "js/libs/gsap.min.js",
    "js/libs/scrollTrigger.min.js",
    `js/animation.min.js?v=${ANIMATION_VERSION}&${SCRIPT_BUILD_VERSION}`,
    `js/script.min.js?v=${SCRIPT_VERSION}&${SCRIPT_BUILD_VERSION}`,
    `js/listener.min.js?v=${LISTENER_VERSION}&${SCRIPT_BUILD_VERSION}`,
    `js/content.min.js?v=${DATA_VERSION}&${SCRIPT_BUILD_VERSION}`
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