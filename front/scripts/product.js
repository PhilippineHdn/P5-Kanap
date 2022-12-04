const idProduct = new URLSearchParams(location.search).get('id');
const button = document.getElementById('addToCart');
const colors = document.getElementById('colors');
const quantity = document.getElementById('quantity');


const getPost = (product) => {
    const productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

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
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = color;
        productColors.innerText = color;
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


button.addEventListener("click", () => {
    if(!colors.value || quantity.value === 0) {
        alert('Please choose a color and a quantity');
    } else {
        const localStorageSofas = localStorage.getItem('sofas');
        const parsedLocalStorageSofas = localStorageSofas ? JSON.parse(localStorageSofas) : [];

        const foundIndex = parsedLocalStorageSofas.findIndex(sofa => sofa.id === idProduct && sofa.color === colors.value);
        if(foundIndex === -1) {
            parsedLocalStorageSofas.push({id:idProduct, color: colors.value, qty: Number(quantity.value)});
        } else {
            parsedLocalStorageSofas[foundIndex].qty += Number(quantity.value);
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