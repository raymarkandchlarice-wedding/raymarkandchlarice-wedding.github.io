const ASSETS_VERSION = "1.3.0";
const HTML_VERSION = "1.3.0";

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
        href: `/assets/favicon.ico?v=${ASSETS_VERSION}`,
        type: "image/x-icon"
    });

    await loadAssets({
        rel: "stylesheet",
        href: `assets/fonts/fonts.min.css?v=${ASSETS_VERSION}`
    });

    await loadAssets({
        rel: "stylesheet",
        href: `css/style.min.css?v=${ASSETS_VERSION}`
    });

    await loadContentHTML(`content/header.html?v=${HTML_VERSION}`);
    await loadContentHTML(`content/main_content.html?v=${HTML_VERSION}`);
    await loadContentHTML(`content/footer.html?v=${HTML_VERSION}`);

    console.log("Website content loaded");
}