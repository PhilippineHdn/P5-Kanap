const idProduct = new URLSearchParams(location.search).get('id');

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

const getArticle = async () => {
    const response = await fetch("http://localhost:3000/api/products/" + idProduct);
    let product = null;
    if (response.ok) {
        product = await response.json()
    }
    return product ? getPost(product) : null;
}

getArticle();

document.getElementById('addToCart').addEventListener("click", () => {

    const colors = document.getElementById('colors');
    const quantityValue = document.getElementById('quantity').value;

    if(!colors.value || quantityValue === 0) {
        alert('Please choose a color and a quantity');
    } else {
        const localStorageSofas = localStorage.getItem('sofas');
        const parsedLocalStorageSofas = localStorageSofas ? JSON.parse(localStorageSofas) : [];

        const foundIndex = parsedLocalStorageSofas.findIndex(sofa => sofa.id === idProduct && sofa.color === colors.value);
        if(foundIndex === -1) {
            parsedLocalStorageSofas.push({id:idProduct, color: colors.value, qty: Number(quantityValue)});
        } else {
            parsedLocalStorageSofas[foundIndex].qty += Number(quantityValue);
        }
        localStorage.setItem('sofas', JSON.stringify(parsedLocalStorageSofas));
    }
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