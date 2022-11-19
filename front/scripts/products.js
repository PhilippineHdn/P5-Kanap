const sofas = document.getElementById('items');


const getProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    if (response.ok === true) {
        const products = await response.json();
        return products; 
    }
}

const displayProductInDOM = (product) => {
    const newA = document.createElement("a");
    newA.href = `./product.html?id=${product._id}`;

    const article = document.createElement("article");

    const image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.altTxt;

    const h3 = document.createElement("h3");
    h3.className = 'productName';
    const h3Content = document.createTextNode(product.name);
    h3.appendChild(h3Content);

    const p = document.createElement('p');
    p.className='productDescription';
    
    const pContent = document.createTextNode(product.description);
    p.appendChild(pContent);

    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);

    newA.appendChild(article);
    sofas.appendChild(newA);
}

const getAndDisplayProducts = async () => {
    const products = await getProducts();

    for (const product of products) {
        displayProductInDOM(product);
    }
}

getAndDisplayProducts();

