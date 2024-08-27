document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {name: 'Cenoura', price: '1.49', image: './images/default-produtos.png'},
        {name: 'Alface', price: '4.60', image: './images/default-produtos.png'},
        {name: 'Banana', price: '4.36', image: './images/default-produtos.png'},
        {name: 'Brócolis', price: '7.47', image: './images/default-produtos.png'},
        {name: 'Tomate', price: '3.98', image: './images/default-produtos.png'},
        {name: 'Batata', price: '2.99', image: './images/default-produtos.png'},
        {name: 'Maçã', price: '7.49', image: './images/default-produtos.png'},
        {name: 'Pepino', price: '3.45', image: './images/default-produtos.png'},
        {name: 'Cebola', price: '4.99', image: './images/default-produtos.png'},
        {name: 'Pimentão', price: '5.46', image: './images/default-produtos.png'},
        {name: 'Couve', price: '6.50', image: './images/default-produtos.png'},
        {name: 'Abobrinha', price: '4.99', image: './images/default-produtos.png'},
        {name: 'Espinafre', price: '5.99', image: './images/default-produtos.png'},
        {name: 'Repolho', price: '3.55', image: './images/default-produtos.png'},
        {name: 'Beterraba', price: '2.50', image: './images/default-produtos.png'},
        {name: 'Alho', price: '1.99', image: './images/default-produtos.png'},
        {name: 'Salsão', price: '2.99', image: './images/default-produtos.png'},
        {name: 'Rabanete', price: '1.99', image: './images/default-produtos.png'},
        {name: 'Cebolinha', price: '3.00', image: './images/default-produtos.png'},
        {name: 'Manjericão', price: '4.00', image: './images/default-produtos.png'},
        {name: 'Couve', price: '3.25', image: './images/default-produtos.png'},
        {name: 'Brócolis', price: '6.00', image: './images/default-produtos.png'},
        {name: 'Abobrinha', price: '4.50', image: './images/default-produtos.png'},
        {name: 'Pimentão', price: '4.00', image: './images/default-produtos.png'},
        {name: 'Cenoura', price: '2.87', image: './images/default-produtos.png'},
        {name: 'Tomate', price: '3.75', image: './images/default-produtos.png'},
        {name: 'Pepino', price: '2.20', image: './images/default-produtos.png'},
        {name: 'Batata-doce', price: '3.10', image: './images/default-produtos.png'},
        {name: 'Nabo', price: '3.05', image: './images/default-produtos.png'},
        {name: 'Salsinha', price: '2.50', image: './images/default-produtos.png'},
        {name: 'Abóbora', price: '5.00', image: './images/default-produtos.png'},
        {name: 'Manga', price: '7.00', image: './images/default-produtos.png'},
        {name: 'Pera', price: '6.95', image: './images/default-produtos.png'},
        {name: 'Laranja', price: '4.00', image: './images/default-produtos.png'},
        {name: 'Kiwi', price: '5.50', image: './images/default-produtos.png'},
        {name: 'Rúcula', price: '4.20', image: './images/default-produtos.png'},
        {name: 'Pães - unidade', price: '0.99', image: './images/default-produtos.png'},
        {name: 'Leite pasteurizado', price: '4.98', image: './images/default-produtos.png'}
    ];

    const container = document.getElementById('products-container');
    const searchInput = document.getElementById('search-input');
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Função para renderizar produtos
    function renderProducts(productsToRender) {
        container.innerHTML = '';
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const productQuantity = cart[product.name] ? cart[product.name].quantity : 0;
            const bgColor = productQuantity ? 'transparent' : '';

            productCard.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>R$ ${product.price}</p>
                <div class="quantity-controls">
                    <button class="decrease">-</button>
                    <span class="quantity" style="background-color: ${bgColor};">${productQuantity}</span>
                    <button class="increase">+</button>
                </div>
            `;

            container.appendChild(productCard);

            const decreaseButton = productCard.querySelector('.decrease');
            const increaseButton = productCard.querySelector('.increase');
            const quantitySpan = productCard.querySelector('.quantity');

            increaseButton.addEventListener('click', () => {
                let quantity = parseInt(quantitySpan.textContent);
                quantity += 1;
                quantitySpan.textContent = quantity;

                updateCart(product, quantity);
            });

            decreaseButton.addEventListener('click', () => {
                let quantity = parseInt(quantitySpan.textContent);
                if (quantity > 0) {
                    quantity -= 1;
                    quantitySpan.textContent = quantity;
                    updateCart(product, quantity);
                }
            });
        });
    }

    // Função para atualizar o carrinho
    function updateCart(product, quantity) {
        if (quantity === 0) {
            delete cart[product.name];
        } else {
            cart[product.name] = { ...product, quantity: quantity };
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Filtrar produtos
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    // Atualizar carrinho na carga da página
    function updateCartOnPageLoad() {
        cart = JSON.parse(localStorage.getItem('cart')) || {};
        renderProducts(products);
    }

    updateCartOnPageLoad();
});
