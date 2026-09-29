// ============================================
// POKÉDEX - Aplicación de Pokémon
// ============================================

// 1. VARIABLES GLOBALES
// ============================================
let pokemonesCargados = [];
let pokemonesFiltrados = [];

// 2. FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ============================================
async function inicializarPokedex() {
    // Buscar los elementos (ahora sí existen en el DOM)
    const grid = document.getElementById('pokemon-grid');
    const inputBusqueda = document.getElementById('busqueda');
    const selectTipo = document.getElementById('filtro-tipo');
    const sinResultados = document.getElementById('sin-resultados');

    // Validar que los elementos existan
    if (!grid || !inputBusqueda || !selectTipo || !sinResultados) {
        console.error('❌ No se encontraron los elementos necesarios');
        return;
    }

    // Si ya tenemos pokémon cargados, no hacer fetch nuevamente
    if (pokemonesCargados.length > 0) {
        console.log('✅ Pokémon ya cargados en memoria');
        renderizarPokemones(grid, sinResultados);
        return;
    }

    try {
        // Mostrar mensaje de carga
        grid.innerHTML = '<div class="cargando">⏳ Cargando Pokémon...</div>';

        // FETCH 1: Obtener lista de 30 Pokémon
        console.log('📡 Obteniendo lista de Pokémon...');
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
        
        if (!respuesta.ok) {
            throw new Error(`Error en API: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // FETCH 2: Obtener detalles de cada Pokémon (en paralelo)
        console.log('📡 Obteniendo detalles de cada Pokémon...');
        const promesas = datos.results.map(pokemon => 
            fetch(pokemon.url)
                .then(res => res.json())
                .catch(err => {
                    console.error(`Error cargando ${pokemon.name}:`, err);
                    return null;
                })
        );

        // Ejecutar todas las promesas en paralelo
        const resultados = await Promise.all(promesas);
        
        // Filtrar resultados nulos
        pokemonesCargados = resultados.filter(p => p !== null);

        console.log(`✅ ${pokemonesCargados.length} Pokémon cargados correctamente`);

        // Inicializar filtrados con todos
        pokemonesFiltrados = [...pokemonesCargados];

        // Renderizar las cards
        renderizarPokemones(grid, sinResultados);

        // Agregar event listeners
        inputBusqueda.addEventListener('input', () => {
            filtrar(grid, sinResultados, inputBusqueda, selectTipo);
        });

        selectTipo.addEventListener('change', () => {
            filtrar(grid, sinResultados, inputBusqueda, selectTipo);
        });

    } catch (error) {
        console.error('❌ Error al cargar Pokémon:', error);
        grid.innerHTML = `<div class="error">❌ Error al cargar los datos: ${error.message}</div>`;
    }
}

// 3. RENDERIZAR TODAS LAS CARDS
// ============================================
function renderizarPokemones(grid, sinResultados) {
    grid.innerHTML = '';

    if (pokemonesFiltrados.length === 0) {
        grid.style.display = 'none';
        sinResultados.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    sinResultados.style.display = 'none';

    // Crear y agregar cada card
    pokemonesFiltrados.forEach(pokemon => {
        const card = crearCardPokemon(pokemon);
        grid.appendChild(card);
    });
}

// 4. CREAR UNA CARD INDIVIDUAL
// ============================================
function crearCardPokemon(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    // Obtener imagen (con fallback)
    let imagen = 'https://via.placeholder.com/140?text=No+image';
    
    if (pokemon.sprites?.other?.['official-artwork']?.front_default) {
        imagen = pokemon.sprites.other['official-artwork'].front_default;
    } else if (pokemon.sprites?.front_default) {
        imagen = pokemon.sprites.front_default;
    }

    // Obtener tipos
    const tipos = pokemon.types?.map(t => t.type.name) || [];
    const tiposHTML = tipos.map(tipo => 
        `<span class="pokemon-tipo tipo-${tipo}">${tipo}</span>`
    ).join('');

    // Obtener movimientos (máximo 2)
    const movimientos = pokemon.moves?.slice(0, 2)?.map(m => m.move.name) || [];
    const movimientosHTML = movimientos.length > 0 
        ? movimientos.map(move => `<span class="pokemon-poder">${move}</span>`).join('')
        : '<span class="pokemon-poder">N/A</span>';

    // HTML de la card
    card.innerHTML = `
        <div class="pokemon-imagen">
            <img 
                src="${imagen}" 
                alt="${pokemon.name}" 
                loading="lazy"
                onerror="this.src='https://via.placeholder.com/140?text=No+image'"
            >
        </div>
        
        <div class="pokemon-contenido">
            <h3 class="pokemon-nombre">${pokemon.name}</h3>
            
            <div class="pokemon-tipos">
                ${tiposHTML || '<span style="color: #999; font-size: 0.85rem;">Sin tipo</span>'}
            </div>

            <div class="pokemon-poderes">
                <strong>Poderes:</strong>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${movimientosHTML}
                </div>
            </div>

            <div class="pokemon-id">
                #${pokemon.id || 'N/A'}
            </div>
        </div>
    `;

    return card;
}

// 5. FILTRAR Y BUSCAR
// ============================================
function filtrar(grid, sinResultados, inputBusqueda, selectTipo) {
    const textoBusqueda = inputBusqueda.value.toLowerCase().trim();
    const tipoSeleccionado = selectTipo.value.toLowerCase();

    pokemonesFiltrados = pokemonesCargados.filter(pokemon => {
        // Criterio 1: Búsqueda por nombre
        const coincideNombre = pokemon.name.toLowerCase().includes(textoBusqueda);

        // Criterio 2: Filtro por tipo
        const tipos = pokemon.types?.map(t => t.type.name) || [];
        const coincideTipo = tipoSeleccionado === '' || tipos.includes(tipoSeleccionado);

        // Ambos criterios deben cumplirse
        return coincideNombre && coincideTipo;
    });

    renderizarPokemones(grid, sinResultados);
}


