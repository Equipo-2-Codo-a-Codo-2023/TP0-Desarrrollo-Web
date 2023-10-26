let valorDolar=2;
let precioMoneda=localStorage.getItem('precioMoneda') || 1;

//API Request para la cotizacion del dolar a la fecha mas reciente
async function fetchData() {
    const url = 'https://api.bluelytics.com.ar/v2/latest';
    const options = { method: 'GET', headers: { Accept: 'application/json' } };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      const data= '';
      console.error(error);
      return data;
    }
  }


  //Cuando se carga el HTML se ejecuta la request de la cotizacion del dolar
  document.addEventListener('DOMContentLoaded', function() {
    //Llamado a la API para obtener la cotizacion del dolar blue
    const data= fetchData();
    //Seleccion de los datos relevantes que proporciona la API
    data.then((resultado) => {

        const blue = resultado.blue;
        const last_update = resultado.last_update;
        const compraBlue = blue.value_buy;

        valorDolar=compraBlue;
        console.log("CARGA API"); 
        console.log("valoDolar al iniciar API: ",valorDolar);
        console.log("precioMoneda al iniciar API: ",precioMoneda);
        //Parsear la fecha de actualizacion a formato visual correcto
    
        const fechaHoraObjeto = new Date(last_update);

        // Formatear la fecha y hora en otro formato
        const opcionesFormato = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
        };

        const fechaHoraFormateada = fechaHoraObjeto.toLocaleString("es-ES", opcionesFormato);

        const datosDolar = document.getElementById('dolarHoy');

        //Se incorpora el valor de compra del dolar blue y la ultima fecha de actualizacion a la seccion correspondiente en el nav
        datosDolar.innerHTML=`Dolar Blue: $${compraBlue} (${fechaHoraFormateada})`;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  

  //Botón de cerrar el form
  const closeBtn = document.getElementById('closeBtn');
  const helpCheckbox = document.getElementById('botonHelp');
  
  closeBtn.addEventListener('click', () => {
    helpCheckbox.checked = false;
  });

  function actualizarPrecioMoneda(precioNuevo) {
    precioMoneda = precioNuevo;
    localStorage.setItem('precioMoneda', precioMoneda);
    console.log('El precio de la moneda se ha actualizado a:', precioMoneda);
  }

  //-------------SELECTOR DE PRECIOS------------  
  
  const seleccionARS = document.getElementById('cambiarARS');
 
  // Agrega un event listener para el evento click
  seleccionARS.addEventListener('click', function(event){
      // Evita que el enlace se comporte como un enlace normal (navegando a la URL)
      event.preventDefault();
      if (precioMoneda!==1) {
        //precioMoneda=1;
        actualizarPrecioMoneda(1);}
      // Aquí puedes realizar acciones adicionales cuando el enlace es clickeado
      console.log("Moneda Cambiada a ARS: ", precioMoneda);
      location.reload();
  });

  const seleccionUSD = document.getElementById('cambiarUSD');
  // Agrega un event listener para el evento click
  seleccionUSD.addEventListener('click', function(event) {
      // Evita que el enlace se comporte como un enlace normal (navegando a la URL)
      event.preventDefault();
      if (precioMoneda!=valorDolar) { //precioMoneda=valorDolar;
        actualizarPrecioMoneda(valorDolar);}
      // Aquí puedes realizar acciones adicionales cuando el enlace es clickeado
      console.log("Moneda Cambiada a USD: ", precioMoneda);
      location.reload();
  });

  export var precioMoneda2=precioMoneda;
  console.log("Precio en scripts.js: ", precioMoneda);

/* controlador de apertura de mapa */

  const mapButton = document.querySelector(".map-btn")

  let countControler = 1

  mapButton.addEventListener("click",()=>{

    const divMap = document.querySelector(".mapa")

    if(countControler){
      divMap.style.display = "flex";
      mapButton.textContent = "Cerrar Ubicación";
      countControler = 0
    }else{
      divMap.style.display = "none";
      mapButton.textContent = "Abrir Ubicación"
      countControler = 1
      
    }

  })