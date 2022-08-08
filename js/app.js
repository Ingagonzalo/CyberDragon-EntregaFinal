
const contenedorProductos = document.getElementById('contenedor-productos')
var titulo = ''
let divAlmacenamiento = ' '
let divAlmacenamientoCreado = false
let divGPU = ' '
let divGPUCreado = false
let divAuris = ' '
let divAurisCreado = false
let divMoni = ' '
let divMoniCreado = false
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const precioCompra = document.getElementById('precioCompra')
const cantidadTotal = document.getElementById('cantidadTotal')
const contenedorCompra = document.getElementById('compra-productos')
const contenedorResumen = document.getElementById('resumen-compra')
let stockProductos = [] 
let carrito = []
let url = `./js/stock.json`


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
       actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

fetch(url)
.then( response => response.json() )
.then( data => mostrarData(data) )
.catch( error => console.log(error) )



const mostrarData = (data) => {
console.log(data)
data.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
                
               
                <img src=${producto.img} alt= "">
                <h2 class="card-title">${producto.nombre}</h2>
                <h3 class="card-text">$ ${producto.precio}</h3>

                <button class="boton_add" id="agregar${producto.id}" class="boton-agregar">Agregar al Carrito</button>

                  `;


    if (producto.categoria == "Almacenamiento") {
        if (divAlmacenamientoCreado == false) {
            titulo = document.createElement('span')
            titulo.classList.add('card-title')
            titulo.innerHTML = `
             <h2>${producto.categoria}</h2>
            `;
            divAlmacenamiento = document.createElement('div')
            divAlmacenamiento.classList.add('divAlmacenamiento')
            divAlmacenamientoCreado = true
            contenedorProductos.appendChild(titulo)
            contenedorProductos.appendChild(divAlmacenamiento)
        }
        titulo.appendChild(div)
        divAlmacenamiento.appendChild(div)


    }
    else if (producto.categoria == "GPU Placas de Video") {
        if (divGPUCreado == false) {
            titulo = document.createElement('span')
            titulo.classList.add('card-title')
            titulo.innerHTML = `
             <h2>${producto.categoria}</h2>
            `;
            divGPU = document.createElement('div')
            divGPU.classList.add('divGPU')
            divGPUCreado = true
            contenedorProductos.appendChild(titulo)
            contenedorProductos.appendChild(divGPU)

        }
        titulo.appendChild(div)
        divGPU.appendChild(div)
    }

    else if (producto.categoria == "Auriculares") {
        if (divAurisCreado == false) {
            titulo = document.createElement('span')
            titulo.classList.add('card-title')
            titulo.innerHTML = `
             <h2>${producto.categoria}</h2>
            `;
            divAuris = document.createElement('div')
            divAuris.classList.add('divAuris')
            divAurisCreado = true
            contenedorProductos.appendChild(titulo)
            contenedorProductos.appendChild(divAuris)

        }
        titulo.appendChild(div)
        divAuris.appendChild(div)
    }

    else if (producto.categoria == "Monitores") {
        if (divMoniCreado == false) {
            titulo = document.createElement('span')
            titulo.classList.add('card-title')
            titulo.innerHTML = `
             <h2>${producto.categoria}</h2>
            `;
            divMoni = document.createElement('div')
            divMoni.classList.add('divMoni')
            divMoniCreado = true
            contenedorProductos.appendChild(titulo)
            contenedorProductos.appendChild(divMoni)

        }
        titulo.appendChild(div)
        divMoni.appendChild(div)
    }
    
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto)
        Toastify({

            text: "Se añadio un producto al carrito",
            duration: 3000,
            style: {
                background: 'linear-gradient(to right, #d63946, #d63946)'

            }
        }).showToast();
        //
    })
});

}


const agregarAlCarrito = (prodInfo) => {

    const existe = carrito.some(prod => prod.id === prodInfo.id) //comprobar si el elemento ya existe en el carro


    if (existe) {
        
        const prod = carrito.map(prod => { //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
            if (prod.id === prodInfo.id) {
                prod.cantidad++
            }
        })
    } else { 
        
        carrito.push(prodInfo)
    }
    actualizarCarrito()
}


const eliminarDelCarrito = (prodInfo) => {
    
    const item = carrito.find((prod) => prod.id === prodInfo.id)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)
    
    actualizarCarrito()
    Swal.fire({
        title: 'Borrado',
        text: 'El producto ha sido eliminado',

        confirmButtonText: 'Ok'
    })

}

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""


    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <div>

                            <div>
                                
                                <h2 class="card_title_carrito">${prod.nombre}</h2>
                                <h3 class="card-text_carrito">$ ${prod.precio}</h3>
                                <p id="cantidad${prod.id}">Cantidad:${prod.cantidad}<p/>
                                
                            </div>
                            <img src="${prod.img}"alt="">
                            <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                        </div>
        
        `
        

        contenedorCarrito.appendChild(div)
        

        localStorage.setItem('carrito', JSON.stringify(carrito))

        
        
    })

    
    actualizarPrecio()
    actualizarCompra()


}

const actualizarPrecio = () => {
    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

    precioCompra.innerText = precioTotal.innerText

}



const actualizarCompra = () => {
    contenedorCompra.innerHTML = ""
    carrito.forEach((prod) => {
    const divCompra = document.createElement('div')
    divCompra.className = ('productoCompra')
    divCompra.innerHTML = `
                <div class="itemCompra">
                        <img src="${prod.img}"alt="">
                        <div>
                            
                            <h2 class="card_title_carrito">${prod.nombre}</h2>
                           
                            <p id="cantidad${prod.id}">Cantidad:${prod.cantidad}<p/>  
                        </div>
                        <h3 class="card-text_carrito">$ ${prod.precio}</h3>
                        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                </div>
    `
    contenedorCompra.appendChild(divCompra)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    })
}

document.querySelector("#comprar").onclick = function () {
    if ( carrito.length == 0){
        Swal.fire({
            title: 'Error!',
            text: 'No posee ningun producto en su carrito',
            icon: 'error',
            confirmButtonText: ' Ir a home '
        })
    
    }
	else{
        Swal.fire({

            icon: 'success',
            title: 'Su compra se realizo correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        
    }

    carrito.length = 0
    document.querySelector("#contenedor-compras").style.display = "none"	
    document.querySelector(".fondoComprar").style.display = "none"	
    actualizarCarrito()
}




