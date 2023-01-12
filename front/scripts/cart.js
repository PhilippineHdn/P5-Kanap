import cartTemplate from "./templates/cartTemplate.js";
import regex from "./regex.js";

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

    if (sums.qty <= 1) {
        document.getElementById('article-label').innerText = " article";
    } else if (sums.qty > 1) { 
        document.getElementById('article-label').innerText = " articles";
    }
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
        document.getElementsByClassName('cart__price')[0].style.display = "none";
        document.getElementsByClassName('cart__order')[0].style.display = "none";

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

const formErrorsLabel = {
    firstName: 'Prénom invalide !', 
    lastName: 'Nom invalide !',
    address: 'Adresse invalide !',
    city: 'Ville invalide !',
    email: 'Email invalide !'
};

let errors = {};

const initFocusOut = key => {
     document.getElementById(key).addEventListener('focusout', (event) => {
        console.log(key);
        errors[key] = !regex[key](event.target?.value ?? '');
        console.log(errors[key])
        document.getElementById(`${key}ErrorMsg`).innerText = !errors[key]? '' : formErrorsLabel[key];
     })
}

Object.keys(formErrorsLabel).forEach(key => {
    errors[key] = true;
    initFocusOut(key)
});

document.getElementById('order').addEventListener('click', async (event) => {
    event.preventDefault();
    if (Object.values(errors).every(value => value === false)) {
        const contact = {};
        Object.keys(errors).forEach(key => contact[key]= document.getElementById(key).value);

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
    } else if (!Object.values(errors).every(value => value === false)) { alert("Vérifiez que tous les champs du formulaire soient corrects.") }
})