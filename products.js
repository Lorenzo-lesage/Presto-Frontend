let navbar = document.querySelector("#navbar");
let navbarBrand = document.querySelector("#navbar-brand");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("nav-scrolled");
    navbarBrand.style.transform = `rotateZ(${window.scrollY}deg)`;
  } else {
    navbar.classList.remove("nav-scrolled");
    navbar.style.backgroundColor = "transparent";
  }
});

// BUTTON NAV COLLAPSE AT O Y
let buttonNav = document.querySelector("#buttonNav");

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
fetch("./auto.json")
  .then((response) => response.json())
  .then((data, i) => {
    let carsWrapper = document.querySelector("#carsWrapper");
    function createCards(array) {
      carsWrapper.innerHTML = "";
      array.forEach((el) => {
        let div = document.createElement("div");
        div.classList.add("col-12", "col-lg-4", "col-md-6", "my-3");
        div.innerHTML = `
                        <div class="card-custom my-3 text-center">
                            <img src=${
                              el.img
                            } class="card-img-top img-last-cars" alt="...">
                            <div class="card-body d-flex justify-content-center align-items-center flex-column p-2">
                                <div class="d-flex justify-content-center align-items-baseline gap-2 border-bottom w-75 my-2 pb-1">
                                    <h5 class="card-title fw-bold">${el.Marca}</h5>
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
                        `;
        carsWrapper.appendChild(div);

        let modal = document.createElement("div");
        modal.classList.add("modal", "fade");
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("id", el.Modello.replace(/ /g, "-"));
        modal.innerHTML = `
            <div class="modal-dialog text-center">
                <div class="modal-content bg-s">
                <div class="modal-header">
                    <h5 class="modal-title">${el.Marca} ${el.Modello}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${el.categoria}</p>
                </div>
                <div class="modal-body">
                    <p>€ ${Number(el.Prezzo).toLocaleString("it-IT")}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="elegant-btn" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            `;
        document.body.appendChild(modal);
      });
    }
    createCards(data);

    // CREAZIONE CATEGORIE DINAMICHE
    let categoryWrapper = document.querySelector("#categoryWrapper");

    function setCategory() {
      let categories = data.map((el) => el.categoria);
      let uniqueCategories = [];
      categories.forEach((singolaCategoria) => {
        if (!uniqueCategories.includes(singolaCategoria)) {
          uniqueCategories.push(singolaCategoria);
        }
      });

      uniqueCategories.forEach((categoriaUnica) => {
        let div = document.createElement("div");
        div.classList.add("form-check");
        div.innerHTML = `
                             <input class="form-check-input" type="radio" name="flexRadioDefault" id=${categoriaUnica} >
                            <label class="form-check-label" for=${categoriaUnica}>
                                ${categoriaUnica}
                            </label>
            `;
        categoryWrapper.appendChild(div);
      });
    }

    setCategory();

    // FILTRO PER CATEGORIA
    let formCheckInputs = document.querySelectorAll(".form-check-input");

    function filterByCategory() {
      let radioBtns = Array.from(formCheckInputs);
      let btnChecked = radioBtns.find((radioBtn) => radioBtn.checked == true);
      if (btnChecked.id == "All") {
        return data;
      } else {
        let filtered = data.filter((el) => el.categoria == btnChecked.id);
        return filtered;
      }
    }

    formCheckInputs.forEach((radio) => {
      radio.addEventListener("input", () => {
        globalFilter();
      });
    });

    // CREAZIONE PREZZI DINAMICI
    let inputRangePrice = document.querySelector("#inputRangePrice");
    let labelPrice = document.querySelector("#labelPrice");

    function setMinMaxPrice() {
      let mapped = data.map((el) => el.Prezzo);
      let prezzoMassimo = Math.max(...mapped);
      let prezzoMinimo = Math.min(...mapped);
      inputRangePrice.max = prezzoMassimo;
      inputRangePrice.min = prezzoMinimo;
      inputRangePrice.value = prezzoMassimo;
      labelPrice.innerHTML =
        Number(prezzoMassimo).toLocaleString("it-IT") + " €";
    }

    setMinMaxPrice();

    // FILTRO PER PREZZO
    function filterByPrice(array) {
      let filtered = array.filter((el) => el.Prezzo <= inputRangePrice.value);
      return filtered;
    }

    inputRangePrice.addEventListener("input", () => {
      labelPrice.innerHTML =
        Number(inputRangePrice.value).toLocaleString("it-IT") + " €";
      globalFilter();
    });

    // FILTRO PER BRAND
    let inputWord = document.querySelector("#inputWord");

    function filterByBrand(array) {
      let filtered = array.filter((el) =>
        el.Marca.toLowerCase().includes(inputWord.value.toLowerCase())
      );
      return filtered;
    }

    inputWord.addEventListener("input", () => {
      globalFilter();
    });

    let cres = document.querySelector("#cres");
    let decres = document.querySelector("#decres");

    cres.addEventListener("click", () => {
      globalFilter("cres");
    });
    decres.addEventListener("click", () => {
      globalFilter("decres");
    });

    // GLOBAL FILTER
    function globalFilter(string) {
      let risultatoFiltroPerCategori = filterByCategory();
      let risultatoFiltroPerPrezzo = filterByPrice(risultatoFiltroPerCategori);
      let risultatoFiltroPerBrand = filterByBrand(risultatoFiltroPerPrezzo);
      if (string == "cres") {
        createCards(
          risultatoFiltroPerBrand.sort((a, b) => a.Prezzo - b.Prezzo)
        );
      } else {
        createCards(
          risultatoFiltroPerBrand.sort((a, b) => b.Prezzo - a.Prezzo)
        );
      }
    }

    globalFilter();
  });
