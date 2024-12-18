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
            console.timeLog("ho terminato")
            clearInterval(intervalloCustom)
        }
    }, speed);
    
}

createIntervalCustom(100, autoNum, 50)
createIntervalCustom(250, clientNum, 50)
createIntervalCustom(30, accessoriNum, 200)