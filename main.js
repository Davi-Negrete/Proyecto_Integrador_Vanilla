import './sass/main.scss'


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