const CONTENT_BUILD_VERSION = "6.30.26" //reache all

//Assets
const ICON_VERSION = "1.3.0";
const FONT_VERSION = "1.3.0";
const STYLE_VERSION = "1.3.0";

//HTML Fragments
const HTML_HEADER_VERSION = "1.3.0";
const HTML_MAIN_VERSION = "1.3.0";
const HTML_FOOTER_VERSION = "1.3.0";

const loadAssets = ({ rel, href, type }) => {
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");

        link.rel = rel;
        link.href = href;
        if(type) link.type = type;

        link.onload = resolve();
        link.onerror = reject();

        document.head.appendChild(link);
    });
}

const loadContentHTML = async (contentPath) => {
    const response = await fetch(contentPath);
    const html = await response.text();
    document.body.insertAdjacentHTML("beforeend", html);
}

const loadWebContent = async () => {
    await loadAssets({
        rel: "icon",
        href: `/assets/favicon.ico?v=${ICON_VERSION}&${CONTENT_BUILD_VERSION}`,
        type: "image/x-icon"
    });

    await loadAssets({
        rel: "stylesheet",
        href: `assets/fonts/fonts.min.css?v=${FONT_VERSION}&${CONTENT_BUILD_VERSION}`
    });

    await loadAssets({
        rel: "stylesheet",
        href: `css/style.min.css?v=${STYLE_VERSION}&${CONTENT_BUILD_VERSION}`
    });

    await loadContentHTML(`content/header.html?v=${HTML_HEADER_VERSION}&${CONTENT_BUILD_VERSION}`);
    await loadContentHTML(`content/main_content.html?v=${HTML_MAIN_VERSION}&${CONTENT_BUILD_VERSION}`);
    await loadContentHTML(`content/footer.html?v=${HTML_FOOTER_VERSION}&${CONTENT_BUILD_VERSION}`);

    console.log("Website content loaded");
}