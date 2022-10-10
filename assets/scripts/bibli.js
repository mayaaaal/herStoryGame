function creerBiblioCard(femmes, index) {
  let date = new Date(femmes.dateNaissance);
  let year = date.getFullYear();
  const folder = "assets/images/";
  // formateur.img -> pour obtenir l'image du formateur renseigné en paramètre
  // formateur.nom -> pour obtenir le nom du formateur renseigné en paramètre
  // formateur.dateNaissance -> pour obtenir la date de naissance du formateur renseigné en paramètre
  $(".deck").append(`

  <div id="flipcard1" class="flip-container flipcard" index ="${index}" year="${Date.parse(
    femmes.dateNaissance
  )}">
  <div class="flipper">
    <div class="front">
      <div class="card b"><img src="${
        !femmes.img.includes("http") ? folder + femmes.img : femmes.img
      }"></div>
      <!-- front content -->
    </div>
    <div class="back">
      <div class="card k">
        <h4>${femmes.nom}</h4>
        <h5>${year}</h5>
        <p>${femmes.bibli}</p>
      </div>

      <!-- back content -->
    </div>
  </div>
</div>

<!-- flipcard end -->
</div>
          
                    `);
}

pulp.addEventListener("click", () => {
  for (let i = 0; i < femmes.length; i++) {
    creerBiblioCard(femmes[i], i);
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
    $(el).removeClass("hide");
  }, 900);
}
