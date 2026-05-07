// Variables globales
let carrito = [];
const cartCountElement = document.getElementById('cart-count');

// 1. FUNCIONAMIENTO DE FILTROS
const filterButtons = document.querySelectorAll('.btn-filter');
const products = document.querySelectorAll('.producto-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Cambiar estado activo de los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const categoriaSubrayada = button.textContent.toLowerCase();

        // Filtrar productos
        products.forEach(product => {
            // Nota: Aquí podrías agregar un data-category al HTML, 
            // por ahora simulamos la lógica básica
            if (categoriaSubrayada === 'todos') {
                product.style.display = 'flex';
            } else {
                // Lógica simple: si el texto del botón está en el contenido de la card
                const contenido = product.innerText.toLowerCase();
                product.style.display = contenido.includes(categoriaSubrayada.slice(0, -1)) ? 'flex' : 'none';
            }
        });
    });
});

// 2. AÑADIR AL CARRITO
const addButtons = document.querySelectorAll('.btn-add');

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.producto-card');
        const nombre = card.querySelector('h3').textContent;
        const cantidad = card.querySelector('input').value;
        
        // Capturar las opciones seleccionadas (espesor, medida, etc)
        const selects = card.querySelectorAll('select');
        let detalles = "";
        selects.forEach(select => {
            detalles += ` ${select.value}`;
        });

        const producto = {
            nombre: nombre,
            cantidad: cantidad,
            detalles: detalles
        };

        carrito.push(producto);
        actualizarContador();
        
        // Efecto visual en el botón
        const originalText = button.textContent;
        button.textContent = "¡Agregado!";
        button.style.background = "#25D366";
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = "";
        }, 1000);
    });
});

function actualizarContador() {
    cartCountElement.textContent = carrito.length;
}

// 3. ENVIAR A WHATSAPP
const btnWA = document.querySelector('.btn-whatsapp-send');

btnWA.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega algunos materiales primero.");
        return;
    }

    let mensaje = "Hola ABRITECH! Quisiera pedir un presupuesto por los siguientes materiales:\n\n";
    
    carrito.forEach((prod, index) => {
        mensaje += `${index + 1}. ${prod.nombre} (${prod.detalles}) - Cantidad: ${prod.cantidad}\n`;
    });

    const numeroTel = "5491122814493"; // Tu número de WhatsApp
    const url = `https://wa.me/${numeroTel}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, '_blank');
});