/*

<button class="card-button">
<img src="images/cart.svg" alt="cart">
<div class="button-text">Add to Cart</div>
</button>
*/
"use strict"

const basketEl = document.querySelector('.cart_button');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketCountEl = document.querySelector('.productsCount');
const purchasesList = document.querySelector('.basket');
const cardEl = document.querySelector('.main__card');
const basket = {};
const basketTotalValue = document.querySelector('.basketTotalValue');

let productsCount = 0;
basketCountEl.textContent = productsCount;

document.querySelectorAll('.main__card_price').forEach(el => {
    el.textContent = `$${el.parentElement.dataset.price}`;
});


basketEl.addEventListener('click', () => {
    purchasesList.classList.toggle('hidden');
})

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    console.log(basket[id].count)
    basketCountEl.textContent = getBasketTotalCount();
    basketTotalValue.textContent = getBasketTotalValue().toFixed(2);
    renderProductInBasket(id);
}

function getBasketTotalValue() {
    return Object.values(basket).
        reduce((acc, product) => acc + product.count * product.price, 0);
}

function getBasketTotalCount() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count, 0);
}

function renderProductInBasket(id) {
    const basketRowEl = purchasesList.querySelector(`.basketRow[data-productId="${id}"]`);
    console.log(purchasesList.querySelector('.basketRow'));
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }
    console.log('hey')
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent = (basket[id].count * basket[id].price).toFixed(2);
    return;
}

function renderNewProductInBasket(productId) {
    const productRow = `
    <div class="basketRow" data-productId="${productId}">
        <div>${basket[productId].name}</div>
        <div>
            <span class="productCount">${basket[productId].count}</span>
        </div>
        <div>$${basket[productId].price}</div>
        <div>
            $<span class="productTotalRow">
                ${(basket[productId].price * basket[productId].count)}
            </span>
        </div>
    </div>
    `;
    purchasesList.querySelector('.basketRow').insertAdjacentHTML('afterend', productRow);
}

console.log(document.querySelectorAll('.main__card'));
document.querySelectorAll('.main__card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.querySelector('.featuredImgDark').style.display = 'flex';
    });
});

document.querySelectorAll('.main__card').forEach(card => {
    card.addEventListener('mouseout', () => {
        card.querySelector('.featuredImgDark').style.display = 'none';
    });
});

document.querySelectorAll('.card-button').forEach(btn => {
    btn.addEventListener('click', event => {

        setTimeout(() => {
            btn.style.backgroundColor = '#cccccc',
                2000;
        });
        btn.style.backgroundColor = '#222222';
        //не понимаю почему кнопка не работает плавно
        productsCount++;
        document.querySelector('.productsCount').textContent = productsCount;
        const addedProduct = event.target.closest('.main__card');
        const id = +addedProduct.dataset.id;
        const name = addedProduct.dataset.name;
        const price = +addedProduct.dataset.price;
        addToCart(id, name, price);
    });
});


