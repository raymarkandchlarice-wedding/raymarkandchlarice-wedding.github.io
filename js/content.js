
/* DOM Content Functions */
const setContentData = (target, attrib, data) => {
  document.querySelectorAll(`[data-content="${target}"]`)
  .forEach(element => {

    // direct HTML content
    if(attrib === "innerHTML" || attrib === "textContent" || attrib === "value"){
      element[attrib] = data;
      return;
    }

    // element attribute
    element.setAttribute(attrib, data);
  });
}

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = reject;

    img.src = src;
  });
};

const loadGalleryImages = async(maxImages) => {
  const galleryContainer = document.querySelector('[data-content="gallery-container"]');
  
  const imagePromises = Array.from({ length: maxImages }, (_, index) => {
    const src = `images/gallery/photo_${index + 1}.jpg`;
    return preloadImage(src)
      .then(() => src)
      .catch(() => null);
  });

  const loadedImages = await Promise.all(imagePromises);

  loadedImages.forEach((src) => {
    if (!src) return;

    const div = document.createElement("div");
    div.className = "img-box image-frame";

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Wedding gallery photo";

    div.appendChild(img);
    galleryContainer.appendChild(div);
  });
}

const normalizeHashtag = (hashtag) => {
  const cleaned = hashtag.replace(/[^a-zA-Z0-9]/g, "");
  return cleaned || "ourwedding";
};

const setSocialHashtag = (hashtag) => {
  const normalized = normalizeHashtag(hashtag);
  setContentData("official-hashtag", "innerHTML", `#${normalized}`);
  setContentData("social-facebook", "href", `https://www.facebook.com/hashtag/${encodeURIComponent(normalized)}`);
  setContentData("social-instagram", "href", `https://www.instagram.com/explore/tags/${encodeURIComponent(normalized)}`);
  setContentData("social-tiktok", "href", `https://www.tiktok.com/tag/${encodeURIComponent(normalized)}`);
  setContentData("social-x", "href", `https://x.com/hashtag/${encodeURIComponent(normalized)}`);
}

const setWeddingVenue = async(type, venue, image, date, time, location, map) => {
  const qrAPI = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=";
  const encodedMap = encodeURIComponent(map);

  //preload image
  await preloadImage(image);

  if(type === "ceremony"){
    setContentData("ceremony-venue", "innerHTML", venue);
    setContentData("ceremony-image", "src", image);
    setContentData("ceremony-qr", "src", `${qrAPI}${encodedMap}`);
    setContentData("ceremony-date", "innerHTML", date);
    setContentData("ceremony-time", "innerHTML", time);
    setContentData("ceremony-location", "innerHTML", location);
    setContentData("ceremony-map", "href", map);
    setContentData("ceremony-map-embed", "src", `${map}&z=16&output=embed`);
  }

  if(type === "reception"){
    setContentData("reception-venue", "innerHTML", venue);
    setContentData("reception-image", "src", image);
    setContentData("reception-qr", "src", `${qrAPI}${encodedMap}`);
    setContentData("reception-date", "innerHTML", date);
    setContentData("reception-time", "innerHTML", time);
    setContentData("reception-location", "innerHTML", location);
    setContentData("reception-map", "href", map);
    setContentData("reception-map-embed", "src", `${map}&z=16&output=embed`);
  }
}

const setRsvpForm = (formURL) => {
  const formatURL = formURL.split("/viewform")[0];
  setContentData("rsvp-form", "src", `${formatURL}/viewform?embedded=true`);
}

const setSpotifyPlaylist = (playlist) => {
  setContentData("spotify-playlist-link", "href", playlist);
  setContentData("spotify-playlist", "src", playlist);
}


/* Run on DOMContentLoaded*/
document.addEventListener("DOMContentLoaded", async () => {
  try {

  //Data
  const ceremoneyLocation = "";
  const receptionLocation = "";

  // preload image

  /* Wedding Details */
  await setWeddingVenue(
    "ceremony",
    "St. Mary Church",
    "images/ceremony_venue.jpg",
    "June 21, 2026",
    "2:00 PM",
    "123 Church Street, City Name",
    "https://www.google.com/maps?q=6.116338,125.171833"
  );
  await setWeddingVenue(
    "reception",
    "Sunset Garden Hall",
    "images/reception_venue.jpg",
    "June 21, 2026",
    "6:00 PM",
    "Sunset Avenue, City Name",
    "https://www.google.com/maps?q=6.116117402370895,125.18710124287222"
  );

  /* RSVP Google Form */
  setRsvpForm("https://docs.google.com/forms/d/e/1FAIpQLSddunQoLP03Ui82aRpaxcbs5qL3nsDoKH2Y2cCFVmnOR7QxIQ/viewform?usp=header");

  /* Social Media Hashtags */
  setSocialHashtag("ForeverPersonA&PersonB");

  /* Gallery Images */
  await loadGalleryImages(20); // put image in images/gallery name format photo_{number}.jpg

  /* Spotify Playlist */
  setSpotifyPlaylist("https://open.spotify.com/embed/playlist/54ZA9LXFvvFujmOVWXpHga");

  /* Reveal Contents */
  } catch (error) {
    console.error("Content initialization error:", error);
  } finally {
    document.body.classList.remove("hidden");
    if (typeof initAnimation === "function") {
      initAnimation();
    }
  }
});