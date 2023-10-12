let moneda='ARS';
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
      return data;
      console.error(error);
    }
  }

  //Cuando se carga el HTML se ejecuta la request de la cotizacion del dolar
  document.addEventListener('DOMContentLoaded', function() {
    //Llamado a la API para obtener la cotizacion del dolar blue
    const data= fetchData();
    //Seleccion de los datos relevantes que proporciona la API
    moneda='ARS';
    data.then((resultado) => {

        const blue = resultado.blue;
        const last_update = resultado.last_update;
        const compraBlue = blue.value_buy;

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
        datosDolar.innerHTML=`Cotizacion Dolar Blue: $${compraBlue} (${fechaHoraFormateada})`;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

 
  var seleccionARS = document.getElementById("cambiarARS");

  // Agrega un event listener para el evento click
  seleccionARS.addEventListener("click", function(event) {
      // Evita que el enlace se comporte como un enlace normal (navegando a la URL)
      event.preventDefault();
      if (moneda!='ARS') {moneda='ARS'}
      // Aquí puedes realizar acciones adicionales cuando el enlace es clickeado
      console.log("Moneda Cambiada a {$moneda}");
  });

  var seleccionUSD = document.getElementById("cambiarUSD");

  // Agrega un event listener para el evento click
  seleccionUSD.addEventListener("click", function(event) {
      // Evita que el enlace se comporte como un enlace normal (navegando a la URL)
      event.preventDefault();
      if (moneda!='USD') {moneda='USD'}
      // Aquí puedes realizar acciones adicionales cuando el enlace es clickeado
      console.log("Moneda Cambiada a {$moneda}");
  });
  
  

  
//Clase Producto para tener productos hardcoded y simular la base de datos
//Product tiene los siguentes campos: nombre (string), descripcion(string), precio(number), imagen(string)
//Nota: imagen es el nombre de la imagen.jpg esto luego debera referirse cuando se utilice de forma visual en las cards para obtener la ruta completa de la imagen
class Product{
    constructor(nombre,descripcion,precio,imagen){
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.precio=precio;
        this.imagen=imagen;
    }
}

//Metodo que carga 4 productos predefinidos en un array
function PreLoadData(){
    const product1 = new Product("Product 1", "Description 1", 29.99, "nike_air.jpg");
    const product2 = new Product("Product 2", "Description 2", 39.99, "nike.jpg");
    const product3 = new Product("Product 3", "Description 3", 39.99, "vans.jpg");
    const product4 = new Product("Product 4", "Description 4", 39.99, "yellow.jpg");
    const productArray = [product1, product2,product3,product4];
    return productArray;
}
