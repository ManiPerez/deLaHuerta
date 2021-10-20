// Barra de Busqueda: desocultar, ocultar con click al Search Button:

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = ()=> {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// Carrito: desocultar, ocultar con click al Cart Button:

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = ()=> {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// Log In: desocultar, ocultar con click al Log In Button:

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = ()=> {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

// Menu: desocultar, ocultar con click al Menu Button:

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = ()=> {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = ()=> {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// Swiper library code

var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1020: {
        slidesPerView: 5,
      },
    },
  });

  var swiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1020: {
        slidesPerView: 5,
      },
    },
  });

//------------------------------------------------------------------------------------------------------------------//

// SELECTORS
const listaVegetales = document.querySelector('#lista-vegetales');

const listaFrutas = document.querySelector('#lista-frutas');

const listaPromos = document.querySelector('#lista-promos');

const tableCarrito = document.querySelector('#lista-carrito tbody');
const formBuscador = document.querySelector('#formulario');
let carrito;

// LISTENERS
document.addEventListener('DOMContentLoaded',()=>{
  renderVegetales(vegetales);
});

document.addEventListener('DOMContentLoaded',()=>{
  renderFrutas(frutas);
});

document.addEventListener('DOMContentLoaded',()=>{
  renderPromos(promos);
});


listaVegetales.addEventListener('click',agregarProducto);
listaFrutas.addEventListener('click',agregarProducto);
listaPromos.addEventListener('click',agregarProducto);

function agregarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("addCart")) {
    const productCard = e.target.parentElement.parentElement;

    const productoAgregado = {
      imagen: productCard.querySelector('img.imagen-producto').src,
      nombre: productCard.querySelector('h3').textContent, 
      cantidad: 1,
      precio: productCard.querySelector('.price').textContent,
      id: productCard.querySelector('span').dataset.id,
    }

    carrito.push(productoAgregado);
  }
}

function actualizarCarritoHTML() {
	tableCarrito.innerHTML = '';

	carrito.forEach(producto => {
		const { imagen, nombre, precio, cantidad, id } = producto;
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${imagen}" width="100%">
			</td>
			<td>
				${nombre}
			</td>
			<td>
				${precio}
			</td>
			<td>
				${cantidad}
			</td>
			<td>
				<a href="#" class="borrar-producto" data-id="${id}"><i class="fas fa-trash"></i></a>
			</td>
		`
		tableCarrito.appendChild(row);
	});
}

function actualizarStorage() {
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

// DOM HTML
// DUDA: cuando coloco => data-id="${vegetal.id} en la etiqueta <button> del boton de Agregar al carrito en la linea 135 (como hizo el profe en clase), el boton no se muestra en mi html

function renderVegetales(vegetales) {
  vegetales.forEach(vegetal => {
    const html = `
        <div class="swiper-slide box">
          <img class="imagen-producto" src="${vegetal.imagen}" alt="${vegetal.nombre}">
          <h3>${vegetal.nombre}</h3>
          <div class="quantity">${vegetal.cantidad}</div>
          <div class="price">${vegetal.precio}</div>
          <span data-id="${vegetal.id}></span>
          <a href="#" class="btn products-btn addCart" >Añadir al carrito</a>
        </div>
    `
    listaVegetales.innerHTML += html;
  });
}

function renderFrutas(frutas) {
  frutas.forEach(fruta => {
    const html = `
        <div class="swiper-slide box">
          <img class="imagen-producto" src="${fruta.imagen}" alt="${fruta.nombre}">
          <h3>${fruta.nombre}</h3>
          <div class="quantity">${fruta.cantidad}</div>
          <div class="price">${fruta.precio}</div>
          <button class="btn products-btn addCart">Añadir al carrito</button>
        </div>
    `
    listaFrutas.innerHTML += html;
  });
}

function renderPromos(promos) {
  promos.forEach(promo => {
    const html = `
        <div class="swiper-slide box">
          <img class="imagen-producto" src="${promo.imagen}" alt="${promo.nombre}">
          <h3>${promo.nombre}</h3>
          <div>${promo.descripcion}</div>
          <p class="quantity">${promo.cantidad}</p>
          <div class="price">${promo.precio}</div>
          <button class="btn addCart">Añadir al carrito</button>
        </div>
    `
    listaPromos.innerHTML += html;
  });
}



