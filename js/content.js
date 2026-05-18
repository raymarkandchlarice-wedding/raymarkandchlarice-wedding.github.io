/* Test JSON Data */
const faqData = [
  {
    "title": "What should I wear?",
    "content": "Dress code is semi-formal: polished, elegant, and comfortable."
  },
  {
    "title": "Can I bring a plus one?",
    "content": "Please bring the guest named on your invitation."
  },
  {
    "title": "Is parking available?",
    "content": "Yes, parking is available at both venues."
  },
  {
    "title": "Will food be served?",
    "content": "Yes, a full dinner and refreshments will be provided."
  },
  {
    "title": "Can I take photos?",
    "content": "Please feel free to capture moments with care and respect."
  },
  {
    "title": "What time should I arrive?",
    "content": "Please arrive 30 minutes early so we can begin together."
  }];

const scheduleData = [
  {
    "time": "2:00 PM",
    "title": "Ceremony",
    "description": "A meaningful ceremony surrounded by our closest family and friends."
  },
  {
    "time": "4:00 PM",
    "title": "Cocktail Hour",
    "description": "A relaxed gathering with drinks, light bites, and time to connect."
  },
  {
    "time": "6:00 PM",
    "title": "Reception",
    "description": "An evening of dinner, heartfelt speeches, and joyful celebration."
  }];

const principalSponsorData = [
  "Mr. Daniel A. Reyes",
  "Ms. Sophia B. Martinez",
  "Mr. Ethan C. Walker",
  "Mrs. Isabella D. Cruz",
  "Mr. Noah E. Bennett",
  "Ms. Charlotte F. Flores",
  "Mr. Liam G. Foster",
  "Mrs. Amelia H. Garcia",
  "Mr. Benjamin I. Hayes",
  "Ms. Mia J. Collins",
  "Mr. Lucas K. Brooks",
  "Mrs. Evelyn L. Turner"
];

const weddingPartyData = [{
  bestMan: {
    main: "Mr. Nathan A. Delgado",
    groomsman: [
      "Mr. Caleb B. Navarro",
      "Mr. Vincent B. Morales",
      "Mr. Julian C. Castillo"
    ]
  },

  maidOfHonor: {
    main: "Ms. Bianca A. Fernandez",
    bridesmaid: [
      "Ms. Ariana F. Villanueva",
      "Ms. Chloe G. Ramirez",
      "Ms. Samantha H. Ortega"
    ]
  }
}];

const ceremonySponsorData = {
  candle: [
    "Mr. Adrian A. Mendoza",
    "Ms. Claire B. Mendoza"
  ],

  cord: [
    "Mr. Vincent C. Ramirez",
    "Mrs. Sophia D. Ramirez"
  ],

  veil: [
    "Mr. Julian E. Navarro",
    "Ms. Bianca F. Navarro"
  ],

  ringBearer: [
    "Master Liam G. Torres"
  ],

  bibleBearer: [
    "Master Noah H. Castillo"
  ],

  coinBearer: [
    "Master Ethan I. Flores"
  ]
};

/* DOM Content Functions */
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
  const galleryContainer = document.querySelector('[data-content="gallery-container"]');

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
      galleryContainer.appendChild(div);
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
const setWeddingVenue = (type, venue, date, time, location, map) => {
  const qrAPI = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=";
  const encodedMap = encodeURIComponent(map);


  if(type === "ceremony") {
    setContentData("ceremony-venue", "innerHTML", venue);
    setContentData("ceremony-qr", "src", `${qrAPI}${encodedMap}`);
    setContentData("ceremony-date", "innerHTML", date);
    setContentData("ceremony-time", "innerHTML", time);
    setContentData("ceremony-location", "innerHTML", location);
    setContentData("ceremony-map", "href", map);
    setContentData("ceremony-map-embed", "src", `${map}&z=16&output=embed`);
  }

  if(type === "reception") {
    setContentData("reception-venue", "innerHTML", venue);
    setContentData("reception-qr", "src", `${qrAPI}${encodedMap}`);
    setContentData("reception-date", "innerHTML", date);
    setContentData("reception-time", "innerHTML", time);
    setContentData("reception-location", "innerHTML", location);
    setContentData("reception-map", "href", map);
    setContentData("reception-map-embed", "src", `${map}&z=16&output=embed`);
  }
}

/* set wedding schedule */
const setWeddingSchedule = (schedTitle, schedTime, schedContent) => {
  const schedContainer = document.querySelector('[data-content="schedule-container"]');
  const divItem = document.createElement("div");
  const divTime = document.createElement("div");
  const divContent = document.createElement("div");
  const title = document.createElement("h3");
  const content = document.createElement("p");

  divItem.className = "timeline-item";
  divTime.className = "timeline-time";
  divContent.className = "timeline-content";

  divTime.innerHTML = schedTime;
  title.innerHTML = schedTitle;
  content.innerHTML = schedContent;

  divContent.appendChild(title);
  divContent.appendChild(content);
  divItem.appendChild(divTime);
  divItem.appendChild(divContent);
  schedContainer.appendChild(divItem);
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
const setFAQ = (faqTitle, faqContent) => {
  const faqContainer = document.querySelector('[data-content="faq-container"]');

  const div = document.createElement("div");
  const title = document.createElement("h3");
  const content = document.createElement("p");

  div.className = "faq-card";
  title.innerHTML = faqTitle;
  content.innerHTML = faqContent;

  div.appendChild(title);
  div.appendChild(content);
  faqContainer.appendChild(div);

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
const setCeremonyOfficial = (officialsName) => {
  setContentData("ceremony-official", "innerHTML", officialsName);
}

/* set groom family*/
const setGroomFamily = (groomFather, groomMother) => {
  setContentData("groom-father", "innerHTML", groomFather);
  setContentData("groom-mother", "innerHTML", groomMother);
}

/* set bride family*/
const setBrideFamily = (brideFather, brideMother) => {
  setContentData("bride-father", "innerHTML", brideFather);
  setContentData("bride-mother", "innerHTML", brideMother);
}

/* set princial sponsor */
const setPrincipalSponsor = (sponsorName) => {
  const sponsorsContainer = document.querySelector('[data-content="sponsors-list"]');
  const div = document.createElement("div");

  div.classList = "sponsor-item";
  div.innerHTML = sponsorName;
  sponsorsContainer.appendChild(div);
}

const setWeddingPary = (type, name) => {
  if(type === "bestMan"){
    setContentData("best-man", "innerHTML", name);
    return;
  }

  if(type === "maidOfHonor"){
    setContentData("maid-of-honor", "innerHTML", name);
    return;
  }

  if(type === "groomsman"){
    const container = document.querySelector('[data-content="groomsman"]');
    const div = document.createElement("div");

    div.className = "party-item";
    div.innerHTML = name;
    container.appendChild(div);
  }

  if(type === "bridesmaid"){
    const container = document.querySelector('[data-content="bridesmaid"]');
    const div = document.createElement("div");

    div.className = "party-item";
    div.innerHTML = name;
    container.appendChild(div);
  }
}

const setCeremonySponsor = () => {

}

/* Run on DOMContentLoaded*/
document.addEventListener("DOMContentLoaded", async () => {

  // image cache version
  recacheImages("51820261");

  /* Wedding Persons */
  setWeddingCouple("Groom", "Bride");

  /* Ceremony Official */
  setCeremonyOfficial("Rev. FName A. LName");

  /* Groom's Family */
  setGroomFamily("Mr. Fname A. LName", "Mrs. Fname A. LName");

  /* Bride's Family */
  setBrideFamily("Mr. Fname A. LName", "Mrs. Fname A. LName");

  /* Principal Sponsor */
  principalSponsorData.forEach(sponsor => {
    setPrincipalSponsor(sponsor);
  });

  /* Wedding Party */
  weddingPartyData.forEach(role => {

    // generate bestman
    setWeddingPary("bestMan", role.bestMan.main);
    role.bestMan.groomsman?.forEach(groomsman => {
      setWeddingPary("groomsman", groomsman);
    });

    // generate maid of honors
    setWeddingPary("maidOfHonor", role.maidOfHonor.main);
    role.maidOfHonor.bridesmaid?.forEach(bridesmaid => {
      setWeddingPary("bridesmaid", bridesmaid);
    });
  });

  /* Wedding Date */
  setWeddingDate("05/19/2026");

  /* RSVP Deadline */
  setRsvpDeadline("05/26/2026");

  /* Wedding Details */
  setWeddingVenue(
    "ceremony",
    "St. Mary Church",
    "June 21, 2026",
    "2:00 PM",
    "123 Church Street, City Name",
    "https://www.google.com/maps?q=6.116338,125.171833"
  );
  setWeddingVenue(
    "reception",
    "Sunset Garden Hall",
    "June 21, 2026",
    "6:00 PM",
    "Sunset Avenue, City Name",
    "https://www.google.com/maps?q=6.116117402370895,125.18710124287222"
  );

  /* Wedding Schedule */
  scheduleData.forEach(sched => {
    setWeddingSchedule(sched.title, sched.time, sched.description);
  });

  /* RSVP Google Form */
  setRsvpForm("https://docs.google.com/forms/d/e/1FAIpQLSddunQoLP03Ui82aRpaxcbs5qL3nsDoKH2Y2cCFVmnOR7QxIQ/viewform?usp=header");

  /* Frequently Ask Question */
  faqData.forEach(faq => {
    setFAQ(faq.title, faq.content);
  });

  /* Social Media Hashtags */
  setSocialHashtag("ForeverPersonA&PersonB");

  /* Spotify Playlist */
  setSpotifyPlaylist("https://open.spotify.com/embed/playlist/54ZA9LXFvvFujmOVWXpHga");

  /* Load Photo Gallery */
  await loadGalleryImages(6);

  /* Display Website */
  document.body.classList.remove("hidden");

  /* Initiate Animaton GSAP*/
  initAnimation();

});