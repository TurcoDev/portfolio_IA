// ============================================
// LÓGICA DEL FORMULARIO DE CONTACTO
// ============================================

/**
 * Inicializa el formulario de contacto
 * Se ejecuta cuando el usuario navega a la sección "Contacto"
 */
function inicializarFormularioContacto() {
    const formulario = document.getElementById('formulario-contacto');
    
    if (!formulario) {
        console.warn('Formulario de contacto no encontrado');
        return;
    }

    // Limpiar errores previos
    limpiarErrores();

    // Escuchar el envío del formulario
    formulario.addEventListener('submit', manejarEnvio);

    // Validación en tiempo real (mientras escribe)
    const inputs = formulario.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validarCampo);
        input.addEventListener('input', validarCampo);
    });
}

/**
 * Maneja el envío del formulario
 */
function manejarEnvio(evento) {
    evento.preventDefault();

    // Limpiar errores previos
    limpiarErrores();

    // Obtener datos del formulario
    const formulario = evento.target;
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validar todos los campos
    let esValido = true;

    if (!nombre) {
        mostrarError('nombre', 'El nombre es requerido');
        esValido = false;
    }

    if (!email || !validarEmail(email)) {
        mostrarError('email', 'Email inválido');
        esValido = false;
    }

    if (telefono && !validarTelefono(telefono)) {
        mostrarError('telefono', 'Teléfono inválido (ej: +34 666 123 456)');
        esValido = false;
    }

    if (!asunto) {
        mostrarError('asunto', 'El asunto es requerido');
        esValido = false;
    }

    if (!mensaje) {
        mostrarError('mensaje', 'El mensaje es requerido');
        esValido = false;
    }

    // Si hay errores, detener aquí
    if (!esValido) {
        return;
    }

    // Mostrar estado de envío
    const btnEnviar = formulario.querySelector('.btn-enviar');
    const textoOriginal = btnEnviar.textContent;
    btnEnviar.disabled = true;
    btnEnviar.textContent = '⏳ Enviando...';

    // Simular envío (en producción sería un fetch a un servidor)
    setTimeout(() => {
        // Aquí iría el fetch real a un endpoint de servidor
        console.log('Datos del formulario:', {
            nombre,
            email,
            telefono,
            asunto,
            mensaje
        });

        // Mostrar mensaje de éxito
        mostrarMensajeExito();

        // Limpiar formulario
        formulario.reset();

        // Restaurar botón
        btnEnviar.disabled = false;
        btnEnviar.textContent = textoOriginal;

        // Ocultar mensaje de éxito después de 4 segundos
        setTimeout(() => {
            ocultarMensajeExito();
        }, 4000);
    }, 1500);
}

/**
 * Valida un campo individual
 */
function validarCampo(evento) {
    const campo = evento.target;
    const id = campo.id;
    const valor = campo.value.trim();

    let error = '';

    switch (id) {
        case 'nombre':
            if (!valor) {
                error = 'El nombre es requerido';
            } else if (valor.length < 3) {
                error = 'El nombre debe tener al menos 3 caracteres';
            }
            break;

        case 'email':
            if (!valor) {
                error = 'El email es requerido';
            } else if (!validarEmail(valor)) {
                error = 'Email inválido';
            }
            break;

        case 'telefono':
            if (valor && !validarTelefono(valor)) {
                error = 'Formato de teléfono inválido';
            }
            break;

        case 'asunto':
            if (!valor) {
                error = 'El asunto es requerido';
            } else if (valor.length < 5) {
                error = 'El asunto debe tener al menos 5 caracteres';
            }
            break;

        case 'mensaje':
            if (!valor) {
                error = 'El mensaje es requerido';
            } else if (valor.length < 10) {
                error = 'El mensaje debe tener al menos 10 caracteres';
            }
            break;
    }

    if (error) {
        mostrarError(id, error);
        campo.classList.add('campo-error');
    } else {
        limpiarError(id);
        campo.classList.remove('campo-error');
    }
}

/**
 * Valida el formato de un email
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida el formato de un teléfono
 * Acepta formatos: 666123456, +34 666 123 456, (666) 123-456, etc.
 */
function validarTelefono(telefono) {
    // Eliminar espacios y caracteres especiales para validar solo dígitos
    const soloDigitos = telefono.replace(/\D/g, '');
    return soloDigitos.length >= 9 && soloDigitos.length <= 15;
}

/**
 * Muestra un error en un campo específico
 */
function mostrarError(campoId, mensaje) {
    const elemento = document.getElementById(`error-${campoId}`);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
    }
}

/**
 * Limpia el error de un campo específico
 */
function limpiarError(campoId) {
    const elemento = document.getElementById(`error-${campoId}`);
    if (elemento) {
        elemento.textContent = '';
        elemento.style.display = 'none';
    }
}

/**
 * Limpia todos los errores
 */
function limpiarErrores() {
    const errores = document.querySelectorAll('.error-mensaje');
    errores.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    const campos = document.querySelectorAll('.form-grupo input, .form-grupo textarea');
    campos.forEach(campo => {
        campo.classList.remove('campo-error');
    });
}

/**
 * Muestra el mensaje de éxito
 */
function mostrarMensajeExito() {
    const elemento = document.getElementById('mensaje-exito');
    if (elemento) {
        elemento.style.display = 'block';
    }

    // Ocultar mensaje de error si estaba visible
    const elementoError = document.getElementById('mensaje-error');
    if (elementoError) {
        elementoError.style.display = 'none';
    }
}

/**
 * Oculta el mensaje de éxito
 */
function ocultarMensajeExito() {
    const elemento = document.getElementById('mensaje-exito');
    if (elemento) {
        elemento.style.display = 'none';
    }
}

/**
 * Muestra el mensaje de error
 */
function mostrarMensajeErrorGeneral() {
    const elemento = document.getElementById('mensaje-error');
    if (elemento) {
        elemento.style.display = 'block';
    }

    // Ocultar mensaje de éxito si estaba visible
    const elementoExito = document.getElementById('mensaje-exito');
    if (elementoExito) {
        elementoExito.style.display = 'none';
    }
}
