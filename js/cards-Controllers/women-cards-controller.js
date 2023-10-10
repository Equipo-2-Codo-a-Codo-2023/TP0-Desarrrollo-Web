import {womenInformation} from "../../temporary-data-base/women-products.js"
import {cardConstructor, cleanElementsOf, numberCardsForPage} from "./card-constructor.js"

//Elementos del DOM

let womenSlide = document.querySelector(".women-slide")
let previousWomenSlide = document.querySelector(".women-section-previous-slide-container")
let nextWomenSlide = document.querySelector(".women-section-next-slide-container")

//Variables para Paginado

let totalPages = Math.floor(womenInformation.length/numberCardsForPage) 
let actualPage = 0

//Funcion para Paginado

function addCards(pageNumber){
    
    let inicio = actualPage * numberCardsForPage
    let final = actualPage === totalPages? womenInformation.length : inicio + numberCardsForPage

    for (let i = inicio; i < final; i++) {
        let newCard = cardConstructor(womenInformation[i])
        womenSlide.appendChild(newCard)    
    }
}


//Events Listener 

//--------- Primera Carga ----------
document.addEventListener('DOMContentLoaded', addCards(actualPage))

//---------Cambios de Pagina --------

previousWomenSlide.addEventListener("click", function(){
    actualPage -= 1
    if(actualPage < 0) actualPage += 1;

    cleanElementsOf(womenSlide)

    addCards(actualPage)
    }
)

nextWomenSlide.addEventListener("click", function(){
    actualPage += 1
    if(actualPage > totalPages) actualPage -= 1;

    cleanElementsOf(womenSlide)
    
    addCards(actualPage)
    }
)