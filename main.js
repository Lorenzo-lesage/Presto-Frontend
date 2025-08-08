let navbar = document.querySelector("#navbar")
let navbarBrand = document.querySelector("#navbar-brand")

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 0){
        navbar.classList.add("nav-scrolled") 
        navbarBrand.style.transform = `rotateZ(${window.scrollY}deg)`
    } else {
        navbar.classList.remove("nav-scrolled") 
        navbar.style.backgroundColor = "transparent"
    }
}) 

// BUTTON NAV COLLAPSE AT O Y
let buttonNav = document.querySelector("#buttonNav")

buttonNav.addEventListener("click", () => {
    // Controlla se la navbar ha la classe 'nav-scrolled'
    if (navbar.classList.contains("nav-scrolled") && scrollY === 0) {
        // Se la classe esiste, rimuovila
        navbar.classList.remove("nav-scrolled");
    } else {
        // Altrimenti, aggiungila
        navbar.classList.add("nav-scrolled");
    }
});

let autoNum = document.querySelector("#autoNum")
let clientNum = document.querySelector("#clientNum")
let accessoriNum = document.querySelector("#accessoriNum")


function createIntervalCustom(finalNumber, element, speed) {
    let counter = 0

    let intervalloCustom = setInterval(() =>{
        if(counter < finalNumber){
            counter++;
            element.innerHTML = `${counter} +`
        } else {
            clearInterval(intervalloCustom)
        }
    }, speed);
    
}

// OBSERVER

let isNotEntered = true
let observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {
        if(entry.isIntersecting && isNotEntered){
            createIntervalCustom(100, autoNum, 100);
            createIntervalCustom(250, clientNum, 50);
            createIntervalCustom(30, accessoriNum, 200);
            isNotEntered = false    
        }
    });
})

observer.observe(accessoriNum)

let cars = [
    {
        Marca: "Toyota",
        Modello: "Corolla",
        categoria: "Usato",
        Prezzo: 28000,
        img: "https://picsum.photos/200"
    },
    {
        Marca: "BMW",
        Modello: "Serie 3",
        categoria: "Usato",
        Prezzo: 60000,
        img: "https://picsum.photos/201"
    },
    {
        Marca: "Tesla",
        Modello: "Model 3",
        categoria: "elettrico",
        Prezzo: "60000",
        img: "data:image/jpeg;base64,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"
    },
    {
        Marca: "Volkswagen",
        Modello: "Golf",
        categoria: "Usato",
        Prezzo: 35000,
        img: "data:image/jpeg;base64,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"
    },
    {
        Marca: "Audi",
        Modello: "Q5",
        categoria: "Supercar",
        Prezzo: 70000,
        img: "./media/audi.png"
    }

]

let cardsWrapper  = document.querySelector("#cardsWrapper")

cars.forEach( (el, i) => {
    if(i >= cars.length - 3){
        let div = document.createElement("div")
        div.classList.add("col-12", "col-md-3")
        div.innerHTML = `
                           <div class="card-custom my-3 text-center">
                            <img src=${
                              el.img
                            } class="card-img-top img-last-cars" alt="...">
                            <div class="card-body d-flex justify-content-center align-items-center flex-column p-2">
                                <div class="d-flex justify-content-center align-items-baseline gap-2 border-bottom w-75 my-2 pb-1">
                                    <h5 class="card-title fw-bold   ">${el.Marca}</h5>
                                    <p class="card-text">${el.Modello}</p>
                                </div>
                                <div class="d-flex justify-content-around align-items-baseline gap-2 mb-2">
                                  <div class="border-1 border-black border rounded border-1 border-black px-2 py-1">
                                    <p class="card-text fw-bold">${el.categoria}</p>
                                  </div>
                                  <div class="border-1 border-black border rounded bg-black px-2 py-1">
                                    <p class="card-text fw-bold">€ ${Number(
                                      el.Prezzo
                                    ).toLocaleString("it-IT")}</p>
                                  </div>
                                </div>
                                <button class="elegant-btn" data-bs-toggle="modal" data-bs-target="#${el.Modello.replace(
                                  / /g,
                                  "-"
                                )}">Info</span></button>
                            </div>
                        </div>
        `
        cardsWrapper.appendChild(div) 
    }
    
})

// CURSOR POINTER ON CARD CATEGORY
let boxCategory = document.querySelectorAll(".box-category");

boxCategory.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('custom-cursor'); // Aggiungi il cursore personalizzato
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('custom-cursor'); // Rimuovi il cursore personalizzato
    });
});

// SWIPER
const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
  });

  const swiper1 = new Swiper(".mySwiper1", {
    effect: "cards",
    grabCursor: true,
  });


//   STELLE
// Funzione per caricare le recensioni da un file JSON
function loadReviews() {
    fetch('reviews.json')
      .then(response => response.json())  // Parse del file JSON
      .then(reviews => {
        const reviewsContainer = document.getElementById('reviews-container');
        reviews.forEach(review => {
          const swiperSlide = document.createElement('div');
          swiperSlide.classList.add('swiper-slide');
          
          swiperSlide.innerHTML = `
                    <div class="review">
                        <div class="review-details p-lg-5">
                            <div class="d-flex align-items-center">
                                <h3>${review.nome} ${review.cognome}</h3>
                                <img src="${review.img}" alt="${review.nome} ${review.cognome}" class="reviewer-img">
                            </div>
                            <div class="stars">
                            ${generateStars(review.voto)}  <!-- Genera le stelle in base al voto -->
                            </div>
                            <p>${review.recensione}</p>
                        </div>
                    </div>
          `;
          
          reviewsContainer.appendChild(swiperSlide); // Aggiungi la slide al contenitore
        });
  
        // Inizializza il Swiper
        new Swiper('.swiper.mySwiper1', {
          effect: 'cards',  // Puoi personalizzare l'effetto dello Swiper come desideri
          grabCursor: true,
          slidesPerView: 1,  // Puoi modificare il numero di slide visibili per volta
        });
      })
      .catch(error => console.error('Errore nel caricamento delle recensioni:', error));
  }
  
  // Funzione per generare le stelle in base al voto
  function generateStars(voto) {
    const fullStars = Math.floor(voto);  // Numero di stelle piene
    const halfStar = voto % 1 !== 0;     // Verifica se c'è una mezza stella
    let starsHTML = '';
    
    // Stelle piene
    for (let i = 0; i < fullStars; i++) {
      starsHTML += `<span class="star selected">&#9733;</span>`; // stella piena
    }
    
    // Mezza stella (se presente)
    if (halfStar) {
      starsHTML += `<span class="star selected">&#9734;</span>`; // mezza stella
    }
    
    // Stelle vuote
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += `<span class="star">&#9734;</span>`; // stella vuota
    }
    
    return starsHTML;
  }
  
  // Carica le recensioni al caricamento della pagina
  document.addEventListener('DOMContentLoaded', loadReviews);
  
  

