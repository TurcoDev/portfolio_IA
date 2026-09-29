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
        <div class="contacto-container">
            <div class="contacto-header">
                <h2>📬 Contacto</h2>
                <p>¿Quieres hablar conmigo? Envíame un mensaje y te responderé lo antes posible.</p>
            </div>

            <form id="formulario-contacto" class="formulario-contacto">
                <!-- NOMBRE -->
                <div class="form-grupo">
                    <label for="nombre">Nombre completo *</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre"
                        placeholder="Tu nombre"
                        required
                    >
                    <span class="error-mensaje" id="error-nombre"></span>
                </div>

                <!-- EMAIL -->
                <div class="form-grupo">
                    <label for="email">Email *</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder="tu@email.com"
                        required
                    >
                    <span class="error-mensaje" id="error-email"></span>
                </div>

                <!-- TELÉFONO (opcional) -->
                <div class="form-grupo">
                    <label for="telefono">Teléfono (opcional)</label>
                    <input 
                        type="tel" 
                        id="telefono" 
                        name="telefono"
                        placeholder="+34 666 123 456"
                    >
                    <span class="error-mensaje" id="error-telefono"></span>
                </div>

                <!-- ASUNTO -->
                <div class="form-grupo">
                    <label for="asunto">Asunto *</label>
                    <input 
                        type="text" 
                        id="asunto" 
                        name="asunto"
                        placeholder="¿Sobre qué quieres hablar?"
                        required
                    >
                    <span class="error-mensaje" id="error-asunto"></span>
                </div>

                <!-- MENSAJE -->
                <div class="form-grupo">
                    <label for="mensaje">Mensaje *</label>
                    <textarea 
                        id="mensaje" 
                        name="mensaje"
                        placeholder="Escribe tu mensaje aquí..."
                        rows="6"
                        required
                    ></textarea>
                    <span class="error-mensaje" id="error-mensaje"></span>
                </div>

                <!-- BOTÓN ENVIAR -->
                <button type="submit" class="btn-enviar">
                    <span class="btn-texto">Enviar mensaje</span>
                    <span class="btn-icono">✉️</span>
                </button>

                <!-- MENSAJE DE ÉXITO -->
                <div class="mensaje-exito" id="mensaje-exito" style="display: none;">
                    <p>✅ ¡Mensaje enviado correctamente! Te responderé pronto.</p>
                </div>

                <!-- MENSAJE DE ERROR -->
                <div class="mensaje-error" id="mensaje-error" style="display: none;">
                    <p>❌ Hubo un problema al enviar el mensaje. Intenta de nuevo.</p>
                </div>
            </form>

            <!-- CANALES ALTERNATIVOS -->
            <div class="contacto-alternativo">
                <h3>Otros canales de contacto:</h3>
                <div class="lista-contacto">
                    <a href="mailto:hola@mariaperez.dev" class="boton-contacto email">
                        <span class="icono">📧</span>
                        <span class="texto">hola@mariaperez.dev</span>
                    </a>
                    <a href="#" class="boton-contacto twitter">
                        <span class="icono">🐦</span>
                        <span class="texto">Twitter</span>
                    </a>
                    <a href="#" class="boton-contacto linkedin">
                        <span class="icono">💼</span>
                        <span class="texto">LinkedIn</span>
                    </a>
                    <a href="#" class="boton-contacto github">
                        <span class="icono">💻</span>
                        <span class="texto">GitHub</span>
                    </a>
                </div>
            </div>
        </div>
    `,

    'pokemon': `
        <div class="pokemon-container">
            <div class="pokemon-header">
                <h2>Pokédex</h2>
                <p>Explora 30 Pokémon increíbles</p>
            </div>

            <div class="pokemon-filtros">
                <div class="busqueda">
                    <input 
                        type="text" 
                        id="busqueda" 
                        class="input-busqueda" 
                        placeholder="🔍 Buscar por nombre..."
                    >
                </div>

                <div class="filtro-tipos">
                    <label for="filtro-tipo">Filtrar por tipo:</label>
                    <select id="filtro-tipo" class="select-tipo">
                        <option value="">Todos</option>
                        <option value="fire">🔥 Fire</option>
                        <option value="water">💧 Water</option>
                        <option value="grass">🌿 Grass</option>
                        <option value="electric">⚡ Electric</option>
                        <option value="psychic">💜 Psychic</option>
                        <option value="normal">⭕ Normal</option>
                        <option value="flying">🪶 Flying</option>
                        <option value="bug">🐛 Bug</option>
                        <option value="poison">☠️ Poison</option>
                        <option value="ground">🏜️ Ground</option>
                        <option value="rock">🪨 Rock</option>
                        <option value="ghost">👻 Ghost</option>
                        <option value="ice">❄️ Ice</option>
                        <option value="dragon">🐉 Dragon</option>
                        <option value="dark">🌑 Dark</option>
                        <option value="steel">⚙️ Steel</option>
                        <option value="fairy">🧚 Fairy</option>
                        <option value="fighting">👊 Fighting</option>
                    </select>
                </div>
            </div>

            <div class="pokemon-grid" id="pokemon-grid">
                <!-- Las cards se inyectarán aquí por JavaScript -->
            </div>

            <div class="sin-resultados" id="sin-resultados" style="display: none;">
                <p>😕 No se encontraron Pokémon con esos criterios</p>
            </div>
        </div>
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

    // Si es la sección de Pokémon, inicializar Pokédex
    if (nombre === 'pokemon' && typeof inicializarPokedex === 'function') {
        // Esperar a que el DOM se actualice
        setTimeout(function() {
            inicializarPokedex();
        }, 50);
    }

    // Si es la sección de Contacto, inicializar formulario
    if (nombre === 'contacto' && typeof inicializarFormularioContacto === 'function') {
        setTimeout(function() {
            inicializarFormularioContacto();
        }, 50);
    }
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