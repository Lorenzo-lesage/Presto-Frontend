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

// createIntervalCustom(100, autoNum, 50)
// createIntervalCustom(250, clientNum, 50)
// createIntervalCustom(30, accessoriNum, 200)


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

observer.observe(autoNum)



let cars = [
    {
        Marca: "Toyota",
        Modello: "Corolla",
        Prezzo: "28.000",
        img: "https://picsum.photos/200"
    },
    {
        Marca: "BMW",
        Modello: "Serie 3",
        Prezzo: "60.000",
        img: "https://picsum.photos/201"
    },
    {
        Marca: "Tesla",
        Modello: "Model 3",
        Prezzo: "60.000",
        img: "./media/tesla.png"
    },
    {
        Marca: "Volkswagen",
        Modello: "Golf",
        Prezzo: "35.000",
        img: "./media/golf.png"
    },
    {
        Marca: "Audi",
        Modello: "Q5",
        Prezzo: "70.000",
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
