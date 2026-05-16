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


/* Run on DOMContentLoaded*/
document.addEventListener("DOMContentLoaded", async () => {

  /* Load social media hashtags */
  setSocialHashtag("Philippines");

});