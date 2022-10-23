"use strict";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

//cards creation from data in fammes array

function CreerCard(femmes, index) {
  let date = new Date(femmes.dateNaissance);
  let year = femmes.displayYear ? femmes.displayYear : date.getFullYear();
  const folder = "assets/images/";

  $("#mesCards").append(`
  
    <div class="draggable" index ="${index}" year="${Date.parse(
    femmes.dateNaissance
  )}">

  <div class="dateDiv">${year}</div>
    <div class="property-card carte" year="${Date.parse(
      femmes.dateNaissance
    )}" id="maCard${femmes.id}" index ="${index}" draggable = 'true'">
                  
                  <div class="property-image">
                      <img draggable="false" src="${folder + femmes.img}"/>
                      </div>
                      <div class="property-description">
                      <h2>${femmes.nom}</h2>
                      <p>${femmes.phrase}</p>
                      </div>
              
                  </div>
                  </div>
                  </div>
                 
                  `);
}

//drag and drop
let draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".dropZone");
let timeline = document.getElementById("timeLine");
let pile = document.getElementById("mesCards");
let tries = 0;
let myModal;
let pulp = document.getElementById("pulp");
let bibli = document.getElementById("bibli");
let mesCards = document.getElementById("mesCards");
let gameEnd = document.getElementById("endGame");
let score;
let fullScore = femmes.length;

//scrol while drag over timeline

timeline.addEventListener("dragover", (e) => {
  if (e.clientX < 200) {
    slider.scrollLeft = slider.scrollLeft - 50;
  } else if (e.clientX > window.innerWidth - 200) {
    slider.scrollLeft = slider.scrollLeft + 50;
  } else {
    return;
  }
});

//drag

function handleCardDrop(target, draggable) {
  let yearBefore = target.previousElementSibling
    ? parseInt(target.previousElementSibling.getAttribute("year"))
    : null;
  let targetYear = parseInt(target.getAttribute("year"));
  let yearAfter = target.nextElementSibling
    ? parseInt(target.nextElementSibling.getAttribute("year"))
    : null;

  //logic of sorting card by chronologic order

  if (yearBefore === null || yearAfter === null) {
    timeline.classList.add("bold");
    document.querySelector("#line").classList.add("bold");
    // premier card
    if (
      //first card in the right place
      (yearBefore === null && targetYear < yearAfter) ||
      //last card in the right place
      (yearAfter === null && targetYear > yearBefore)
    ) {
      draggable.classList.remove("dragging", "wrong");

      draggable.classList.add("right");
      tries = 0;
      score += 1;

      checkEndGame();
    } else {
      //if it's wrong
      draggable.classList.remove("right");
      draggable.classList.add("wrong");
      triesHandler(draggable);
      checkEndGame();
    }
  } else if (targetYear > yearBefore && targetYear < yearAfter) {
    // between cards
    draggable.classList.remove("dragging", "wrong");
    draggable.classList.add("right");
    tries = 0;
    score += 1;
    checkEndGame();
  } else {
    draggable.classList.remove("right");
    triesHandler(draggable);
    checkEndGame();
  }
}

function init() {
  score = 0;
  timeline.innerHTML = "";
  mesCards.innerHTML = "";
  timeline.classList.remove("bold");
  document.querySelector("#line").classList.remove("bold");

  shuffle(femmes);
  for (let i = 0; i < femmes.length; i++) {
    CreerCard(femmes[i], i);
  }
  draggables = document.querySelectorAll(".draggable");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      draggable.classList.add("dragging");
      draggable.classList.remove("wrong");
      draggable.classList.remove("right");
    });

    draggable.addEventListener("dragend", (e) => {
      e.preventDefault();
      e.stopPropagation();
      let target = e.currentTarget;
      handleCardDrop(target, draggable);
    });
  });
}

///////////////////////////////////////////////:::
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientX);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

/////////////////////////////////////////////////////:
function getDragAfterElement(container, X) {
  const draggabeElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggabeElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const Offset = X - box.left - box.width / 2;
      if (Offset < 0 && Offset > closest.Offset) {
        return { Offset: Offset, element: child };
      } else {
        return closest;
      }
    },
    { Offset: Number.NEGATIVE_INFINITY }
  ).element;
}

//modaml - pulpette say somthing or end of the game

const modal = document.querySelector(".speechBubble");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelectorAll(".close-speechBubble");

const openModal = function (msg, buli) {
  pulp.classList.remove("stopSpeech");
  pulp.classList.add("speech");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const message = document.querySelector(".message");
  message.innerText = msg;
  if (buli) {
    modal.classList.add("rebonjour");
  } else {
    modal.classList.remove("rebonjour");
  }
};

const closeModal = function () {
  if (
    pulp.classList.contains("speech") ||
    !gameEnd.classList.contains("hidden") ||
    !bienVenue.classList.contains("hidden")
  ) {
    pulp.classList.remove("speech");
    pulp.classList.add("stopSpeech");
    gameEnd.classList.add("hidden");
    bienVenue.classList.add("hidden");
  }

  modal.classList.add("hidden");
  bibli.classList.add("hidden");
  gameEnd.classList.add("hidden");
  bienVenue.classList.add("hidden");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", () => {
  closeModal();
});
for (let index = 0; index < btnCloseModal.length; index++) {
  btnCloseModal[index].addEventListener("click", closeModal);
}

document.addEventListener("keydown", function (e) {
  if (
    (e.key === "Escape" && !modal.classList.contains("hidden")) ||
    !bibli.classList.contains("hidden")
  ) {
    closeModal();
  }
});

//wrong answer numbre of tries and clus

function triesHandler(card) {
  tries += 1;
  if (tries < 3) {
    let index = parseInt(card.getAttribute("index"));

    let hint = tries < 2 ? femmes[index].hint1 : femmes[index].hint2;
    document.getElementById("mesCards").prepend(card);
    openModal(hint, false);
  } else {
    document.querySelector(".lost").prepend(card);
    tries = 0;
  }
}

// scroll

const slider = document.querySelector("#timelineCont");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

window.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  slider.scrollLeft += evt.deltaY;
});

// check if there are more cards in the pille

function checkEndGame() {
  if (pile.childElementCount == 0) {
    //if not calling game over
    gameOver();
  } else {
  }
}

//end of the game - fireworks modal of end of the game with final score and play agin button

let myendGameModal = new bootstrap.Modal(document.getElementById("endGame"), {
  keyboard: false,
});

function gameOver() {
  fire();
  let canvas = document.querySelector("canvas");
  canvas.classList.remove("hidden");

  const xhr = new XMLHttpRequest();
  xhr.open("post", "http://localhost/herStoryGame/scores.php");
  const fd = new FormData();
  fd.append("userID", getCookie("userID"));
  fd.append("score", score);
  xhr.send(fd);

  xhr.onload = ({ target }) => {
    let scoreData = JSON.parse(target.responseText);
    let finalScore = document.getElementById("finalScore");
    finalScore.innerHTML = `<p>Bien Joué ${getCookie(
      "username"
    )}, </p>\n <P>Ton note finale est ${score}/${fullScore}.</P> \n <p>Tu as joué ${
      scoreData.numOfTims
    } fois.</p> \n<p> Ton note moyen est ${parseInt(scoreData.avarage)}.</p>`;
  };

  myendGameModal.show();
}

let logoutBtn = document.getElementById("logOut");
logoutBtn.addEventListener("click", () => {
  logOut();
});

let logOut = function () {
  setCookie("username", "", -1);
  restart();
  myendGameModal.hide();
  myModal.show();
};

let restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", () => {
  myendGameModal.hide();
  restart();
});
let startBtn = document.getElementById("startGame");
startBtn.addEventListener("click", () => {
  restart();
});

//text to speech

let speechFunction = function () {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "fr";

  let speekBtn = document.querySelectorAll("#talk");
  for (let index = 0; index < speekBtn.length; index++) {
    speekBtn[index].addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      speech.text = document.querySelector(".message").innerText;
      if (speechSynthesis.speak) {
        speechSynthesis.cancel();
      }
      if (!speechSynthesis.pending || !speechSynthesis.speaking) {
        window.speechSynthesis.speak(speech);
      }
    });
  }
};
speechFunction();

//userName cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    openModal("Rebonjour " + user, true);
  } else {
    myModal.show();
  }
}

//check form

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        event.preventDefault();
        form.classList.add("was-validated");
        // call ajax vers server php

        const xhr = new XMLHttpRequest();
        xhr.open("post", "http://localhost/herStoryGame/login.php");
        const fd = new FormData();
        fd.append("name", $("#formInputname").val());
        fd.append("nickname", $("#formInputNickname").val());
        xhr.send(fd);
        xhr.onload = ({ target }) => {
          let user = JSON.parse(target.responseText);
          if (user.id != -1) {
            myModal.hide();
            setCookie("username", $("#formInputNickname").val(), 2);
            setCookie("userID", user.id, 2);

            if (user.newUser) {
              let bienVenue = document.getElementById("bienVenue");
              if (bienVenue.classList.contains("hidden")) {
                bienVenue.classList.remove("hidden");
                overlay.classList.remove("hidden");
                document.querySelector("div.text").innerHTML = `<h3>Bonjour ${$(
                  "#formInputNickname"
                ).val()},</h3>\n <p>Bienvenue au "herStoryGame" le jeu pour conaitre les femmes qui ont changé l'histoire.</p>\n<p>Ce jeu se propose de dater les grandes femmes de l'histoire. Plus exactement de les positionner dans le temps par rapport à d'autres.</p>`;

                let btnStartGame = document.getElementById("startGame");
                btnStartGame.addEventListener("click", () => {});
              } else {
                bienVenue.classList.add("hidden");
                overlay.classList.add("hidden");
              }
            } else {
              document
                .querySelector(".speechBubble")
                .classList.add("rebonjour");
              openModal("Rebonjour " + user.nickname, true);
            }
          }
        };
      },
      false
    );
  });
})();

//start

//login modal

$(document).ready(function () {
  myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {
    keyboard: false,
  });
  checkCookie();

  score = 0;

  //animation of the bird

  $("#img7").on("mouseover", function () {
    let startLeft = $(this).css("left");
    let windowLeft = window.innerWidth;
    $(this).animate(
      {
        left: "-250px",
      },
      1300,
      function () {
        $(this).css("left", windowLeft + "px");
        $(this).animate({ left: startLeft }, 1300);
      }
    );
  });
});

//restart

function restart() {
  document.querySelector("canvas").classList.add("hidden");
  stopFire();
  closeModal();
  init();
}

init();
