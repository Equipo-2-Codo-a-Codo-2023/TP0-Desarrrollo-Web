import {kidsInformation} from "../../temporary-data-base/kids-products.js" 
import {cardConstructor, cleanElementsOf,refreshNumberCardsForPage} from "./card-constructor.js"

//Elekidstos del DOM

let kidsSlide = document.querySelector(".kids-slide")
let previouskidsSlide = document.querySelector(".kids-section-previous-slide-container")
let nextkidsSlide = document.querySelector(".kids-section-next-slide-container")

//Variables para Paginado

let numberCardsForPage = refreshNumberCardsForPage()
let totalPages = Math.floor(kidsInformation.length/numberCardsForPage) 
let actualPage = 0

//Funcion para Paginado

function addCards(pageNumber){
    
    let inicio = actualPage * numberCardsForPage
    let final = actualPage === totalPages? kidsInformation.length : inicio + numberCardsForPage

    for (let i = inicio; i < final; i++) {
        let newCard = cardConstructor(kidsInformation[i])
        kidsSlide.appendChild(newCard)    
    }
}

//Events Listener 

//--------- Primera Carga ----------
document.addEventListener('DOMContentLoaded', addCards(actualPage))

// Esta atento a cambios de viewporrt, actualiza y renderiza las cards correspondientes

window.addEventListener('resize', () => {
    numberCardsForPage = refreshNumberCardsForPage()
    cleanElementsOf(kidsSlide)
    addCards(actualPage)
})

//---------Cambios de Pagina --------

previouskidsSlide.addEventListener("click", function(){
    actualPage -= 1
    if(actualPage < 0) actualPage += 1;

    cleanElementsOf(kidsSlide)

    addCards(actualPage)
    }
)

nextkidsSlide.addEventListener("click", function(){
    actualPage += 1
    if(actualPage > totalPages) actualPage -= 1;

    cleanElementsOf(kidsSlide)

    addCards(actualPage)
    }
)