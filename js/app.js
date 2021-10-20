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

/*------------------------------------------------------------------------------------------------------------------*/

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

/*---------------------------------------------------------------------------------------------------------------*/

// Id de las cards de mis productos que se mostraran en mi HTML:
const productosItems = document.getElementById('productos-items');
// Id de las cards de mis promos que se mostraran en mi HTML:
const promosItems = document.getElementById('promos-items');
// Id de las items de mis productos que se mostraran en mi carrito:
const carritoItems = document.getElementById('carrito-items');
// Id de mi carrito cuando está vacio:
const carritoVacio = document.getElementById('carrito-vacio');
// Template de las cards de mis productos (accedo a sus elementos con .content)
const templateProductos = document.getElementById('template-productos').content;
// Template de las cards de mis promos (accedo a sus elementos con .content)
const templatePromos = document.getElementById('template-promos').content;
// Template del total acumulado del carrito
const templateTotal = document.getElementById('template-total').content;
// Template del carrito armado
const templateCarrito = document.getElementById('template-carrito').content;
// Ocupo un fragment (no genera reflow, xq no se pinta en el DOM) para todas las cards que quiero pintar
const fragment = document.createDocumentFragment();
// Creo el objeto carrito para llenar con mi lista de productos
let carrito = {};



// Esperar a que se ejecute documento HTML antes de cargar el json:
document.addEventListener('DOMContentLoaded', ()=> {
  fetchDataProductos();
})
// A traves del atributo data-id capturo el evento "click" en el botón "Agregar al carrito" de la seccion productos 
productosItems.addEventListener('click', e => {
  addCarrito(e);
  e.preventDefault();
})

// Leer JSON de productos
const fetchDataProductos = async () => {
  try {
    const answer = await fetch('productos.json');
    const data = await answer.json();
    // console.log(data);
    pintarProductos(data);
  } catch (error) {
    console.log(error);
  }
}

// Esperar a que se ejecute documento HTML antes de cargar el json:
document.addEventListener('DOMContentLoaded', ()=> {
  fetchDataPromos();
})

// A traves del atributo data-id capturo el evento "click" en el botón "Agregar al carrito" de la seccion promos 
promosItems.addEventListener('click', e => {
  addCarrito(e);
  e.preventDefault();
})

// Leer JSON de promos
const fetchDataPromos = async () => {
  try {
    const answer = await fetch('promos.json');
    const data = await answer.json();
    // console.log(data);
    pintarPromos(data);
  } catch (error) {
    console.log(error);
  }
}

// Una vez accedo a la info de mis cards de Productos, las "pinto" en mi HTML:
const pintarProductos = data => {
  //Una vez obtenida la data, la recorro con un forEach. Como mi api está en json ocupo un forEach
  data.forEach(producto => {
    templateProductos.querySelector('img').setAttribute("src",producto.imagen);
    templateProductos.querySelector('h3').textContent = producto.nombre;
    templateProductos.querySelector('p').textContent = producto.xunidad;
    templateProductos.querySelector('div.precio').textContent = producto.precio;
    templateProductos.querySelector('a').dataset.id = producto.id;

    // Procedo a la clonación de mi card
    const clone = templateProductos.cloneNode(true);
    fragment.appendChild(clone);
  })
  // En mi HTML, en el div con el id="items" procedo a pintar mis cards
  productosItems.appendChild(fragment);
}

// Una vez accedo a la info de mis cards de Promos, las "pinto" en mi HTML:
const pintarPromos = data => {
  //Una vez obtenida la data, la recorro con un forEach. Como mi api está en json ocupo un forEach
  data.forEach(promo => {
    templatePromos.querySelector('img').setAttribute("src",promo.imagen);
    templatePromos.querySelector('h3').textContent = promo.nombre;
    templatePromos.querySelector('div.promo-info').textContent = promo.descripcion;
    templatePromos.querySelector('p').textContent = promo.xunidad;
    templatePromos.querySelector('div.precio').textContent = promo.precio;
    templatePromos.querySelector('a').dataset.id = promo.id;

    // Procedo a la clonación de mi card
    const clone = templatePromos.cloneNode(true);
    fragment.appendChild(clone);
  })
  // En mi HTML, en el div con el id="items" procedo a pintar mis cards
  promosItems.appendChild(fragment);
}



// Al capturar el evento 'click' en el boton "Agregar al carrito" con la class 'btn' capturo la info del producto y la envío a la funcion setCarrito
const addCarrito = e => {
  if (e.target.classList.contains('btn')) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
}
// Funcion para manipular el objeto carrito:
const setCarrito = objeto => {
  // Con la info capturada construimos el objeto Producto
  const producto = {
    id: objeto.querySelector('.btn').dataset.id,
    nombre: objeto.querySelector('h3').textContent,
    xunidad: objeto.querySelector('p').textContent,
    precio: objeto.querySelector('.precio').textContent,
    cantidad: 1
  }
  // Aumento cantidad del producto seleccionado más de una vez
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = {...producto};
  console.log(carrito);

}



