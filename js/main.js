var firebaseConfig = {
  apiKey: "AIzaSyCgXOGOK5tQD5VPcebOrl7QGZD4z7p9nxI",
  authDomain: "globalmove-landing.firebaseapp.com",
  projectId: "globalmove-landing",
  storageBucket: "globalmove-landing.appspot.com",
  messagingSenderId: "97621362657",
  appId: "1:97621362657:web:ebc698f0067cfd60ed34a0",
  measurementId: "G-K3DS3592NC"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const menuContainer = document.querySelector(".menu__container");
const targetContainer = document.querySelector(".target__container");
const aboutContainer = document.querySelector(".about__container");
const homeContainer = document.querySelector(".home__container");
const privacyContainer = document.querySelector(".privacy-content");

firestore.collection("privacy").doc("policy").get()
  .then((doc) => {
    if (doc.exists) {
      const privacyContent = doc.data().content;
      privacyContainer.innerHTML = privacyContent;
    } else {
      console.log("Privacy policy document does not exist");
    }
  })
  .catch((error) => {
    console.error("Error getting privacy policy document:", error);
  });

firestore
  .collection("about")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      aboutContainer.innerHTML = `
        <div class="about__data">
          <span class="section-subtitle about__initial">О нас</span>
          <h2 class="section-title about__initial">${data.title}</h2>
          <p class="about__description">${data.description}</p>
        </div>
        <img src="${data.image}" alt="" class="about__img" />
      `;
    });
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

firestore
  .collection("products")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const newMenuContent = document.createElement("div");
      newMenuContent.classList.add("menu__content");

      newMenuContent.innerHTML = `
      <img src="${data.img}" alt="" class="menu__img" />
      <br />
      <h3 class="menu__name">${data.heading}</h3>
      <span class="menu__detail">${data.description}</span>
    `;

      menuContainer.appendChild(newMenuContent);
    });
  });

firestore
  .collection("targets")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const newTargetContent = document.createElement("div");
      newTargetContent.classList.add("target__content");

      newTargetContent.innerHTML = `
         <img src="${data.img}" alt="" class="target__img" />
        <h3 class="target__title">${data.title}</h3>
        <p class="target__description">${data.description}</p>
    `;

      targetContainer.appendChild(newTargetContent);
    });
  });


firestore
  .collection("home")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();


      homeContainer.innerHTML = `
        <div class="home__data">
          <h1 class="home__title">${data.title}</h1>
          <h2 class="home__subtitle">${data.subtitle}</h2>
          <a href="#contact" class="button">Свяжитесь с нами</a>
        </div>
        <img src="${data.image}" alt="" class="home__img" />
      `;
    });
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

firestore
  .collection("contact")
  .doc("contact")
  .get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      const contactButton = document.querySelector(".contact__button a");
      contactButton.href = "mailto:" + data.email;
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

const footerDescription = document.querySelector(".footer__description");

firestore
  .collection("footer")
  .doc("description")
  .get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      footerDescription.textContent = data.description;
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

const footerSocialContainer = document.querySelector(".footer__content:nth-child(1) div");

firestore
  .collection("footer")
  .doc("social_media")
  .get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      footerSocialContainer.innerHTML = `
        <a href="${data.facebook}" class="footer__social"><i class="bx bxl-facebook"></i></a>
        <a href="${data.instagram}" class="footer__social"><i class="bx bxl-instagram"></i></a>
        <a href="${data.telegram}" class="footer__social"><i class="bx bxl-telegram"></i></a>
      `;
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

const footerAddressContainer = document.querySelector(".footer__content:nth-child(3) ul");

firestore
  .collection("footer")
  .doc("address")
  .get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      footerAddressContainer.innerHTML = `
          <li>${data.city}</li>
          <li>${data.street}</li>
          <li>${data.phone}</li>
          <li>${data.email}</li>
        `;
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");

  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

function scrollHeader() {
  const nav = document.getElementById("header");

  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");

  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

const sr = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 2000,
  reset: true,
});

sr.reveal(
  `.home__data, .home__img,
            .about__data, .about__img,
            .target__content, .menu__content,
            .app__data, .app__img,
            .contact__data, .contact__button,
            .footer__content`,
  {
    interval: 200,
  }
);
