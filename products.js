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


// FETCH PER JSON

fetch("./auto.json").then((response) => response.json()).then((data) => {

    let carsWrapper = document.querySelector("#carsWrapper")
    function createCards(array) {
    carsWrapper.innerHTML = ""
    array.forEach(el => {
        let div = document.createElement("div");
        div.classList.add("col-12","col-md-3","my-3");
        div.innerHTML=`
                        <div class="card-custom my-3 text-center">
                            <img src=${el.img} class="card-img-top img-last-cars" alt="...">
                            <div class="card-body">
                                <h5 class="card-title my-3">Marca: ${el.Marca}</h5>
                                <p class="card-text">Modello: ${el.Modello}</p>
                                <p class="card-text">Categoria: ${el.categoria}</p>
                                <p class="card-text">Prezzo: $ ${el.Prezzo}</p>
                                <button class="elegant-btn w-75">Acquista<span class="ms-2">></span></button>
                            </div>
                        </div>
                        `
        carsWrapper.appendChild(div);
    });

}
createCards(data)


    // CREAZIONE CATEGORIE DINAMICHE

    let categoryWrapper = document.querySelector("#categoryWrapper")

    function setCategory(){
        let categories =  data.map( (el) => el.categoria);
        let uniqueCategories = [];
        categories.forEach((singolaCategoria) => {
            if (!uniqueCategories.includes(singolaCategoria)){
                uniqueCategories.push(singolaCategoria)
            }
        })

        uniqueCategories.forEach((categoriaUnica) => {
            let div = document.createElement("div")
            div.classList.add("form-check")
            div.innerHTML=`
                             <input class="form-check-input" type="radio" name="flexRadioDefault" id=${categoriaUnica} >
                            <label class="form-check-label" for=${categoriaUnica}>
                                ${categoriaUnica}
                            </label>
            `
            categoryWrapper.appendChild(div)

        })
    }

    setCategory()

    // FILTRO PER CATEGORIA

    let formCheckInputs = document.querySelectorAll(".form-check-input")

    function filterByCategory() {
        let radioBtns = Array.from(formCheckInputs)
        let btnChecked = radioBtns.find((radioBtn) => radioBtn.checked == true)
        if (btnChecked.id == "All") {
            createCards(data)
        } else {
            let filtered = data.filter((el) => el.categoria == btnChecked.id)
            createCards(filtered)
        }
    }

    formCheckInputs.forEach( (radio) => {
        radio.addEventListener("input", ()=> {
            filterByCategory()
        })
    })


    // CREAZIONE PREZZI DINAMICI

    let inputRangePrice = document.querySelector("#inputRangePrice")
    let labelPrice = document.querySelector("#labelPrice")

    function setMinMaxPrice() {
        let mapped = data.map( (el) => el.Prezzo)
        let prezzoMassimo = Math.max(...mapped)
        let prezzoMinimo = Math.min(...mapped)
        inputRangePrice.max = prezzoMassimo
        inputRangePrice.min = prezzoMinimo
        inputRangePrice.value = prezzoMassimo
        labelPrice.innerHTML = prezzoMassimo

    }

    setMinMaxPrice()

    // FILTRO PER PREZZO

    function filterByPrice() {
        let filtered = data.filter((el) => el.Prezzo <= inputRangePrice.value) 
        createCards(filtered)   
    }
    

    inputRangePrice.addEventListener("input", () => {
        labelPrice.innerHTML = inputRangePrice.value
        filterByPrice()
    })

    // FILTRO PER BRAND

    let inputWord = document.querySelector("#inputWord")

    function filterByBrand() {
        let filtered = data.filter((el) => el.Marca.toLowerCase().includes(inputWord.value.toLowerCase()))
        createCards(filtered)
    }

    inputWord.addEventListener("input", () => {
        filterByBrand()
        console.log(inputWord.value)
    })


})
