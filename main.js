import './sass/main.scss'
import Handlebars from "handlebars"

const calcularYearDinamico = () => {

    //! Creo dinamicamente con js el contenido de la etiqueta <small> dentro del footer, en este caso, toda la info de los CopyRight

    //? Establezco la fecha del año en el footer <small> (CopyRight) de manera automática con el objeto Date.
    //? Para que no me toque hacerlo manualmente y cambiarla cada año.

    // main.js
    const footerCopyRight = document.querySelector('.footer__seccion-2__small')

    const currentYear = new Date().getFullYear()
    const copyrightSymbol = '&copy;'
    const muebleriaText = 'LA MUEBLERÍA'
    const brandIcon = '<i class="fa-solid fa-couch"></i>'
    const derechosReservadosText = ' TODOS LOS DERECHOS RESERVADOS.'

    footerCopyRight.innerHTML = `${copyrightSymbol} ${currentYear} <b>${muebleriaText} ${brandIcon}</b> -${derechosReservadosText}`

}
 
//? Hago las peticiones Asincronicas a habndlebars para obtener las plantillas de las card de los Productos.
//! Queremos eliminar todo el codigo html de las card para generarlo dinamicamente con handlebars.


const start = async () => {

    const endpoitLocal = import.meta.env.VITE_LOCAL

    const endpoitRemoto = import.meta.env.VITE_REMOTO
    
    try {

        const respuesta = await fetch('templates/card.hbs')

        if ( !respuesta.ok) {
            throw new Error('No se pudo obtener la plantilla')
        }

        
        const plantilla = await respuesta.text() // es un archivo plano, de texto

        // Compilo la plantilla con Handlebars
        const template = Handlebars.compile(plantilla)

        // A la platilla que me genera, le voy a pasar la data Me genera un string.

        let respuestaBack 

        if ( window.location.href.includes('localhost') ) {
            respuestaBack = await fetch (endpoitLocal)
        } else {
            respuestaBack = await fetch (endpoitRemoto)
        }
       
        if ( !respuestaBack.ok) {
            throw new Error('Lo sentimos, algo ha pasado con los productos', respuestaBack.status)
        }

        const dataProductos = await respuestaBack.json()
        // esto es un array de productos, tengo que paserle al html un objeto.

        const data ={ productos: dataProductos} // creo el objeto que tiene como value el array. Ahora este objeto se lo paso al html.
        
        const html = template(data) // le paso al html el objeto con la (key productos) y el (value dataProductos)

        const contenedorCards = document.querySelector('#contenedor-cards')

        contenedorCards.innerHTML = html


    } catch (error) {
        console.error(error)
    }
}


window.addEventListener('DOMContentLoaded', () => {

    calcularYearDinamico()

    const ruta = window.location.href

    if ( ruta.includes('contacto.html') ) {
        console.log('Estoy en Contacto')
    } else if ( ruta.includes('nosotros.html') ) {
        console.log('Estoy en Nosotros')
    } else {
        start()
    }
}) 

// llamo a la funcion start y YearDinamico, una vez se haya cargado completo el documento html
