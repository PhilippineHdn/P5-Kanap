import cartTemplate from "./templates/cartTemplate.js";
const productInLocalStorage = JSON.parse(localStorage.getItem('sofas'));
 console.log(productInLocalStorage);
const cartItems = document.getElementById('cart__items');

const getProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    let products = [];
    if (response.ok) {
        products = await response.json(); 
        // console.log(products)
    } 
    return products;
}

const displayCart = async () => {
    if (!productInLocalStorage) {
        const emptyCartDiv = document.querySelector("#cart__items");
        const emptyCartSentence = 'Votre panier est vide';
        emptyCartDiv.innerText = emptyCartSentence;
    } else {
        const products = await getProducts();
        for (const index in productInLocalStorage) {
            const productInCart = products.find(product => product._id === productInLocalStorage[index].id);
            cartItems.innerHTML += cartTemplate;

            cartItems.getElementsByClassName('cart__item')[index].setAttribute('data-id', productInLocalStorage[index].id);
            cartItems.getElementsByClassName('cart__item')[index].setAttribute('data-color', productInLocalStorage[index].color);
            cartItems.querySelectorAll('.cart__item__img img')[index].setAttribute('src', productInCart.imageUrl);
            cartItems.querySelectorAll('.cart__item__img img')[index].setAttribute('alt', productInCart.altTxt);
            cartItems.querySelectorAll('.cart__item__content__description h2')[index].innerText = productInCart.name;
            cartItems.querySelectorAll('.cart__item__content__description .color')[index].innerText = productInLocalStorage[index].color;
            cartItems.querySelectorAll('.cart__item__content__description .price')[index].innerText = productInCart.price + " €";
            cartItems.querySelectorAll('.cart__item__content__settings__quantity input')[index].setAttribute('value', productInLocalStorage[index].qty);
        }
    }
}

displayCart();