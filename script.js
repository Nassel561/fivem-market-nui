document.addEventListener('DOMContentLoaded', () => {
    const storeContainer = document.querySelector('.items');
    const cartContainer = document.querySelector('#cart-items');
    const clearButton = document.getElementById('clear-button');
    const payButton = document.getElementById('pay-button');

    const products = [
        { name: "Iphone 12", price: 9500, image: "iphone.png" },
        { name: "Kamera", price: 12500, image: "camera.png" },
        { name: "Macbook Pro", price: 12000, image: "macbook.png" },
        { name: "Apple Ipad Pro", price: 7000, image: "ipad.png" },
        
    ];

    let cart = {};
    const MAX_ITEMS = 5;

    products.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('item');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const name = document.createElement('div');
        name.classList.add('item-name');
        name.textContent = product.name;

        const price = document.createElement('div');
        price.classList.add('item-price');
        price.textContent = `${product.price} kr`;

        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(price);

        item.addEventListener('click', () => {
            addToCart(product);
        });

        storeContainer.appendChild(item);
    });

    function addToCart(product) {
        if (Object.keys(cart).length >= MAX_ITEMS && !cart[product.name]) {
            alert('Du kan bara lägga till max 5 olika produkter i kundvagnen!');
            return;
        }

        if (cart[product.name]) {
            cart[product.name].quantity++;
        } else {
            cart[product.name] = { ...product, quantity: 1 };
        }

        updateCart();
    }

    function updateCart() {
        cartContainer.innerHTML = '';

        let totalCost = 0;

        for (let productName in cart) {
            const product = cart[productName];

            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;

            const name = document.createElement('span');
            name.classList.add('cart-item-name');
            name.textContent = `${product.name} x${product.quantity}`;

            const price = document.createElement('span');
            price.classList.add('cart-item-price');
            const totalPrice = product.price * product.quantity;
            price.textContent = `${totalPrice} kr`;

            const actions = document.createElement('div');
            actions.classList.add('cart-item-actions');

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.addEventListener('click', () => {
                cart[productName].quantity++;
                updateCart();
            });

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.addEventListener('click', () => {
                if (cart[productName].quantity > 1) {
                    cart[productName].quantity--;
                    updateCart();
                }
            });

            actions.appendChild(plusButton);
            actions.appendChild(minusButton);

            cartItem.appendChild(img);
            cartItem.appendChild(name);
            cartItem.appendChild(price);
            cartItem.appendChild(actions);

            cartContainer.appendChild(cartItem);

            totalCost += totalPrice;
        }

        const totalCostElement = document.getElementById('total-cost');
        if (!totalCostElement) {
            const totalCostElement = document.createElement('div');
            totalCostElement.id = 'total-cost';
            totalCostElement.textContent = `Total: ${totalCost} kr`;
            document.querySelector('.cart-actions').appendChild(totalCostElement);
        } else {
            totalCostElement.textContent = `Total: ${totalCost} kr`;
        }
    }

    clearButton.addEventListener('click', () => {
        cart = {};
        updateCart();
    });

    payButton.addEventListener('click', () => {
        alert('Betalning genomförd (denna funktion är inte implementerad).');
    });
});
