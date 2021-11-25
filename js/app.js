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

// Al scrolear la pantalla se oculta el Carrito, el Buscador y el Log In:
window.onscroll = ()=> {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

/*---------------------------------------------------------------------------------------------------------------*/

// LOG IN formulario > jQuery animation

$(document).ready(function() {
  $("#user-info").find("input, textarea").on("keyup blur focus", function(e) {
    let $this = $(this),
        label = $this.prev("label");

        if (e.type === "keyup") {
          if($this.val() === "") {
            label.removeClass("actived highlight");
          } else {
            label.addClass("actived highlight");
          }
        } else if (e.type === "blur") {
          if ($this.val() === "") {
            label.removeClass("actived highlight");
          } else {
            label.removeClass("highlight");
          }
        } else if (e.type === "focus") {
          if ($this.val() === "") {
            label.removeClass("highlight");
          } else if ($this.val() !== "") {
            label.addClass("highlight");
          }
        }
  });

  $(".tab a").on("click", function(e) {
    e.preventDefault();

    $(this).parent().addClass("actived");
    $(this).parent().siblings().removeClass("actived");

    target = $(this).attr("href");

    $(".tab-content > div").not(target).hide();

    $(target).fadeIn(600);
  })
})

/*-------------------------------------------------------------------------------------------------------*/

// Animación con jQuery:

$('#logo').on('click', scrollDown);
function scrollDown(e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $('#home').offset().top
	}, 1000, () => {
		console.log("Scroll terminado");
	})
}

/*--------------------------------------------------------------------------------------------------------------*/

// Selector de las cards de mis productos que se mostraran en mi HTML:
const productosItems = document.getElementById('productos-items');
// Selector de las cards de mis promos que se mostraran en mi HTML:
const promosItems = document.getElementById('promos-items');
// Selector de la barra de búsqueda de mis productos:
const formBuscador = document.querySelector('#formulario');
// Id de las items de mis productos que se mostraran en mi carrito:
const carritoItems = document.getElementById('carrito-items');
// Id de mi carrito cuando está vacio:
const carritoFooter = document.getElementById('carrito-footer');
// Template de las cards de mis productos (accedo a sus elementos con .content)
const templateProductos = document.getElementById('template-productos').content;
// Template de las cards de mis promos (accedo a sus elementos con .content)
const templatePromos = document.getElementById('template-promos').content;
// Template del total acumulado del carrito
const templateTotal = document.getElementById('template-total').content;
// Template del carrito armado
const templateCarrito = document.getElementById('template-carrito').content;
// Ocupo un fragment (para no generar reflow, xq no se pinta en el DOM) para almacenar todas las cards que quiero pintar
const fragment = document.createDocumentFragment();
// Creo el objeto carrito para llenar con mi lista de productos
let carrito = {};
// Creo el objeto busqueda para llenar con los nombres de mis productos
let busqueda = {};



/*---------------------------------------------------------------------------------------------------------------*/

// OBTENER DATOS DEL LOCAL STORAGE

document.addEventListener('DOMContentLoaded', () => {

	$.ajax({
		type: "GET",
    url: 'data/productos.json',
		dataType: 'JSON',
		success: function (productosJSON) {
      productos = productosJSON;
      pintarProductos(productos);
		},
		error: function (xhr, textStatus, error) {
			console.log(xhr);
			console.log(textStatus);
			console.log(error);
		}
	});

  $.ajax({
		type: "GET",
    url: 'data/promos.json',
		dataType: 'JSON',
		success: function (promosJSON) {
			promos = promosJSON;
      pintarPromos(promos);
		},
		error: function (xhr, textStatus, error) {
			console.log(xhr);
			console.log(textStatus);
			console.log(error);
		}
	});

    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        pintarCarrito();
    }
});

/*---------------------------------------------------------------------------------------------------------------*/

// CARRITO listeners:

// A traves del atributo data-id capturo el evento "click" en el botón "Agregar al carrito" de la seccion productos 
productosItems.addEventListener('click', e => {
  addCarrito(e);
  e.preventDefault();
});

// A traves del atributo data-id capturo el evento "click" en el botón "Agregar al carrito" de la seccion promos 
promosItems.addEventListener('click', e => {
  addCarrito(e);
  e.preventDefault();
});

// A traves del atributo data-id capturo el evento "click" en los botones + y - del carrito para aumentar y disminuir la cantidad de productos seleccionados: 
carritoItems.addEventListener('click', e => {
  btnCantidad(e);
  e.preventDefault();
});

/*---------------------------------------------------------------------------------------------------------------*/

// FUNCIONES

// Una vez accedo a la info de mis cards de Productos, las "pinto" en mi HTML:
const pintarProductos = productos => {
  //Una vez obtenida la data, la recorro con un forEach. Como mi api está en json ocupo un forEach
  productos.forEach(producto => {
    templateProductos.querySelector('img').setAttribute("src",producto.imagen);
    templateProductos.querySelector('h3').textContent = producto.nombre;
    templateProductos.querySelector('p').textContent = producto.xunidad;
    templateProductos.querySelector('span').textContent = producto.precio;
    templateProductos.querySelector('a').dataset.id = producto.id;

    // Procedo a la clonación de mi card
    const clone = templateProductos.cloneNode(true);
    fragment.appendChild(clone);
  })
  // En mi HTML, en el div con el id="items" procedo a pintar mis cards
  productosItems.appendChild(fragment);
}

// Una vez accedo a la info de mis cards de Promos, las "pinto" en mi HTML:
const pintarPromos = promos => {
  //Una vez obtenida la data, la recorro con un forEach. Como mi api está en json ocupo un forEach
  promos.forEach(promo => {
    templatePromos.querySelector('img').setAttribute("src",promo.imagen);
    templatePromos.querySelector('h3').textContent = promo.nombre;
    templatePromos.querySelector('.promo-info').textContent = promo.descripcion;
    templatePromos.querySelector('p').textContent = promo.xunidad;
    templatePromos.querySelector('span').textContent = promo.precio;
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

    // Mostrar alert al agregar un producto al carrito
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1500
    });
  }
  e.stopPropagation();
}

// Funcion para manipular el objeto carrito:
const setCarrito = objeto => {
  // Con la info capturada construimos el objeto Producto
  const producto = {
    id: objeto.querySelector('.btn').dataset.id,
    imagen: objeto.querySelector('img').src,
    nombre: objeto.querySelector('h3').textContent,
    xunidad: objeto.querySelector('p').textContent,
    precio: objeto.querySelector('span').textContent,
    cantidad: 1
  }
  // Aumento cantidad del producto seleccionado más de una vez
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = {...producto};
  pintarCarrito();
}

// Construyo mi carrito
const pintarCarrito = () => {
    //Para no sobreescribir la info, reinicia el template:
  carritoItems.innerHTML = '';

  Object.values(carrito).forEach(producto => {
    templateCarrito.querySelector('img').src = producto.imagen;
    templateCarrito.querySelector('.carrito-info h3').textContent = producto.nombre;
    templateCarrito.querySelector('.carrito-info p').textContent = producto.xunidad;
    templateCarrito.querySelector('.btn-plus i').dataset.id = producto.id;
    templateCarrito.querySelector('.cantidad-item p').textContent = producto.cantidad;
    templateCarrito.querySelector('.btn-minus i').dataset.id = producto.id;
    templateCarrito.querySelector('spam').textContent = producto.cantidad * producto.precio;
    templateCarrito.querySelector('.btn-delete i').dataset.id = producto.id;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  carritoItems.appendChild(fragment);

  pintarTotal();

  //Para guardar la informacion de mi carrito en el localStorage al actualizar la pagina:
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

let cartCounter = document.querySelector("#cart-counter");

const pintarTotal = () => {
  //Para no sobreescribir la info, reinicia el template:
  carritoFooter.innerHTML = '';

  //Si el carrito está vacío:
  if (Object.keys(carrito).length === 0) {
    carritoFooter.innerHTML = `
    <div class="carrito-vacio" id="carrito-vacio">
      <p >No hay productos en tu carrito de compras.</p>
      <div class="comprar-btn">
        <a href="#productos">Seguir comprando</a>
      </div>
    </div>
    `;
    return;
  }

  const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad ,0);
  const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0);
  
  templateTotal.querySelector('.total-items p spam').textContent = nCantidad;
  templateTotal.querySelector('.total-precio p spam').textContent = nPrecio;

  // Contador del Icono del Carrito:
  cartCounter.innerHTML = nCantidad;

  const clone = templateTotal.cloneNode(true);
  fragment.appendChild(clone);
  carritoFooter.appendChild(fragment);

  const vaciarCarrito = document.getElementById('vaciar-carrito');
  vaciarCarrito.addEventListener('click', () => {
    carrito = {};
    cartCounter.innerHTML = 0;
    pintarCarrito();
  });

  const finalizarCompra = document.getElementById('comprar-btn');
  finalizarCompra.addEventListener('click', () => {
    carrito = {};
    cartCounter.innerHTML = 0;
    pintarCarrito();
    carritoFooter.innerHTML = `
    <div class="compra-modal">
      <div class="close-btn">
      <a href="./index.html"><i class="fas fa-times"></i></a>
      </div>
      <div class="comprar-body">
          <h4>Se registró tu compra <i class="fas fa-check"></i></h4>
          <p>Te enviamos el resumen a tu casilla de mail</p>
          <p>Te avisaremos cuando tu entrega esté en camino</p>
          <p>Gracias por elegirnos!</p>
          <div class="comprar-img">
              <img src="./images/finish-shop-img.png" alt="Imagen vegetales">
          </div>
      </div>
    </div>
    `;
    return;
  })
}

// Botones para aumentar/disminuir/eliminar los productos de mi carrito:
const btnCantidad = e => {
  // Aumentar cantidad
  if (e.target.classList.contains('fa-plus-square')) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = {...producto};

    pintarCarrito();
  }
  // Disminuir cantidad
  if (e.target.classList.contains('fa-minus-square')) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
      cartCounter.innerHTML = 0;
    }

    pintarCarrito();
  }
  // Eliminar producto
  if (e.target.classList.contains('fa-trash-alt')) {
    const producto = carrito[e.target.dataset.id];
    cartCounter.innerHTML = 0;
    delete carrito[e.target.dataset.id];

    pintarCarrito();
  }

  e.stopPropagation();
}