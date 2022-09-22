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
      dateNaissance: "01/01/-1550",
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
      phrase: " reine du royaume de Ndongo et du royaume de Matamba dans l'actuel Angola",
      dateNaissance: "01/01/1583 ",
    },
    {
      id: "7",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/NASA_human_computers_-_Katherine_Coleman_Goble_Johnson.jpg/170px-NASA_human_computers_-_Katherine_Coleman_Goble_Johnson.jpg",
      nom: "Katherine Johnson",
      phrase: " reine du royaume de Ndongo et du royaume de Matamba dans l'actuel Angola",
      dateNaissance: "08/26/1918 ", 
    },
  ];
  for (let i = 0; i < femmes.length; i++) {
    CreerCard(femmes[i]);
  }
  
  function CreerCard(femmes) {
    // formateur.img -> pour obtenir l'image du formateur renseigné en paramètre
    // formateur.nom -> pour obtenir le nom du formateur renseigné en paramètre
    // formateur.dateNaissance -> pour obtenir la date de naissance du formateur renseigné en paramètre
    $("#mesCards").append(`
    <div class="center">
    <div class="property-card">
                  <div class="card" id="maCard${femmes.id}">
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