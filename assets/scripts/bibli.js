function creerBiblioCard(femmes, index) {
  let date = new Date(femmes.dateNaissance);
  let year = date.getFullYear();
  const folder = "assets/images/";

  let anotherClass = "";
  if (index == 0) {
    anotherClass = "rotate1 hasShadow";
  } else if (index == 1) {
    anotherClass = "rotate2 hasShadow";
  } else if (index == 2) {
    anotherClass = "hasShadow";
  }

  // formateur.img -> pour obtenir l'image du formateur renseigné en paramètre
  // formateur.nom -> pour obtenir le nom du formateur renseigné en paramètre
  // formateur.dateNaissance -> pour obtenir la date de naissance du formateur renseigné en paramètre
  $(".deck").append(`

  <div id="flipcard1" class="flip-container flipcard ${anotherClass}" index ="${index}" year="${Date.parse(
    femmes.dateNaissance
  )}">
  <div class="flipper">
    <div class="front">
      <div class="card b"><img src="${folder + femmes.img}"></div>
      <!-- front content -->
    </div>
    <div class="back">
      <div class="card k">
      <button class="talk" cardID = '${index}'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
      <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
      <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
      <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
    </svg></button>
        <h4>${femmes.nom}</h4>
        <h5>${year}</h5>
        <div id="textContainer">
        <p class="message">${femmes.bibli}</p>
        </div>
      </div>

      <!-- back content -->
    </div>
  </div>
</div>

<!-- flipcard end -->
</div>
          
                    `);
}

let sortFemmes = [...femmes];
sortFemmes.sort(function (a, b) {
  if (a.nom < b.nom) {
    return 1;
  }
  if (a.nom > b.nom) {
    return -1;
  }
  return 0;
});

pulp.addEventListener("click", () => {
  document.querySelector(".deck").innerHTML = "";
  for (let i = 0; i < femmes.length; i++) {
    creerBiblioCard(sortFemmes[i], i);
  }

  let speechBibFunction = function () {
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "fr";

    let speekBtn = document.querySelectorAll(".card .talk");
    for (let index = 0; index < speekBtn.length; index++) {
      speekBtn[index].addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        speech.text =
          sortFemmes[parseInt(e.currentTarget.getAttribute("cardID"))].nom +
          "  " +
          sortFemmes[parseInt(e.currentTarget.getAttribute("cardID"))].bibli;
        if (speechSynthesis.speak) {
          speechSynthesis.cancel();
        }
        if (!speechSynthesis.pending || !speechSynthesis.speaking) {
          window.speechSynthesis.speak(speech);
        }
      });
    }
  };
  speechBibFunction();

  let flipers = document.getElementsByClassName("flipcard");

  for (let index = 0; index < flipers.length; index++) {
    flipers[index].addEventListener("click", (e) => {
      if ($(e.currentTarget).hasClass("flip")) {
        hide(e.currentTarget);
      } else {
        $(e.currentTarget).addClass("flip");
      }
    });
  }

  if (bibli.classList.contains("hidden")) {
    bibli.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else {
    bibli.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

//this.classList.toggle('flip');

function hide(el) {
  $(el).addClass("hide").removeClass("flip");
  setTimeout(function () {
    $(el).addClass("stayBack");
    let stayBackList = document.getElementsByClassName("stayBack");
    if (stayBackList.length === femmes.length) {
      for (const element of stayBackList) {
        element.classList.remove("stayBack");
      }
    }
    $(el).removeClass("hide");
  }, 900);
}
