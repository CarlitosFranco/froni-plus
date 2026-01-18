// Datos de productos
const productos = [
    {
        id: '1',
        name: 'Raqueta Profesional Frontón',
        price: 249.90,
        category: 'raquetas',
        img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4312e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        description: 'Raqueta profesional de frontón, modelo avanzado con mango ergonómico y superficie de golpe de alta resistencia. Ideal para jugadores de nivel intermedio a avanzado.'
    },
    {
        id: '2',
        name: 'Pelotas Competitivas',
        price: 39.90,
        category: 'pelotas',
        img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1107&q=80',
        description: 'Pack de 3 pelotas oficiales para frontón. Alta durabilidad y rebote controlado para partidas profesionales. Material de primera calidad.'
    },
    {
        id: '3',
        name: 'Kit Completo Frontón',
        price: 89.90,
        category: 'accesorios',
        img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        description: 'Kit incluye: 1 protector de raqueta, 2 overgrips, 1 cordón de repuesto y bolsa deportiva. Todo lo necesario para el cuidado de tu equipo.'
    },
    {
        id: '4',
        name: 'Raqueta Avanzada Carbon',
        price: 329.90,
        category: 'raquetas',
        img: 'https://images.unsplash.com/photo-1554387662-9b8c5c5c9b5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        description: 'Fabricada en fibra de carbono, mayor potencia y control. Ideal para jugadores de nivel intermedio a avanzado. Peso equilibrado para mejor manejo.'
    },
    {
        id: '5',
        name: 'Raqueta Iniciación Frontón',
        price: 179.90,
        category: 'raquetas',
        img: 'https://images.unsplash.com/photo-1595435934249-5d33b7f92c62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        description: 'Perfecta para principiantes. Diseño ligero y fácil manejo. Incluye funda protectora. Ideal para aprender y desarrollar técnica.'
    },
    {
        id: '6',
        name: 'Pack Pelotas Premium',
        price: 59.90,
        category: 'pelotas',
        img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1107&q=70',
        description: 'Pack de 6 pelotas de alta durabilidad. Rebote consistente y mayor resistencia al desgaste. Para entrenamiento intensivo.'
    },
    {
        id: '7',
        name: 'Overgrips Profesionales',
        price: 24.90,
        category: 'accesorios',
        img: 'https://images.unsplash.com/photo-1571019614246-7e1c6298d0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        description: 'Set de 5 overgrips absorbentes. Mejor agarre y comodidad. Material transpirable que absorbe la humedad.'
    },
    {
        id: '8',
        name: 'Bolsa Deportiva Frontón',
        price: 79.90,
        category: 'accesorios',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        description: 'Bolsa espaciosa con compartimentos para raquetas, pelotas y accesorios. Material resistente al agua y cómodas correas.'
    }
];

// Cargar productos en la página
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsGrid) {
        let productsHTML = '';
        
        productos.forEach(product => {
            productsHTML += `
            <div class="product-card" data-category="${product.category}">
                <div class="product-img">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-category">${getCategoryName(product.category)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <div class="price">S/ ${product.price.toFixed(2)} <span>${getPriceUnit(product.category)}</span></div>
                        <button class="buy-btn add-to-cart-btn" 
                                data-id="${product.id}" 
                                data-name="${product.name}" 
                                data-price="${product.price}" 
                                data-img="${product.img}"
                                data-category="${product.category}">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
            `;
        });
        
        productsGrid.innerHTML = productsHTML;
    }
    
    // Filtros de productos
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrar productos
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Función para obtener nombre de categoría
function getCategoryName(category) {
    switch(category) {
        case 'raquetas': return 'Raquetas';
        case 'pelotas': return 'Pelotas';
        case 'accesorios': return 'Accesorios';
        default: return 'Producto';
    }
}

// Función para obtener unidad de precio
function getPriceUnit(category) {
    switch(category) {
        case 'raquetas': return 'c/u';
        case 'pelotas': return 'pack';
        case 'accesorios': return 'kit';
        default: return '';
    }
}