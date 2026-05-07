function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const span = document.getElementById("cart-count");
    if (span) span.innerText = carrito.length;
}

function cargarCarrito() {
    const contenedor = document.getElementById("lista-carrito");
    if (!contenedor) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarContador();

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p style='text-align:center; padding:40px;'>Tu lista está vacía.</p>";
        return;
    }

    contenedor.innerHTML = carrito.map((item, index) => `
        <div class="card-item" style="display:flex; justify-content:space-between; align-items:center; background:white; margin-bottom:10px; padding:15px; border-radius:8px; border-left: 5px solid #ffcc00;">
            <span><strong>${item.cantidad}</strong> x ${item.nombre}</span>
            <button onclick="eliminarItem(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">✕</button>
        </div>
    `).join("");
}

function eliminarItem(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

function finalizarPresupuesto() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) return alert("Tu lista está vacía.");

    const opciones = document.getElementsByName("entrega");
    let sucursal = "";
    for (const r of opciones) { if (r.checked) { sucursal = r.value; break; } }

    if (!sucursal) return alert("Por favor, seleccioná una sucursal para retirar.");

    let tel = (sucursal.includes("Monte Grande")) ? "5491122814493" : "5491158796899";
    
    // Mensaje ultra profesional
    let texto = `*SOLICITUD DE PRESUPUESTO - ABRITECH*\n`;
    texto += `━━━━━━━━━━━━━━━━━━━━\n`;
    texto += `📍 *Sucursal:* ${sucursal}\n\n`;
    texto += `*DETALLE DEL PEDIDO:*\n`;
    carrito.forEach(i => texto += `📦 ${i.cantidad} x ${i.nombre}\n`);
    texto += `━━━━━━━━━━━━━━━━━━━━\n`;
    texto += `_Por favor, confírmenme stock y precio actual._`;

    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(texto)}`, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    cargarCarrito();
});