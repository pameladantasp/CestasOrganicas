document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemsContainer = document.getElementById('cart-items');

    if (Object.keys(cart).length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="3">Seu carrinho está vazio.</td></tr>';
        document.getElementById('total-geral').textContent = 'R$0,00';
        return;
    }

    let totalGeral = 0;

    Object.values(cart).forEach(item => {
        const totalPrice = (parseFloat(item.price) * item.quantity).toFixed(2);
        totalGeral += parseFloat(totalPrice);

        const row = document.createElement('tr');

        row.innerHTML = `
            <td> ${item.name}</td>
            <td class="quantity-controls">
                <button class="decrease">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase">+</button>
            </td>
            <td>R$${item.price}</td>
        `;

        cartItemsContainer.appendChild(row);

        const decreaseButton = row.querySelector('.decrease');
        const increaseButton = row.querySelector('.increase');
        const quantitySpan = row.querySelector('.quantity');

        increaseButton.addEventListener('click', () => {
            item.quantity += 1;
            quantitySpan.textContent = item.quantity;

            updateCart(item);
            updateTotalPrice();
        });

        decreaseButton.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
                quantitySpan.textContent = item.quantity;

                updateCart(item);
                updateTotalPrice();
            } else {
                row.remove();
                removeFromCart(item);
                updateTotalPrice();
            }
        });
    });

    function updateCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        cart[item.name] = item;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function removeFromCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        delete cart[item.name];
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateTotalPrice() {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        let totalGeral = 0;

        Object.values(cart).forEach(item => {
            const totalPrice = (parseFloat(item.price) * item.quantity).toFixed(2);
            totalGeral += parseFloat(totalPrice);
        });

        const totalEntrega = 5.00;
        totalGeral += totalEntrega;

        document.getElementById('total-geral').textContent = `R$${totalGeral.toFixed(2)}`;
    }

    updateTotalPrice();

});


