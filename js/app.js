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

//------------------------------------------------------------------------------------------------------------------//


// Id de las cards de mis productos que se mostraran en mi HTML:
const items = document.getElementById('items');
// Template de las cards de mis productos (accedo a sus elementos con .content)
const templateCard = document.getElementById('template-card').content;



// Esperar a que se ejecute documento HTML antes de cargar el json:
document.addEventListener('DOMContentLoaded', ()=> {
  fetchData();
})
// Leer JSON de productos
const fetchData = async () => {
  try {
    const answer = await fetch('productos.json');
    const data = await answer.json();
    // console.log(data);
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
}

// Una vez accedo a la info de mis cards "pinto" las cards en mi HTML:
const pintarCards = data=> {
  console.log(data);
}

