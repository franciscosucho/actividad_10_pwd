document.getElementById('expotecForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previene el envío del formulario por defecto

    const { jsPDF } = window.jspdf;

    const fullName = document.getElementById("fullName").value;
    const dni = document.getElementById("dni").value;
    const grade = document.getElementById("grade").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const interest = document.getElementById("interest").value;

    // Validación básica de campos requeridos
    if (!fullName || !dni || !grade || !email) {
        alert("Por favor, completa todos los campos obligatorios: Nombre Completo, DNI, Grado/Curso y Correo Electrónico.");
        return;
    }

    const doc = new jsPDF();

    // Título y encabezado del comprobante
    doc.setFontSize(26);
    doc.setTextColor(0, 77, 128); // Color azul oscuro
    doc.text("Comprobante de Ingreso", 105, 25, null, null, "center");

    doc.setFontSize(14);
    doc.setTextColor(51, 51, 51); // Gris oscuro
    doc.text("Expotécnica EEST N°1 - 2025", 105, 35, null, null, "center");

    doc.setFontSize(12);
    let yOffset = 55;

    // Línea separadora
    doc.setDrawColor(0, 77, 128);
    doc.line(15, yOffset, 195, yOffset);
    yOffset += 10;

    // Datos del inscripto
    const addField = (label, value) => {
        if (value) {
            doc.text(`${label}: ${value}`, 15, yOffset);
            yOffset += 8;
        }
    };

    addField("Nombre Completo", fullName);
    addField("DNI", dni);
    addField("Grado/Curso", grade);
    addField("Correo Electrónico", email);
    addField("Teléfono de Contacto", phone);
    addField("Áreas de Interés", interest);

    // Información adicional al pie
    yOffset += 15; // Espacio antes del siguiente bloque
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Gris más claro
    doc.text("Presentar este comprobante en la entrada del evento.", 15, yOffset);
    yOffset += 6;
    doc.text(`Fecha de Generación: ${new Date().toLocaleDateString('es-AR')}`, 15, yOffset);
    yOffset += 6;
    doc.text("¡Te esperamos en la Expotécnica!", 15, yOffset);

    // Guarda el PDF con un nombre descriptivo
    doc.save(`Comprobante_Expotecnica_${fullName.replace(/\s/g, '_')}.pdf`);
});