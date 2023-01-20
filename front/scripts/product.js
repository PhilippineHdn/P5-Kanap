//get the id of a product from the url
const idProduct = new URLSearchParams(location.search).get('id');

//display the information of the product concerned
const getPost = (product) => {
    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;
    document.querySelector(".item__img").appendChild(productImg);

    const productName = document.getElementById('title');
    productName.innerText = product.name;

    const titleTab = document.getElementById('titleTab');
    titleTab.innerText = product.name;

    const productPrice = document.getElementById('price');
    productPrice.innerText = product.price;

    const productDescription = document.getElementById('description');
    productDescription.innerText = product.description;

    product.colors.forEach(color => {
        const productColors = document.createElement("option");
        productColors.value = color;
        productColors.innerText = color;
        document.querySelector("#colors").appendChild(productColors);
    })
}

//call the api to receive product information
const getArticle = async () => {
    const response = await fetch("http://localhost:3000/api/products/" + idProduct);
    let product = null;
    if (response.ok) {
        product = await response.json()
    }
    if (product) {
        getPost(product)
    }
}

getArticle();

//when clicking on the "add to cart" button, add the product(s) to the cart using LocalStorage
document.getElementById('addToCart').addEventListener("click", () => {

    const colors = document.getElementById('colors');
    const quantityValue = document.getElementById('quantity').value;

    if(!colors.value || quantityValue == 0) {
        alert('Pensez à renseigner la couleur et la quantité.');
    } else if (quantityValue < 0 || quantityValue > 100) {
        alert('Veuillez choisir une quantité comprise entre 1 et 100.');
    } else {
        const localStorageSofas = localStorage.getItem('sofas');
        const parsedLocalStorageSofas = localStorageSofas ? JSON.parse(localStorageSofas) : [];

        const foundIndex = parsedLocalStorageSofas.findIndex(sofa => sofa.id === idProduct && sofa.color === colors.value);
        if(foundIndex === -1) {
            parsedLocalStorageSofas.push({id:idProduct, color: colors.value, qty: Number(quantityValue)});
        } else {
            if (parsedLocalStorageSofas[foundIndex].qty + Number(quantityValue) > 100) {
                alert(`La quantité totale d\'un produit ne peut pas dépasser 100. Vous avez déjà ${parsedLocalStorageSofas[foundIndex].qty} canapés identiques.`);
                return;
            }
            parsedLocalStorageSofas[foundIndex].qty += Number(quantityValue);
        }
        localStorage.setItem('sofas', JSON.stringify(parsedLocalStorageSofas));

        document.getElementById('addToCart').style.color = "green";
    }
})

document.getElementById('addToCart').addEventListener("mouseout", () => {
    document.getElementById('addToCart').style.color = "white";
})

/* const sofas = [
    {
        id:'a',
        color:'pink',
        qty:1
    },
    {
        id:'b',
        color:'green',
        qty:3
    }
] */