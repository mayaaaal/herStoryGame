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

shuffle(femmes);
for (let i = 0; i < femmes.length; i++) {
  CreerCard(femmes[i], i);
}

function CreerCard(femmes, index) {
  let date = new Date(femmes.dateNaissance);
  let year = date.getFullYear();
  // formateur.img -> pour obtenir l'image du formateur renseigné en paramètre
  // formateur.nom -> pour obtenir le nom du formateur renseigné en paramètre
  // formateur.dateNaissance -> pour obtenir la date de naissance du formateur renseigné en paramètre
  $("#mesCards").append(`
  
    <div class="draggable" index ="${index}" year="${Date.parse(
    femmes.dateNaissance
  )}">
  <div class="dateDiv">${year}</div>
    <div class="property-card carte" year="${Date.parse(
      femmes.dateNaissance
    )}" id="maCard${femmes.id}" index ="${index}" draggable = 'true'">
                  
                  <div class="property-image">
                      <img draggable="false" src="${femmes.img}"/>
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
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".dropZone");
let timeline = document.getElementById("timeLine");
let pile = document.getElementById("mesCards");
let tries = 0;
let myModal;
let pulp = document.getElementById("pulp");

timeline.addEventListener("dragover", (e) => {
  console.log(e.clientX);
  if (e.clientX < 200) {
    slider.scrollLeft = slider.scrollLeft - 50;
  } else if (e.clientX > window.innerWidth - 200) {
    slider.scrollLeft = slider.scrollLeft + 50;
  } else {
    return;
  }
});

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    draggable.classList.add("dragging");
    draggable.classList.remove("wrong");
    draggable.classList.remove("right");

    // timeline.classList.remove("green");

    // mesCards.classList.remove("red");
  });

  draggable.addEventListener("dragend", (e) => {
    let target = e.currentTarget;
    let elementBe = target.previousElementSibling
      ? parseInt(target.previousElementSibling.getAttribute("year"))
      : null;
    let elementTa = parseInt(target.getAttribute("year"));
    let elementAf = target.nextElementSibling
      ? parseInt(target.nextElementSibling.getAttribute("year"))
      : null;

    // console.log(
    //   elementBe,
    //   elementAf,
    //   elementTa,
    //   elementTa < elementAf,
    //   elementTa > elementBe
    // );

    if (elementBe === null || elementAf === null) {
      // last or first card
      if (
        (elementBe === null && elementTa < elementAf) ||
        (elementAf === null && elementTa > elementBe)
      ) {
        draggable.classList.remove("dragging", "wrong");

        draggable.classList.add("right");
        tries = 0;
        checkEndGame();
      } else {
        draggable.classList.remove("right");
        draggable.classList.add("wrong");
        triesHandler(draggable);
      }
    } else if (elementTa > elementBe && elementTa < elementAf) {
      // between cards
      draggable.classList.remove("dragging", "wrong");

      draggable.classList.add("right");
      tries = 0;
      checkEndGame();
    } else {
      console.log("no place");
      let mesCards = document.getElementById("mesCards");

      draggable.classList.remove("right");

      triesHandler(draggable);
    }
  });
});
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

const modal = document.querySelector(".speechBubble");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-speechBubble");

const openModal = function (hint) {
  pulp.classList.remove("stopSpeech");
  pulp.classList.add("speech");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const message = document.querySelector(".message");
  message.innerText = hint;
};

const closeModal = function () {
  pulp.classList.remove("speech");
  pulp.classList.add("stopSpeech");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function triesHandler(card) {
  tries += 1;
  if (tries < 3) {
    let index = parseInt(card.getAttribute("index"));
    console.log(femmes[index]);
    let hint = tries < 2 ? femmes[index].hint1 : femmes[index].hint2;

    document.getElementById("mesCards").prepend(card);
    openModal(hint);
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
  console.log(walk);
});

function checkEndGame() {
  if (pile.childElementCount == 0) {
    gameOver();
  } else {
    console.log("check");
  }
}

function gameOver() {
  fire();
  let canvas = document.querySelector("canvas");
  canvas.classList.remove("hidden");
}

let speech = new SpeechSynthesisUtterance();
speech.lang = "fr";

document.querySelector("#talk").addEventListener("click", () => {
  speech.text = document.querySelector(".message").innerText;
  window.speechSynthesis.speak(speech);
});

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
    alert("Welcome again " + user);
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
        xhr.open('post', 'http://localhost/herStoryGame/login.php');
        const fd = new FormData();
        fd.append('name', $("#formInputname").val());
        fd.append('nickname', $("#formInputNickname").val());
        xhr.send(fd);
        xhr.onload = ({target}) => {
          if(target.responseText === "OK") {
            myModal.hide();
            setCookie("username", $("#formInputname").val(), 2);
          }
          else{
          
          }
        }
      },
      false
    );
  });
})();

//start

$(document).ready(function () {
  myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {
    keyboard: false,
  });
  checkCookie();

  $("#img7").on("mouseover", function () {
    let startLeft = $(this).css("left");
    let windowLeft = window.innerWidth;
    $(this).animate(
      {
        left: "-250px",
      },
      1300,
      function () {
        console.log("finished first animation");
        $(this).css("left", windowLeft + "px");
        $(this).animate({ left: startLeft }, 1300);
      }
    );
  });
});
