/* DOM Content Functions */
const getWeddingData = async() => {
  try {
    const response = await fetch("data/wedding-content.json");
    const data = await response.json();

    return data;
  } 
  catch (error) {
    console.error("Failed to load JSON:", error);
  }
}

const setContentData = (target, attrib, data) => {
  document.querySelectorAll(`[data-content="${target}"]`)
    .forEach(element => {

      // direct HTML content
      if (attrib === "innerHTML" || attrib === "textContent" || attrib === "value") {
        element[attrib] = data;
        return;
      }

      // element attribute
      element.setAttribute(attrib, data);
    });
}

/* clean hashtag for URL safety */
const normalizeHashtag = (hashtag) => {
  const cleaned = hashtag.replace(/[^a-zA-Z0-9]/g, "");
  return cleaned || "ourwedding";
};


/* preloading images */
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = reject;

    img.src = src;
  });
};

/* force browser to replace image cache */
const recacheImages = (currentVersion) => {
  const allImages = document.querySelectorAll("img");
  allImages.forEach((img) => {
    const url = new URL(img.src, window.location.href);
    url.searchParams.set("v", currentVersion);
    img.src = url.toString();
  });
};

/* Load images in gallery base on max with photo_{num}.jpg format */
const loadGalleryImages = async (maxImages) => {
  const container = document.querySelector('[data-content="gallery-container"]');

  const promises = [];
  for (let i = 1; i <= maxImages; i++) {
    const src = `images/gallery/photo_${i}.jpg`;
    promises.push(preloadImage(src));
  }

  // insert gallery to photo gallery section
  const images = await Promise.allSettled(promises);
  images.forEach((result) => {
    if (result.status === "fulfilled") {
      const img = result.value;

      img.alt = "Wedding gallery photo";

      const div = document.createElement("div");
      div.className = "img-box image-frame";

      div.appendChild(img);
      container.appendChild(div);
    }
  });
};

/* Set wedding date at main hero and footer hero */
const setWeddingDate = (weddingDate) => {
  const date = new Date(weddingDate);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long", }).format(date);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();


  setContentData("wedding-date", "innerHTML", `${monthName} ${day}, ${year}`);
  setContentData("wedding-month", "innerHTML", `${month}`);
  setContentData("wedding-day", "innerHTML", `${day}`);
  setContentData("wedding-year", "innerHTML", `${year}`);
}

/* Set hastags to social media links */
const setSocialHashtag = (hashtag) => {
  const normalized = normalizeHashtag(hashtag);
  setContentData("official-hashtag", "innerHTML", `#${normalized}`);
  setContentData("social-facebook", "href", `https://www.facebook.com/hashtag/${encodeURIComponent(normalized)}`);
  setContentData("social-instagram", "href", `https://www.instagram.com/explore/tags/${encodeURIComponent(normalized)}`);
  setContentData("social-tiktok", "href", `https://www.tiktok.com/tag/${encodeURIComponent(normalized)}`);
  setContentData("social-x", "href", `https://x.com/hashtag/${encodeURIComponent(normalized)}`);
}

/* set wedding venues informaton and google map embed */
const setWeddingVenue = (weddingVenueData) => {
  const qrAPI = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=";

  weddingVenueData.forEach(venue => {
    setContentData(`${venue.type}-venue`, "innerHTML", venue.name);
    setContentData(`${venue.type}-qr`, "src", `${qrAPI}${encodeURIComponent(venue.map)}`);
    setContentData(`${venue.type}-date`, "innerHTML", venue.date);
    setContentData(`${venue.type}-time`, "innerHTML", venue.time);
    setContentData(`${venue.type}-location`, "innerHTML", venue.address);
    setContentData(`${venue.type}-map`, "href", venue.map);
    setContentData(`${venue.type}-map-embed`, "src", `${venue.map}&z=16&output=embed`);

  });
}

/* set wedding schedule */
const setWeddingSchedule = (scheduleData) => {
  const container = document.querySelector('[data-content="schedule-container"]');

  scheduleData.forEach(schedule => {
    const divItem = document.createElement("div");
    const divTime = document.createElement("div");
    const divContent = document.createElement("div");
    const title = document.createElement("h3");
    const content = document.createElement("p");

    divItem.className = "timeline-item";
    divTime.className = "timeline-time";
    divContent.className = "timeline-content";

    title.innerHTML = schedule.title;
    divTime.innerHTML = schedule.time;
    content.innerHTML = schedule.details;

    divContent.appendChild(title);
    divContent.appendChild(content);
    divItem.appendChild(divTime);
    divItem.appendChild(divContent);
    container.appendChild(divItem);
  });
}


/* set wedding attendance form RSVP */
const setRsvpForm = (formURL) => {
  const formatURL = formURL.split("/viewform")[0];
  setContentData("rsvp-form", "src", `${formatURL}/viewform?embedded=true`);
}

/* set RSVP deadline */
const setRsvpDeadline = (deadline) => {
  const date = new Date(deadline);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long", }).format(date);
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  setContentData("rsvp-deadline", "innerHTML", `${monthName} ${day}, ${year}`);
}

/* set FAQ section from json */
const setFAQ = (faqData) => {
  const container = document.querySelector('[data-content="faq-container"]');

  faqData.forEach(faq => {
    const div = document.createElement("div");
    const title = document.createElement("h3");
    const content = document.createElement("p");

    div.className = "faq-card";
    title.innerHTML = faq.question;
    content.innerHTML = faq.answer;

    div.appendChild(title);
    div.appendChild(content);
    container.appendChild(div);
  })
}


/* set Spotify embeded playlist */
const setSpotifyPlaylist = (playlist) => {
  setContentData("spotify-playlist-link", "href", playlist);
  setContentData("spotify-playlist", "src", playlist);
}

/* Wedding Entourage */

/* set wedding couple*/
const setWeddingCouple = (groomName, brideName) => {
  document.title = `${groomName} & ${brideName} Wedding`;
  setContentData("wedding-groom", "innerHTML", groomName);
  setContentData("wedding-bride", "innerHTML", brideName);
}

/* set wedding official*/
const setCeremonyOfficial = (officialName) => {
  setContentData("ceremony-official", "innerHTML", officialName);
}

/* set groom/bride family*/
const setWeddingFamily = (familyData) => {
  setContentData("groom-father", "innerHTML", familyData.groom.father);
  setContentData("groom-mother", "innerHTML", familyData.groom.mother);
  setContentData("bride-father", "innerHTML", familyData.bride.father);
  setContentData("bride-mother", "innerHTML", familyData.bride.mother);
}

/* set princial sponsor */
const setPrincipalSponsor = (sponsorData) => {
  const container = document.querySelector('[data-content="sponsors-list"]');

  sponsorData.forEach(sponsor => {
    const div = document.createElement("div");

    div.classList = "sponsor-item";
    div.innerHTML = sponsor;
    container.appendChild(div);
  });

}

const setWeddingParty = (weddingPartyData) => {
  Object.keys(weddingPartyData).forEach(key => {
      setContentData(`${key}-main`, "innerHTML", weddingPartyData[key].main);

      const container = document.querySelector(`[data-content="${key}-attendant"]`);
      weddingPartyData[key].members.forEach(attendant => {
        const div = document.createElement("div");
        div.className = "party-item";
        div.innerHTML = attendant;
        container.appendChild(div);
      });
    });
}

const setCeremonySponsor = (ceremonySponsorData) => {
  const container = document.querySelector('[data-content="ceremony-sponsors"]');
  ceremonySponsorData.forEach(sponsor => {
    const div = document.createElement("div");
    const small = document.createElement("small");

    div.className = "entourage-card";
    small.innerHTML = sponsor.role;
    div.appendChild(small);

    sponsor.people.forEach(person => {
      const h3 = document.createElement("h3");
      h3.innerHTML = person;
      div.appendChild(h3);
    });

    container.appendChild(div);
  });
}

/* Run on DOMContentLoaded*/
document.addEventListener("DOMContentLoaded", async () => {

  const weddingData = await getWeddingData();
  // image cache version
  // recacheImages("51820261");

  /* Wedding Persons */
  setWeddingCouple(weddingData.groom, weddingData.bride);

  /* Ceremony Official */
  setCeremonyOfficial(weddingData.officiant);

  /* Groom's/Bride's Family */
  setWeddingFamily(weddingData.family);

  /* Principal Sponsor */
  setPrincipalSponsor(weddingData.sponsors.principal);

  /* Wedding Party */
 setWeddingParty(weddingData.party);

  /* Ceremory Sponsor */
  setCeremonySponsor(weddingData.sponsors.ceremony);

  /* Wedding Date */
  setWeddingDate(weddingData.weddingDate);

  /* RSVP Deadline */
  setRsvpDeadline(weddingData.rsvpDeadline);

  /* Wedding Details */
  setWeddingVenue(weddingData.venue);
 
  /* Wedding Schedule */
  setWeddingSchedule(weddingData.schedule);

  /* RSVP Google Form */
  setRsvpForm(weddingData.rsvpFormUrl);

  /* Frequently Ask Question */
  setFAQ(weddingData.faq);

  /* Social Media Hashtags */
  setSocialHashtag(weddingData.hashtag);

  /* Spotify Playlist */
  setSpotifyPlaylist(weddingData.spotifyUrl);

  /* Load Photo Gallery */
  await loadGalleryImages(6);

  /* Display Website */
  document.body.classList.remove("hidden");

  /* Initiate Animaton GSAP*/
  initAnimation();

});