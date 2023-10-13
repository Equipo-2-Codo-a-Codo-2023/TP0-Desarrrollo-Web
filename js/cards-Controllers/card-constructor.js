import {precioMoneda2} from '../scripts.js';

console.log("precio Moneda de card-constructor : ",precioMoneda2);
let precioDolarProvisorio = precioMoneda2

export function cardConstructor(obj) {
    // Crear la section "card-container"
    let cardContainer = document.createElement("section");
    cardContainer.className = "card-container";
  
    // Crear el input "Agregar al carrito"
    let addCartInput = document.createElement("input");
    addCartInput.type = "checkbox";
    addCartInput.className = "add-cart-btn";
  
    let addCartLabel = document.createElement("label");
    addCartLabel.className = "add-cart-txt";

    let addCartImage = document.createElement("img");
    addCartImage.src = "./assets/add-cart.svg";
    addCartImage.alt = "Agregar al carrito";

    addCartLabel.appendChild(addCartImage);
  
    // Crear el input "Agregar a favoritos"
    let addLikeInput = document.createElement("input");
    addLikeInput.type = "checkbox";
    addLikeInput.className = "add-like-btn";
  
    let addLikeLabel = document.createElement("label");
    addLikeLabel.className = "add-like-txt";

    let addLikeImage = document.createElement("img");
    addLikeImage.src = "./assets/add-like.svg";
    addLikeImage.alt = "Agregar a favoritos";

    addLikeLabel.appendChild(addLikeImage);
  
    // Crear la div para la imagen de la tarjeta
    let cardImageDiv = document.createElement("div");
    cardImageDiv.className = "card-image";

    let cardImage = document.createElement("img");
    cardImage.src = obj.img;
    cardImage.alt = obj.imgAlt;

    cardImageDiv.appendChild(cardImage);
  
    // Crear la div para la información de la tarjeta
    let cardInfoDiv = document.createElement("div");
    cardInfoDiv.className = "card-info";

    let cardTitle = document.createElement("h3");
    cardTitle.className = "card-info-tittle";
    cardTitle.textContent = obj.brand;

    let cardDescription = document.createElement("p");
    cardDescription.className = "card-info-description";
    cardDescription.textContent = obj.description

    let cardPrice = document.createElement("p");
    cardPrice.className = "card-info-price";
    cardPrice.textContent = (obj.price/precioDolarProvisorio).toFixed(2);
  
    cardInfoDiv.appendChild(cardTitle);
    cardInfoDiv.appendChild(cardDescription);
    cardInfoDiv.appendChild(cardPrice);
  
    // Agregar todos los elementos al contenedor
    cardContainer.appendChild(addCartInput);
    cardContainer.appendChild(addCartLabel);
    cardContainer.appendChild(addLikeInput);
    cardContainer.appendChild(addLikeLabel);
    cardContainer.appendChild(cardImageDiv);
    cardContainer.appendChild(cardInfoDiv);

    return cardContainer
  }

export function cleanElementsOf(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

//Funcion para actualizar el numero de cards por slide segun el tamaño del viewport

export function refreshNumberCardsForPage(){
    let viewportWidth = window.innerWidth
    let numberCards=0

    if (viewportWidth < 767) numberCards = 4;
    if (viewportWidth >= 767 && viewportWidth < 1023) numberCards = 6;
    if (viewportWidth >= 1023  && viewportWidth < 1199) numberCards = 8;
    if (viewportWidth >= 1199) numberCards = 10;

    return numberCards
}

