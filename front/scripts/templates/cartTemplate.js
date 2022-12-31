export default `
    <div class="cart__item__img">
        <img>
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2></h2>
            <p class="color"></p>
            <p class="price"></p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
`;