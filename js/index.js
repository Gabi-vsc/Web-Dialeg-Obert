'use strict'


//1. MENU HAMBURGUESA

// Seleccionamos el botón del menú y el nav para poder controlarlos
const menuButton = document.querySelector('.Header-menuButton')
const headerNav = document.querySelector('.Header-nav')

if (menuButton && headerNav) {
    // Al hacer clic en el botón, abrimos o cerramos el menú
    menuButton.addEventListener('click', () => {
        const isOpen = headerNav.classList.toggle('is-open')
        menuButton.setAttribute('aria-expanded', String(isOpen))
    })

    // Cuando se pulsa un enlace del menú, lo cerramos para que no quede abierto
    headerNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            headerNav.classList.remove('is-open')
            menuButton.setAttribute('aria-expanded', 'false')
        })
    })

    // Si hacemos clic fuera del menú, también se cierra
    document.addEventListener('click', (event) => {
        const clickInside = headerNav.contains(event.target) || menuButton.contains(event.target)

        if (!clickInside) {
            headerNav.classList.remove('is-open')
            menuButton.setAttribute('aria-expanded', 'false')
        }
    })
}





// 2. SLIDER: cambia automáticamente entre los contenedores de imágenes.



//Pseudocódigo

//Seleccionamos todos los elementos con .Slider-container
//Creamos la variable posicion a la que le damos el valor 0
//Declaramos una función que mostrará el contenedor cuya posición/indice coincida con la variable 'posicion' añadiendo isVisible. 

// Asignamos una condición: Si la cantidad de contenedores encontrados es mayor que cero
// - Se muestra el primer container
// - Avanza a la siguiente posición (siguiente container).
// - Si posicion llega al número total de contenedores, posicion vuelve a 0 y se muestra de nuevo el primero

// Establecemos un intervalo donde nextContainer se ejecute cada 2 segs.




const sliderContainers = document.querySelectorAll('.Slider-container') // querySelectorAll devuelve una lista, que puede estar vacía si no hay ninguno.

console.log(sliderContainers) //pasamos a todos por la consola para poder visualizarlos

let posicion = 0

console.log(posicion)




const mostrarContainer = function () {
    sliderContainers.forEach(function(each, i) {
        each.classList.toggle('isVisible', i === posicion)
    })
}


if (sliderContainers.length > 0) {
    mostrarContainer()

    const nextContainer = function() {
        posicion = (posicion + 1) % sliderContainers.length // El operador % hace que el índice vuelva a 0 después del último.

        mostrarContainer()
    }
    setInterval(nextContainer, 2000)
}






//3. CARROUSEL CON OVERLAY. Para que Overlay aparezca cuando 'hover' en pc y 'click' en móviles



// Pseudocódigo

// Seleccionamos todas las tarjetas de Workshops
// Comprobamos si el dispositivo es táctil o tiene poco soporte para hover

// Para cada tarjeta:
//      Declaramos una función para mostrar el overlay
//      Declaramos una función para ocultar el overlay

// Si el dispositivo es táctil:
//      Cuando se toca la tarjeta, mostramos el overlay
//      Cuando se suelta la tarjeta, ocultamos el overlay
//      Si se cancela el toque, ocultamos el overlay
//      Cuando se hace click, evitamos el comportamiento predeterminado del navegador

//Si no es un dispositivo táctil:
//      Cuando el ratón entra en la tarjeta, mostramos el overlay
//      Cuando el ratón sale de la tarjeta, ocultamos el overlay



const workshopCard = document.querySelectorAll('.Workshops-card')
const esTactil = window.matchMedia('(hover: none), (pointer: coarse)').matches // Comprueba si se cumple alguna de las dos condiciones.

workshopCard.forEach((tarjeta) => {
    const mostrarOverlay = () => tarjeta.classList.add('is-active')
    const ocultarOverlay = () => tarjeta.classList.remove('is-active')


    if (esTactil) {
        tarjeta.addEventListener('touchstart', mostrarOverlay, { passive: true }) 
        tarjeta.addEventListener('touchend', ocultarOverlay)
        tarjeta.addEventListener('touchcancel', ocultarOverlay)

        tarjeta.addEventListener('click', (evento) => {
            evento.preventDefault()
        })

    } else {
        tarjeta.addEventListener('mouseenter', mostrarOverlay)
        tarjeta.addEventListener('mouseleave', ocultarOverlay)
    }
})





