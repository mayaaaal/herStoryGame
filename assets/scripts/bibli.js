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
        <h4>${femmes.nom}</h4>
        <h5>${year}</h5>
        <div id="textContainer">
        <p>${femmes.bibli}</p>
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
