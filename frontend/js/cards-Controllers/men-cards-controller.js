import {menInformation} from "../../temporary-data-base/men-products.js"
import {cardConstructor, cleanElementsOf,refreshNumberCardsForPage} from "./card-constructor.js"

//Elementos del DOM

let menSlide = document.querySelector(".men-slide")
let previousMenSlide = document.querySelector(".men-section-previous-slide-container")
let nextMenSlide = document.querySelector(".men-section-next-slide-container")

//Variables para Paginado

let numberCardsForPage = refreshNumberCardsForPage()
let totalPages = Math.floor(menInformation.length/numberCardsForPage) 
let actualPage = 0

//Funcion para Paginado

function addCards(pageNumber){
    
    let inicio = actualPage * numberCardsForPage
    let final = actualPage === totalPages? menInformation.length : inicio + numberCardsForPage

    for (let i = inicio; i < final; i++) {
        let newCard = cardConstructor(menInformation[i])
        menSlide.appendChild(newCard)    
    }
}

//Events Listener 

//--------- Primera Carga ----------
document.addEventListener('DOMContentLoaded', addCards(actualPage))

// Esta atento a cambios de viewporrt, actualiza y renderiza las cards correspondientes

window.addEventListener('resize', () => {
    numberCardsForPage = refreshNumberCardsForPage()
    cleanElementsOf(menSlide)
    addCards(actualPage)
})

//---------Cambios de Pagina --------

previousMenSlide.addEventListener("click", function(){
    actualPage -= 1
    if(actualPage < 0) actualPage += 1;

    cleanElementsOf(menSlide)

    addCards(actualPage, menSlide)
    }
)

nextMenSlide.addEventListener("click", function(){
    actualPage += 1
    if(actualPage > totalPages) actualPage -= 1;

    cleanElementsOf(menSlide)

    addCards(actualPage, menSlide)
    }
)