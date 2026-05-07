document.addEventListener('DOMContentLoaded', () => {
    let carrito = [];
    const cartCountElement = document.getElementById('cart-count');

    // --- 1. LÓGICA DE LA TIENDA (FILTROS) ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const products = document.querySelectorAll('.producto-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const categoriaSeleccionada = button.textContent.toLowerCase().trim();

                products.forEach(product => {
                    const productCategory = product.getAttribute('data-category').toLowerCase();
                    if (categoriaSeleccionada === 'todos' || productCategory === categoriaSeleccionada) {
                        product.style.display = 'flex';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 2. AÑADIR AL CARRITO ---
    const addButtons = document.querySelectorAll('.btn-add');
    if (addButtons.length > 0) {
        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.producto-card');
                const nombre = card.querySelector('h3').textContent;
                const cantidad = card.querySelector('input').value;
                
                const selects = card.querySelectorAll('select');
                let detalles = Array.from(selects).map(s => s.value).join(' / ');

                carrito.push({ nombre, cantidad, detalles });
                if (cartCountElement) cartCountElement.textContent = carrito.length;
                
                button.textContent = "¡Listo!";
                button.style.backgroundColor = "#25D366";
                setTimeout(() => {
                    button.textContent = "Añadir";
                    button.style.backgroundColor = "";
                }, 800);
            });
        });
    }

    // --- 3. ENVIAR CARRITO POR WHATSAPP ---
    const btnWA = document.querySelector('.btn-whatsapp-send');
    if (btnWA) {
        btnWA.addEventListener('click', () => {
            if (carrito.length === 0) return alert("El carrito está vacío");

            let texto = "Hola ABRITECH! Presupuesto:\n";
            carrito.forEach(p => texto += `- ${p.nombre} [${p.detalles}] x${p.cantidad}\n`);

            const url = `https://wa.me/5491122814493?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank');
        });
    }

    // --- 4. FORMULARIO DE CONTACTO (UNIFICADO) ---
    const formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            const adjunto = document.getElementById('adjunto');
            const tieneArchivo = adjunto && adjunto.files.length > 0;
            
            let avisoArchivo = tieneArchivo ? "\n\n📌 *Nota:* Te enviaré el archivo adjunto a continuación." : "";
            
            const textoWA = `Hola! Mi nombre es ${nombre}. Mi consulta sobre *${asunto}* es: ${mensaje}${avisoArchivo}`;
            const url = `https://wa.me/5491122814493?text=${encodeURIComponent(textoWA)}`;
            
            window.open(url, '_blank');
        });
    }
}); // Cierre correcto de DOMContentLoaded