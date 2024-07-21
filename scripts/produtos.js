document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {name: 'Cenoura', price: '1.49', image: './images/default-produtos.png'},
        { name: 'Alface', price: '4.60', image: './images/default-produtos.png' },
        { name: 'Banana', price: '9.36', image: './images/default-produtos.png' },
        { name: 'Brócolis', price: '9.47', image: './images/default-produtos.png' },
        { name: 'Tomate', price: '3.98', image: './images/default-produtos.png' },
        { name: 'Batata', price: '2.99', image: './images/default-produtos.png' },
        { name: 'Maçã', price: '7.49', image: './images/default-produtos.png' },
        { name: 'Pepino', price: '3.45', image: './images/default-produtos.png' },
        { name: 'Cebola', price: '4.99', image: './images/default-produtos.png' },
        { name: 'Pimentão', price: '5.46', image: './images/default-produtos.png' },
        { name: 'Couve', price: '6.50', image: './images/default-produtos.png' },
        { name: 'Abobrinha', price: '4.99', image: './images/default-produtos.png' },
        { name: 'Espinafre', price: '5.99', image: './images/default-produtos.png' },
        { name: 'Repolho', price: '3.55', image: './images/default-produtos.png' },
        { name: 'Beterraba', price: '2.50', image: './images/default-produtos.png' },
        { name: 'Alho', price: '1.99', image: './images/default-produtos.png' },
        { name: 'Salsão', price: '2.99', image: './images/default-produtos.png' },
        { name: 'Rabanete', price: '1.99', image: './images/default-produtos.png' },
        { name: 'Cebolinha', price: '3.00', image: './images/default-produtos.png' },
        { name: 'Manjericão', price: '4.00', image: './images/default-produtos.png' },
        { name: 'Couve', price: '3.25', image: './images/default-produtos.png' },
        { name: 'Brócolis', price: '6.00', image: './images/default-produtos.png' },
        { name: 'Abobrinha', price: '4.50', image: './images/default-produtos.png' },
        { name: 'Pimentão', price: '4.00', image: './images/default-produtos.png' },
        { name: 'Cenoura', price: '2.87', image: './images/default-produtos.png' },
        { name: 'Tomate', price: '3.75', image: './images/default-produtos.png' },
        { name: 'Pepino', price: '2.20', image: './images/default-produtos.png' },
        { name: 'Batata-doce', price: '3.10', image: './images/default-produtos.png' },
        { name: 'Nabo', price: '3.05', image: './images/default-produtos.png' },
        { name: 'Salsinha', price: '2.50', image: './images/default-produtos.png' },
        { name: 'Abóbora', price: '5.00', image: './images/default-produtos.png' },
        { name: 'Manga', price: '7.00', image: './images/default-produtos.png' },
        { name: 'Pera', price: '6.95', image: './images/default-produtos.png' },
        { name: 'Laranja', price: '4.00', image: './images/default-produtos.png' },
        { name: 'Kiwi', price: '5.50', image: './images/default-produtos.png' },
        { name: 'Rúcula', price: '4.20', image: './images/default-produtos.png' },
        { name: 'Pães - unidade', price: '0.99', image: './images/default-produtos.png' },        
        { name: 'Leite pasteurizado', price: '4.98', image: './images/default-produtos.png' }

    ];

    const container = document.getElementById('products-container');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
        <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>R$ ${product.price}</p>
            <div class="quantity-controls">
                <button class="decrease">-</button>
                <span class="quantity">0</span>
                <button class="increase">+</button>
            </div>
        `;
        container.appendChild(productCard);
    })


})