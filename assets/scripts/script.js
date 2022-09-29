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
    img: "../assets/images/njinga.png",
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
    img: "../assets/images/pinabausch.png",
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
    phrase:
      "Peintre autodidacte algérienne, surréaliste et naïve, a inspiré Picasso et Matisse",
    dateNaissance: "12/12/1931 ",
    hint1: "hint1",
    hint2: "hint2",
  },

  {
    id: "11",
    img: "../assets/images/berthM.png",
    nom: "Berth Morisot",
    phrase:
      "une artiste peintre française",
    dateNaissance: "01/14/1841 ",
    hint1: "Cofondatrice et doyenne du mouvement d'avant-garde que fut l'impressionnisme",
    hint2: "Tournant le dos très jeune à l'enseignement académique, elle fonde avec Claude Monet, Auguste Renoir, Alfred Sisley, Camille Pissarro, Edgar Degas le groupe d'avant-garde les « Artistes Anonymes Associés »",
  },

  {
    id: "12",
    img: "../assets/images/sapho.png",
    nom: "Sapho",
    phrase:
      "Une poétesse grecque",
    dateNaissance: "01/01/1100 ",
    hint1: "Très célèbre durant l'Antiquité",
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
    <div class="property-card card" year="${Date.parse(
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
                  </div>
                 
                  `);
}

//drag and drop
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".dropZone");
let timeline = document.getElementById("timeLine");
let pile = document.getElementById("mesCards")
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
    let target = e.currentTarget;
    let elementBe = target.previousElementSibling
      ? parseInt(target.previousElementSibling.getAttribute("year"))
      : null;
    let elementTa = parseInt(target.getAttribute("year"));
    let elementAf = target.nextElementSibling
      ? parseInt(target.nextElementSibling.getAttribute("year"))
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

$(document).ready(function () {
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
