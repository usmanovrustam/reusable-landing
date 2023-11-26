var firebaseConfig = {
  apiKey: "AIzaSyA-J0eGLJbx8sLqC38GXyrZwRUtVfBv2ag",
  authDomain: "max-trusted.firebaseapp.com",
  projectId: "max-trusted",
  storageBucket: "max-trusted.appspot.com",
  messagingSenderId: "637918696194",
  appId: "1:637918696194:web:026cc515cc694bab45e81b",
  measurementId: "G-SZ18CX6LWS",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const menuContainer = document.querySelector(".menu__container");
const targetContainer = document.querySelector(".target__container");
const aboutContainer = document.querySelector(".aboud__data");

firestore
  .collection("about")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        const data = doc.data();
        document.querySelector(".section-title").textContent = data.title;
        document.querySelector(".about__description").textContent =
          data.description;
      } else {
        console.log("No such document!");
      }
    });
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
