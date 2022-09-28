let femmes = [
  {
    id: "1",
    img: "../assets/images/thamber-(1).png",
    nom: "Greta Thunberg",
    phrase: "Une militante écologiste suédoise",
    dateNaissance: "01/03/2003",
    hint1: "hint1",
    hint2: "hint2",
  },
  {
    id: "2",
    img: "../assets/images/anne.png",
    nom: "Anne Frank",
    phrase:
      "Une adolescente allemande connue pour avoir écrit un journal intime",
    dateNaissance: "06/12/1929",
    hint1: "hint1",
    hint2: "hint2",
  },
  {
    id: "3",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/260px-Rosaparks.jpg",
    nom: "Rosa Parks",
    phrase: "La mère du mouvement des droits civiques",
    dateNaissance: "02/04/1913",
    hint1: "hint1",
    hint2: "hint2",
  },
  {
    id: "4",
    img: "../assets/images/hatchepsut.png",
    nom: "Hatchepsout",
    phrase: "une reine de l'Égypte antique qui deviendra pharaon",
    dateNaissance: "1/1/1000",
    hint1: "hint1",
    hint2: "hint2",
  },
  {
    id: "5",
    img: "../assets/images/graceO.png",
    nom: "Grace O'Malley",
    phrase: "Une pirate irlandaise",
    dateNaissance: "01/01/1530",
  },

  {
    id: "6",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ann_Zingha.jpg/260px-Ann_Zingha.jpg",
    nom: "Njinga du Ndongo",
    phrase:
      " reine du royaume de Ndongo et du royaume de Matamba dans l'actuel Angola",
    dateNaissance: "01/01/1583 ",
    hint1: "hint1",
    hint2: "hint2",
  },
  {
    id: "7",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/NASA_human_computers_-_Katherine_Coleman_Goble_Johnson.jpg/170px-NASA_human_computers_-_Katherine_Coleman_Goble_Johnson.jpg",
    nom: "Katherine Johnson",
    phrase:
      " reine du royaume de Ndongo et du royaume de Matamba dans l'actuel Angola",
    dateNaissance: "08/26/1918 ",
    hint1: "hint1",
    hint2: "hint2",
  },

  {
    id: "8",
    img: "https://images.squarespace-cdn.com/content/v1/5cd9fda69d41495d2b2eb614/1591360447957-I666ER8FVOWYLOUF6XC5/neila.jpg",
    nom: "Pina Bausch",
    phrase: "une danseuse et chorégraphe allemande",
    dateNaissance: "07/27/1940 ",
    hint1: "hint1",
    hint2: "hint2",
  },

  {
    id: "9",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Coccinelle_%28cropped%29.jpg/300px-Coccinelle_%28cropped%29.jpg",
    nom: "Coccinelle",
    phrase: "C'est l'une des premières femmes trans connues du grand public.",
    dateNaissance: "08/23/1921 ",
    hint1: "hint1",
    hint2: "hint2",
  },

  {
    id: "10",
    img: "../assets/images/baya.png",
    nom: "Baya",
    phrase: "Peintre autodidacte algérienne, surréaliste et naïve, a inspiré Picasso et Matisse",
    dateNaissance: "12/12/1931 ",
    hint1: "hint1",
    hint2: "hint2",
  },

];

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
  // formateur.img -> pour obtenir l'image du formateur renseigné en paramètre
  // formateur.nom -> pour obtenir le nom du formateur renseigné en paramètre
  // formateur.dateNaissance -> pour obtenir la date de naissance du formateur renseigné en paramètre
  $("#mesCards").append(`
    
    <div class="property-card draggable card" year="${Date.parse(
      femmes.dateNaissance
    )}" id="maCard${femmes.id}" index ="${index}" draggable = 'true'">
                  
                  <div class="property-image">
                      <img src="${femmes.img}"/>
                      </div>
                      <div class="property-description">
                      <h2>${femmes.nom}</h2>
                      <p>${femmes.phrase}</p>
                      <!--<p>${femmes.dateNaissance}</p>-->
                      </div>
              
                  </div>
                  </div>
                 
                  `);
}

//drag and drop
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".dropZone");
let timeline = document.getElementById("timeLine");
let tries = 0;

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    draggable.classList.remove("wrong");
    draggable.classList.remove("right");

    // timeline.classList.remove("green");

    // mesCards.classList.remove("red");
  });
  draggable.addEventListener("dragend", (e) => {
    let elementBe = e.target.previousElementSibling
      ? parseInt(e.target.previousElementSibling.getAttribute("year"))
      : null;
    let elementTa = parseInt(e.target.getAttribute("year"));
    let elementAf = e.target.nextElementSibling
      ? parseInt(e.target.nextElementSibling.getAttribute("year"))
      : null;

    console.log(
      elementBe,
      elementAf,
      elementTa,
      elementTa < elementAf,
      elementTa > elementBe
    );

    if (elementBe === null || elementAf === null) {
      console.log("null value");
      if (
        (elementBe === null && elementTa < elementAf) ||
        (elementAf === null && elementTa > elementBe)
      ) {
        draggable.classList.remove("dragging");
        draggable.classList.remove("wrong");

        draggable.classList.add("right");
        tries = 0;
      } else {
        draggable.classList.remove("right");
        draggable.classList.add("wrong");
        triesHandler(draggable);
      }
    } else if (elementTa > elementBe && elementTa < elementAf) {
      console.log("in center");
      draggable.classList.remove("dragging");
      draggable.classList.remove("wrong");

      draggable.classList.add("right");
      tries = 0;
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

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

const openModal = function (hint) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const message = document.querySelector(".message");
  message.innerText = hint;
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

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
