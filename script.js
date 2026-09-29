// ============================================
// 1. CONTENIDO DE CADA SECCIÓN
// ============================================
// Guardamos el HTML de cada sección como texto.
// Es más ordenado que tenerlo todo suelto en el HTML.

const secciones = {
    'sobre-mi': `
        <h2>Sobre mí</h2>
        <p>¡Hola! Soy <strong>María Pérez</strong>, desarrolladora web en formación apasionada por crear interfaces limpias y funcionales.</p>
        <p>Actualmente estoy aprendiendo <strong>HTML, CSS y JavaScript</strong>, y este portfolio es uno de mis primeros proyectos completos.</p>
        <p>Me gusta combinar diseño y código para que las cosas no solo funcionen, sino que también se vean bien.</p>
    `,

    'proyectos': `
        <h2>Proyectos</h2>
        <p>Algunos trabajos en los que he estado practicando:</p>
        <div class="grid-proyectos">
            <div class="tarjeta">
                <h3>🌐 Portfolio personal</h3>
                <p>Esta misma página. Hecha con HTML, CSS Grid y JavaScript vanilla.</p>
            </div>
            <div class="tarjeta">
                <h3>📝 Lista de tareas</h3>
                <p>App para gestionar tareas pendientes con almacenamiento local.</p>
            </div>
            <div class="tarjeta">
                <h3>🌦️ App del clima</h3>
                <p>Consulta el clima de cualquier ciudad usando una API pública.</p>
            </div>
            <div class="tarjeta">
                <h3>🎮 Juego de memoria</h3>
                <p>Clásico juego de emparejar cartas, con puntuación y temporizador.</p>
            </div>
        </div>
    `,

    'contacto': `
        <h2>Contacto</h2>
        <p>¿Quieres hablar conmigo sobre un proyecto o simplemente saludar? Aquí tienes mis canales:</p>
        <ul class="lista-contacto">
            <li>📧 Email: <a href="mailto:hola@mariaperez.dev">hola@mariaperez.dev</a></li>
            <li>🐦 Twitter: <a href="#">@mariaperez</a></li>
            <li>💼 LinkedIn: <a href="#">/in/mariaperez</a></li>
            <li>💻 GitHub: <a href="#">@mariaperez</a></li>
        </ul>
    `
};

// ============================================
// 2. REFERENCIAS AL DOM
// ============================================
// document.querySelector busca el primer elemento
// que coincida con el selector CSS que le pasamos.

const main = document.getElementById('main');
const botones = document.querySelectorAll('.menu-item');

// ============================================
// 3. FUNCIÓN PARA MOSTRAR UNA SECCIÓN
// ============================================
function mostrarSeccion(nombre) {
    // Colocamos el HTML de la sección dentro del main
    main.innerHTML = secciones[nombre];

    // Quitamos la clase 'activo' de todos los botones
    botones.forEach(function (boton) {
        boton.classList.remove('activo');

        // Y se la ponemos solo al botón cuya data-seccion coincida
        if (boton.dataset.seccion === nombre) {
            boton.classList.add('activo');
        }
    });

    // Truco para reiniciar la animación de aparición
    // (sin esto, la animación solo se ejecutaría la primera vez)
    main.style.animation = 'none';
    void main.offsetWidth; // fuerza al navegador a recalcular
    main.style.animation = '';
}

// ============================================
// 4. ESCUCHAR LOS CLICS DEL MENÚ
// ============================================
botones.forEach(function (boton) {
    boton.addEventListener('click', function () {
        // dataset.seccion lee el atributo data-seccion del HTML
        const nombre = boton.dataset.seccion;
        mostrarSeccion(nombre);
    });
});

// ============================================
// 5. ARRANCAR
// ============================================
// Al cargar la página mostramos "sobre-mi" por defecto
mostrarSeccion('sobre-mi');