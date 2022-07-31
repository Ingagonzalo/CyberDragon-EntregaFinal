const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]

const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


window.onload = function(){
    $('#onload').fadeOut();

    $('body').removeClass('hidden')
    document.querySelector(".oculto").style.display = "flex"	
    $('section').removeClass('oculto')
}

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})

document.querySelector("#boton-carrito").onclick = function () {
    document.querySelector(".modal-contenedor").style.display = "flex"	

}

document.querySelector("#cerrar").onclick = function () {
	document.querySelector(".modal-contenedor").style.display = "none"	

}

