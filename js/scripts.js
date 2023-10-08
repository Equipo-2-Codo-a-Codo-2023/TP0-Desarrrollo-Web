//API Request para la cotizacion del dolar a la fecha mas reciente
async function fetchData() {
    const url = 'https://dolarapi.com/v1/dolares/blue';
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
    const data= fetchData();
    console.log('El HTML se ha cargado completamente.');
    data.then((resultado) => {
        // Acceder a los datos dentro de la PromiseResult
        const datos = resultado; 
        const casa = datos.casa; 
        const compra = datos.compra; 
        const nombre = datos.nombre; 
        const venta = datos.venta; 
        const fechaActualizacion = datos.fechaActualizacion; 

        //Parsear la fecha de actualizacion a formato visual correcto

        // Crear un objeto Date a partir de la cadena
        const fechaHoraObjeto = new Date(fechaActualizacion);

        // Formatear la fecha y hora en otro formato
        const opcionesFormato = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
        };

        const fechaHoraFormateada = fechaHoraObjeto.toLocaleString("es-ES", opcionesFormato);

        // Ver lo enviado por la API
        console.log('Casa:', casa);
        console.log('Compra:', compra);
        console.log('Nombre:', nombre);
        console.log('Venta:', venta);
        console.log('Fecha Actualizacion: ', fechaHoraFormateada); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
