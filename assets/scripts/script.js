let femmes = [
  {
    id: "1",
    img: "./assets/img/thamber-(1).png",
    nom: "Greta Thunberg",
    phrase: "Une militante écologiste suédoise",
    dateNaissance: "01/03/2003",
  },
  {
    id: "2",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Anne_Frank_passport_photo%2C_May_1942.jpg/1024px-Anne_Frank_passport_photo%2C_May_1942.jpg",
    nom: "Anne Frank",
    phrase:
      "Une adolescente allemande connue pour avoir écrit un journal intime",
    dateNaissance: "06/12/1989",
  },
  {
    id: "3",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/260px-Rosaparks.jpg",
    nom: "Rosa Parks",
    phrase: "La mère du mouvement des droits civiques",
    dateNaissance: "02/04/1913",
  },
  {
    id: "4",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/WLANL_-_koopmanrob_-_Maat-ka-Re_Hatsjepsoet_%28RMO%29.jpg/280px-WLANL_-_koopmanrob_-_Maat-ka-Re_Hatsjepsoet_%28RMO%29.jpg",
    nom: "Hatchepsout",
    phrase: "une reine de l'Égypte antique qui deviendra pharaon",
    dateNaissance: "1/1/1000",
  },
  {
    id: "5",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Grainne_Mhaol_Ni_Mhaille_Statue.jpg/260px-Grainne_Mhaol_Ni_Mhaille_Statue.jpg",
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
  },
  {
    id: "7",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/NASA_human_computers_-_Katherine_Coleman_Goble_Johnson.jpg/170px-NASA_human_computers_-_Katherine_Coleman_Goble_Johnson.jpg",
    nom: "Katherine Johnson",
    phrase:
      " reine du royaume de Ndongo et du royaume de Matamba dans l'actuel Angola",
    dateNaissance: "08/26/1918 ",
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
  CreerCard(femmes[i]);
}

function CreerCard(femmes) {
  // formateur.img -> pour obtenir l'image du formateur renseigné en paramètre
  // formateur.nom -> pour obtenir le nom du formateur renseigné en paramètre
  // formateur.dateNaissance -> pour obtenir la date de naissance du formateur renseigné en paramètre
  $("#mesCards").append(`
    
    <div class="property-card draggable card" year="${Date.parse(
      femmes.dateNaissance
    )}" id="maCard${femmes.id}" draggable = 'true'">
                  
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

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    timeline.classList.remove("green");

    mesCards.classList.remove("red");
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
        mesCards.classList.remove("red");

        timeline.classList.add("green");
      } else {
        document.getElementById("mesCards").prepend(draggable);
        timeline.classList.remove("green");
        mesCards.classList.add("red");
      }
    } else if (elementTa > elementBe && elementTa < elementAf) {
      console.log("in center");
      draggable.classList.remove("dragging");
      mesCards.classList.remove("red");

      timeline.classList.add("green");
    } else {
      console.log("no place");
      let mesCards = document.getElementById("mesCards");

      mesCards.prepend(draggable);
      timeline.classList.remove("green");

      mesCards.classList.add("red");
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
