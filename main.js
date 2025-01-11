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
        img: "./media/tesla.png"
    },
    {
        Marca: "Volkswagen",
        Modello: "Golf",
        categoria: "Usato",
        Prezzo: 35000,
        img: "./media/golf.png"
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

cars.forEach( (car, i) => {
    if(i >= cars.length - 3){
        let div = document.createElement("div")
        div.classList.add("col-12", "col-md-4")
        div.innerHTML = `
                            <div class="card-custom my-3 text-center">
                                <img src=${car.img} class="card-img-top img-last-cars" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title my-3">Marca: ${car.Marca}</h5>
                                    <p class="card-text">Modello: ${car.Modello}</p>
                                    <p class="card-text">Categoria: ${car.categoria}</p>
                                    <p class="card-text">Prezzo: $ ${car.Prezzo}</p>
                                    <button class="elegant-btn w-75">Acquista<span class="ms-2">></span></button>
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
  
  

