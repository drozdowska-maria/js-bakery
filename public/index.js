//document constans
const cookieButton = document.querySelector("#make-dough");
const cookieButtonWrapper = document.querySelector("#button-wrapper");
const progressBar = document.querySelector(".progress-bar");
const counterMadeDough = document.querySelector("#counter");
const flourAvailable = document.querySelector("#flour-available");
const doughTray = document.querySelector(".dough-wrapper");
const madeCookiesCounter = document.querySelector("#cookie-counter");
const ovenButton = document.querySelector("#buttonOven");
const cookiesInOven = document.querySelector("#cookies-in-oven");
const ovenWrapper = document.querySelector(".oven-wrapper");
const oven = document.querySelector(".oven");
const finishedCookiesCounter = document.querySelector(
  "#counter-finished-cookies"
);
const moneyEarnedContent = document.querySelector("#money-earned");
const flourButton = document.querySelector("#flour-button");

//variables
let amountOfFlour = 100;
let duration;
let isMaking = false;
let madeDough = 0;
let madeCookies = 0;
let ovenCookies = 0;
let finishedCookies = 0;
let moneyEarned = 0;

//sth
progressBar.style.width = "0px";

//function declaration
function startInterval() {
  isMaking = true;
  duration = setInterval(runProgressBar, 1000);
  cookieButton.textContent = "zatrzymaj lepienie";
}

function stopInterval() {
  clearInterval(duration);
  cookieButton.textContent = "ulep ciasto";
}

function runProgressBar() {
  if (progressBar.style.width === "0px") {
    reduceFlourAmount();
    if (isMaking === true) {
      progressBar.style.width = "100px";
    } else {
      progressBar.style.width = "0px";
    }
  } else if (progressBar.style.width === "100px") {
    progressBar.style.width = "200px";
  } else if (progressBar.style.width === "200px") {
    progressBar.style.width = "300px";
  } else if (progressBar.style.width === "300px") {
    progressBar.style.width = "400px";
    makeDough();
  } else if (progressBar.style.width === "400px") {
    progressBar.style.width = "0px";
  }
}

let dough = [{ size: "", elementWHTML: "" }];
function makeDough() {
  //counter
  madeDough++;
  counterMadeDough.textContent = `Liczba ulepionych ciastowych kul: ${madeDough}`;

  //creating piece of dough
  const pieceOfDough = createElement("div", "dough");
  doughTray.append(pieceOfDough);
  const X = makeCookies();
  pieceOfDough.addEventListener("click", X);
  //click event
}

//coookie counter update
function makeCookies() {
  let widthCookie = 60;
  let heightCookie = 60;

  function reduceCookieSize(event) {
    madeCookies++;
    ovenButton.disabled = false;
    widthCookie -= 3;
    heightCookie -= 3;
    madeCookiesCounter.textContent = `Liczba ulepionych ciastek: ${madeCookies}`;
    event.target.style.width = widthCookie + "px"; //odnosi sie do width ciastka konkretnego
    event.target.style.height = heightCookie + "px";
    if (widthCookie == 0 && heightCookie == 0) {
      madeDough -= 1;
      event.target.remove();
      counterMadeDough.textContent = `Liczba ulepionych ciastowych kul: ${madeDough}`;
    } else if (document.querySelector("#cookie-alert")) {
      document.querySelector("#cookie-alert").remove();
    }
  }

  return reduceCookieSize;
}

function updateFlourAvailable() {
  flourAvailable.textContent = `Ilość mąki: ${amountOfFlour}kg`;
}
updateFlourAvailable();

function reduceFlourAmount() {
  if (amountOfFlour >= 10) {
    amountOfFlour -= 10;
    flourAvailable.textContent = `Ilość mąki: ${amountOfFlour}kg`;
    //buttonCookie.removeAttribute('disabled')
  } else {
    stopInterval();
    isMaking = false;
    cookieButton.setAttribute("disabled", "");

    const flourAlert = createElement("span", "redalert");
    flourAlert.setAttribute("id", "flour-alert");
    cookieButtonWrapper.append(flourAlert);
    flourAlert.textContent = "za mało mąki";
  }
}

function createElement(element, createdClass) {
  let name = document.createElement(element);
  name.classList.add(createdClass);
  return name;
}

// ovenButton.disabled = false;

function bakeCookie() {
  if (madeCookies > 0 && ovenCookies < 9) {
    ovenButton.disabled = false;
    ovenCookies++;
    madeCookies--;
    madeCookiesCounter.textContent = `Liczba ulepionych ciastek: ${madeCookies}`;
    cookiesInOven.textContent = `Liczba ciastek w piecu: ${ovenCookies}/9`;
    const cookie = createElement("div", "cookie");

    const myTray = document.querySelector(`.oven-item[empty="true"]`);

    myTray.append(cookie);
    myTray.setAttribute("empty", "false");

    cookie.style.backgroundColor = "rgb(255, 223, 159)";
    const cookieDuration = setInterval(runCookieProgressColor, 3000);

    function runCookieProgressColor() {
      if (cookie.style.backgroundColor === "rgb(255, 223, 159)") {
        cookie.style.backgroundColor = "orange";
      } else if (cookie.style.backgroundColor === "orange") {
        cookie.style.backgroundColor = "brown";
      } else if (cookie.style.backgroundColor === "brown") {
        cookie.style.backgroundColor = "black";
      } else if (cookie.style.backgroundColor === "black") {
        clearInterval(cookieDuration);
        clearAlert();
        cookie.remove();
        myTray.setAttribute("empty", "true");
        ovenCookies--;
        if (madeCookies > 0) {
          ovenButton.disabled = false;
        }
        cookiesInOven.textContent = `Liczba ciastek w piecu: ${ovenCookies}/9`;
      }
    }

    cookie.addEventListener("click", function (event) {
      if (event.target.style.backgroundColor === "brown") {
        finishedCookies += 1;
        finishedCookiesCounter.textContent = `Liczba gotowych ciastek: ${finishedCookies}`;
      }

      event.target.remove();
      clearAlert();
      myTray.setAttribute("empty", "true");
      ovenCookies--;

      if (madeCookies > 0) {
        ovenButton.disabled = false;
      }
      cookiesInOven.textContent = `Liczba ciastek w piecu: ${ovenCookies}/9`;
      clearInterval(cookieDuration);
    });
  } else if (ovenCookies >= 9 || madeCookies === 0) {
    ovenButton.disabled = true;

    if (ovenCookies >= 9) {
      const ovenAlert = createElement("span", "redalert");
      ovenAlert.setAttribute("id", "oven-alert");
      ovenWrapper.append(ovenAlert);
      ovenAlert.textContent = "Piec jest pełen! :(";
    } else if (madeCookies === 0) {
      const cookieAlert = createElement("span", "redalert");
      cookieAlert.setAttribute("id", "cookie-alert");
      ovenWrapper.append(cookieAlert);

      cookieAlert.textContent =
        "Robiliśmy co w naszej mocy, ale mamy za mało ciastek";
    }
  }
}

function clearAlert() {
  if (document.querySelector("#oven-alert") && ovenCookies < 9) {
    document.querySelector("#oven-alert").remove();
  }
}

//button init
cookieButton.addEventListener("click", function () {
  if (isMaking === false) {
    startInterval();
  } else {
    stopInterval();
    isMaking = false;
  }
});

ovenButton.addEventListener("click", bakeCookie);

function buyCookie() {
  let randomCookiesNumber = Math.floor(Math.random() * 10) + 1;
  let randomTime = (Math.floor(Math.random() * 4) + 3) * 1000;
  if (randomCookiesNumber <= finishedCookies && finishedCookies > 0) {
    if (randomCookiesNumber <= 5) {
      moneyEarned = moneyEarned + randomCookiesNumber * 5;
    } else {
      moneyEarned = moneyEarned + randomCookiesNumber * 4;
    }

    finishedCookies -= randomCookiesNumber;
    moneyEarnedContent.textContent = `Zarobiliśmy: ${moneyEarned} PLN`;
    finishedCookiesCounter.textContent = `Liczba gotowych ciastek: ${finishedCookies}`;
  }

  setTimeout(buyCookie, randomTime);
}

buyCookie();

function updateFlour() {
  if (moneyEarned >= 50) {
    if (document.querySelector("#flour-alert")) {
      document.querySelector("#flour-alert").remove();
    }
    cookieButton.disabled = false;
    moneyEarned -= 50;
    amountOfFlour += 100;
    moneyEarnedContent.textContent = `Zarobiliśmy: ${moneyEarned} PLN`;
    flourAvailable.textContent = `Ilość mąki: ${amountOfFlour}kg`;
  }
}

flourButton.addEventListener("click", updateFlour);
