import cartTemplate from "./templates/cartTemplate.js";
import * as regex from "./regex.js";

const response = await fetch('http://localhost:3000/api/products');
let products = [];
if (response.ok) {
    products = await response.json();
}

const removeSofaInLocalStorage = (sofaId, sofaColor) => {
    localStorage.setItem('sofas', JSON.stringify(JSON.parse(localStorage.getItem('sofas')).filter(sofa => 
        sofa.id !== sofaId && sofa.color !== sofaColor )));
}

const updateSofaInLocalStorage = (sofa) => {
    localStorage.setItem('sofas', JSON.stringify(JSON.parse(localStorage.getItem('sofas')).map(item => {
        if (item.id === sofa.id && item.color === sofa.color) {
            item.qty = sofa.qty;
        }
        return item
    })));
}

const onClickDeleteSofa = (event) => {
    const cartItem = event.target.closest('.cart__item');
    const sofaId = cartItem.dataset.id;
    const sofaColor = cartItem.dataset.color;
    removeSofaInLocalStorage(sofaId, sofaColor);
    cartItem.remove();
    updateSums(JSON.parse(localStorage.getItem('sofas')).map(product => ( {
        ...product, 
        ...products.find(item => item._id === product.id)
    })))
}

const onChangeSofaQuantity = (event) => {
    const cartItem = event.target.closest('.cart__item');
    updateSofaInLocalStorage({
        id : cartItem.dataset.id,
        color : cartItem.dataset.color,
        qty : event.target.valueAsNumber
    })
    updateSums(JSON.parse(localStorage.getItem('sofas')).map(product => ( {
        ...product, 
        ...products.find(item => item._id === product.id)
    })))

}

const updateSums = (products) => {
    const sums = products.reduce((acc, cur) => {
        acc.qty += Number(cur.qty)
        acc.price += Number(cur.price) * Number(cur.qty)
        return acc
    }, {qty: 0, price: 0})
    document.getElementById('totalQuantity').innerHTML = sums.qty;
    document.getElementById('totalPrice').innerHTML = sums.price;

}

const displayCart = async () => {
    const productInLocalStorage = JSON.parse(localStorage.getItem('sofas')) || [];
    const enrichedProductInLocalStorage = productInLocalStorage.map(product => ( {
        ...product, 
        ...products.find(item => item._id === product.id)
    }));
    if (!productInLocalStorage || !productInLocalStorage.length) {
        const emptyCartDiv = document.querySelector("#cart__items");
        const emptyCartSentence = 'Votre panier est vide';
        emptyCartDiv.innerText = emptyCartSentence;
    } else {
        const cartItems = document.getElementById('cart__items');
        for (const product of enrichedProductInLocalStorage) {
            const cartItem = document.createElement('article');
            cartItem.classList.add('cart__item');
            cartItem.setAttribute('data-id', product.id);
            cartItem.setAttribute('data-color', product.color);
            cartItem.innerHTML = cartTemplate; 

            cartItem.querySelector('img').setAttribute('src', product.imageUrl);
            cartItem.querySelector('img').setAttribute('alt', product.altTxt);
            cartItem.querySelector('h2').innerText = product.name;
            cartItem.querySelector('.color').innerText = product.color;
            cartItem.querySelector('.price').innerText = product.price + " €";
            cartItem.querySelector('input').setAttribute('value', product.qty);
            cartItem.querySelector('input').addEventListener('change', onChangeSofaQuantity);
            cartItem.querySelector('.deleteItem').addEventListener('click', onClickDeleteSofa);
            cartItems.appendChild(cartItem);

            updateSums(enrichedProductInLocalStorage);

        }
    }
}

displayCart();

const firstNameElement = document.getElementById('firstName')
firstNameElement.addEventListener('focusout', (event) => {
    const firstNameValue = event.target.value;
    document.getElementById('firstNameErrorMsg').innerText = regex.validateFirstName(firstNameValue) 
        ? '' 
        : "Prénom invalide !";
})

const lastNameElement = document.getElementById('lastName')
lastNameElement.addEventListener('focusout', (event) => {
    const lastNameValue = event.target.value;
    document.getElementById('lastNameErrorMsg').innerText = regex.validateLastName(lastNameValue) 
        ? '' 
        : "Nom invalide !";
})

const addressElement = document.getElementById('address')
addressElement.addEventListener('focusout', (event) => {
    const addressValue = event.target.value;
    document.getElementById('addressErrorMsg').innerText = regex.validateAddress(addressValue) 
        ? '' 
        : "Adresse invalide !";
})

const cityElement = document.getElementById('city')
cityElement.addEventListener('focusout', (event) => {
    const cityValue = event.target.value;
    document.getElementById('cityErrorMsg').innerText = regex.validateCity(cityValue) 
        ? '' 
        : "Ville invalide !";
})

const emailElement = document.getElementById('email')
emailElement.addEventListener('focusout', (event) => {
    const emailValue = event.target.value;
    document.getElementById('emailErrorMsg').innerText = regex.validateEmail(emailValue) 
        ? '' 
        : "Email invalide !";
})

document.getElementById('order').addEventListener('click', async (event) => {
    event.preventDefault();
    let isEverythingOkay = true;

    if (!regex.validateFirstName(firstNameElement.value)) {
        document.getElementById('firstNameErrorMsg').innerText = "Prénom invalide !"
        isEverythingOkay = false;
    }

    if (!regex.validateLastName(lastNameElement.value)) {
        document.getElementById('lastNameErrorMsg').innerText = "Nom invalide !"
        isEverythingOkay = false;
    }

    if (!regex.validateAddress(addressElement.value)) {
        document.getElementById('addressErrorMsg').innerText = "Adresse invalide !"
        isEverythingOkay = false;
    }

    if (!regex.validateCity(cityElement.value)) {
        document.getElementById('cityErrorMsg').innerText = "Ville invalide !"
        isEverythingOkay = false;
    }

    if (!regex.validateEmail(emailElement.value)) {
        document.getElementById('emailErrorMsg').innerText = "Email invalide !"
        isEverythingOkay = false;
    }

    if (isEverythingOkay) {
        const contact = {
            firstName: firstNameElement.value,
            lastName : lastNameElement.value,
            address : addressElement.value,
            city : cityElement.value,
            email : emailElement.value,
        };

        const productIds = JSON.parse(localStorage.getItem('sofas')).map(item => item.id);
        try {
            const responseOrder = await fetch('http://localhost:3000/api/products/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({contact, products: productIds })
            });
            if (responseOrder.ok) {
                const orderId = (await responseOrder.json()).orderId;
                location.href = `./confirmation.html?orderId=${orderId}`;
            }
        } catch (error) {
            console.log(error)
        }
    }


})