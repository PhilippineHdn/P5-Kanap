import productTemplate from "./templates/productTemplate.js";

//call to the api to get the products of the catalog
const getProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    let products = [];
    if (response.ok) {
        products = await response.json();
    }
    return products;
}

//display a product on the page using a template
const displayProductInDOM = (product) => {
    const newA = document.createElement("a");
    newA.href = `./product.html?id=${product._id}`;

    newA.innerHTML = productTemplate;
    newA.querySelector(".product-image").setAttribute("src",product.imageUrl)
    newA.querySelector(".product-image").setAttribute("alt",product.altTxt)
    newA.querySelector(".product-name").innerText=product.name;
    newA.querySelector(".product-description").innerText=product.description;

    document.getElementById('items').appendChild(newA);
}

//loop to display the products received by the api in a dynamic way
const getAndDisplayProducts = async () => {
    const products = await getProducts();

    products.forEach(product => {
        displayProductInDOM(product);
    })
}

getAndDisplayProducts();