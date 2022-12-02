const idProduct = new URLSearchParams(location.search).get('id');

const getPost = (product) => {
    const productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    const productName = document.getElementById('title');
    productName.innerText = product.name;

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



