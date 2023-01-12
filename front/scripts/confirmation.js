const orderId = new URLSearchParams(location.search).get('orderId');

document.getElementById('orderId').innerHTML = orderId;

const thanks = document.createElement('p');
thanks.innerText = "Kanap vous remercie de votre achat !";
document.querySelector('.confirmation p').appendChild(thanks);

localStorage.removeItem('sofas');