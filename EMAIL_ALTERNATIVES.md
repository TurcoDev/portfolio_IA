# 📧 Alternativas para Enviar Emails desde Frontend (Solo JavaScript)

## 📋 Resumen Ejecutivo

Este documento analiza **6 alternativas gratuitas** para enviar emails desde un formulario frontend sin necesidad de backend propio.

| Servicio | Límite Gratis | Configuración | Complejidad | Recomendado |
|----------|---|---|---|---|
| **EmailJS** | 200/mes | Simple | ⭐⭐ | ✅ Mejor opción |
| **Formspree** | Ilimitado | Muy Simple | ⭐ | ✅ Alternativa excelente |
| **FormSubmit** | Ilimitado | Muy Simple | ⭐ | ✅ Alternativa excelente |
| **Basin** | Ilimitado | Simple | ⭐⭐ | ⚠️ Buena |
| **Discord Webhook** | Ilimitado | Simple | ⭐ | ⚠️ No es email real |
| **Google Apps Script** | Ilimitado | Compleja | ⭐⭐⭐ | ⚠️ Para avanzados |

---

## 🏆 OPCIÓN 1: EmailJS (⭐⭐⭐⭐⭐ RECOMENDADO)

### Descripción
Servicio especializado en enviar emails desde JavaScript directamente al cliente. Usa tu propio email provider (Gmail, Outlook, etc).

### Ventajas ✅
- ✅ **Interfaz intuitiva**: Dashboard bien diseñado
- ✅ **200 emails gratis/mes**: Suficiente para portfolio
- ✅ **Plantillas personalizadas**: Puedes diseñar el email
- ✅ **Sin backend requerido**: Todo en frontend
- ✅ **Documentación excelente**: Community activa
- ✅ **Seguro**: Las credenciales no se exponen en el código

### Desventajas ❌
- ❌ Límite de 200 emails/mes (después $10/1000 emails)
- ❌ Requiere cuenta en su plataforma

### Costo
- **Gratis**: 200 emails/mes
- **Pago**: $5/month (1,000 emails) o $10/month (5,000 emails)

### Pasos de Implementación

#### 1. Registro y Setup
```
1. Ve a https://www.emailjs.com/
2. Crea cuenta (gratis)
3. Conecta tu email provider (Gmail, Outlook, etc)
4. Copia tu User ID
5. Crea una plantilla de email
```

#### 2. Instalar y Configurar
```bash
npm install @emailjs/browser
```

#### 3. Código Frontend
```javascript
import emailjs from '@emailjs/browser';

// Inicializar (una sola vez)
emailjs.init("YOUR_PUBLIC_KEY"); // Tu Public Key de EmailJS

// Función para enviar email
async function enviarEmail(event) {
    event.preventDefault();
    
    const formData = {
        from_name: document.getElementById("nombre").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("mensaje").value,
        to_email: "tu-email@gmail.com" // Tu email destino
    };

    try {
        const respuesta = await emailjs.send(
            "SERVICE_ID",      // Tu Service ID
            "TEMPLATE_ID",     // Tu Template ID
            formData
        );
        
        console.log("✅ Email enviado:", respuesta);
        alert("¡Email enviado correctamente!");
        
    } catch (error) {
        console.error("❌ Error al enviar:", error);
        alert("Error al enviar el email");
    }
}

// Asignar al formulario
document.getElementById("formulario").addEventListener("submit", enviarEmail);
```

#### 4. HTML Mínimo
```html
<form id="formulario">
    <input type="text" id="nombre" placeholder="Tu nombre" required>
    <input type="email" id="email" placeholder="Tu email" required>
    <textarea id="mensaje" placeholder="Tu mensaje" required></textarea>
    <button type="submit">Enviar</button>
</form>
```

### Variables en Plantilla
En el dashboard puedes crear una plantilla con variables tipo:
```
Nombre: {{from_name}}
Email: {{from_email}}
Mensaje: {{message}}
```

---

## 🏆 OPCIÓN 2: Formspree (⭐⭐⭐⭐ EXCELENTE)

### Descripción
Servicio simplificado para formularios. Redirige datos a tu email sin escribir código backend.

### Ventajas ✅
- ✅ **Ilimitado gratis**: Sin límite de emails
- ✅ **Configuración mínima**: Solo 2 pasos
- ✅ **Sin código backend**: Puro frontend
- ✅ **HTTPS automático**: Formulario seguro
- ✅ **Soporte a PDF**: Genera descarga automática
- ✅ **Redireccionamiento**: Controla página post-envío

### Desventajas ❌
- ❌ Menos personalización que EmailJS
- ❌ Envíos pueden tardar segundos
- ❌ Versión gratis tiene branding

### Costo
- **Gratis**: Ilimitado (con branding)
- **Premium**: $25/mes (sin branding)

### Pasos de Implementación

#### 1. Registro
```
1. Ve a https://formspree.io/
2. Crea cuenta (gratis)
3. Crea un nuevo formulario
4. Copia tu Form ID
```

#### 2. Formulario HTML
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="text" name="nombre" placeholder="Tu nombre" required>
    <input type="email" name="email" placeholder="Tu email" required>
    <textarea name="mensaje" placeholder="Tu mensaje" required></textarea>
    <button type="submit">Enviar</button>
</form>
```

#### 3. (Opcional) Envío con AJAX
```javascript
async function enviarEmail(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        const respuesta = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (respuesta.ok) {
            alert("✅ Email enviado!");
            form.reset();
        } else {
            alert("❌ Error al enviar");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

document.getElementById("formulario").addEventListener("submit", enviarEmail);
```

---

## 🏆 OPCIÓN 3: FormSubmit (⭐⭐⭐⭐ EXCELENTE)

### Descripción
Alternativa gratuita a Formspree, incluso más simple. Recibe emails directamente.

### Ventajas ✅
- ✅ **100% gratis**: Sin límites ni planes premium
- ✅ **Configuración cero**: No requiere registro
- ✅ **Envío de emails**: Directo a tu buzón
- ✅ **Confirmación automática**: Email de confirmación al usuario
- ✅ **No requiere backend**: Pure frontend
- ✅ **Muy confiable**: Llevado por comunidad

### Desventajas ❌
- ❌ Menos opciones de personalización
- ❌ Comunidad más pequeña que Formspree

### Costo
- **Gratis**: 100% gratis, ilimitado

### Pasos de Implementación

#### 1. Código (SIN REGISTRO)
```html
<form action="https://formsubmit.co/tu-email@gmail.com" method="POST">
    <input type="text" name="nombre" placeholder="Tu nombre" required>
    <input type="email" name="email" placeholder="Tu email" required>
    <textarea name="mensaje" placeholder="Tu mensaje" required></textarea>
    
    <!-- Captcha anti-spam (opcional) -->
    <input type="hidden" name="_captcha" value="false">
    
    <!-- Redireccionar después de enviar -->
    <input type="hidden" name="_next" value="https://tu-sitio.com/gracias.html">
    
    <button type="submit">Enviar</button>
</form>
```

#### 2. Con AJAX (Sin recarga)
```javascript
async function enviarEmail(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    try {
        const respuesta = await fetch("https://formsubmit.co/tu-email@gmail.com", {
            method: "POST",
            body: formData
        });
        
        if (respuesta.ok) {
            alert("✅ Email enviado correctamente!");
            event.target.reset();
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error al enviar");
    }
}

document.getElementById("formulario").addEventListener("submit", enviarEmail);
```

---

## 🏆 OPCIÓN 4: Basin (⭐⭐⭐ BUENA)

### Descripción
Formularios sin backend, simple y directo.

### Ventajas ✅
- ✅ **Ilimitado gratis**
- ✅ **Muy simple**: Una URL y listo
- ✅ **Dashboard**: Visualiza todos los envíos
- ✅ **Webhooks**: Integración con zapier, slack, etc

### Desventajas ❌
- ❌ Interfaz más básica
- ❌ Comunidad pequeña

### Costo
- **Gratis**: Ilimitado

### Pasos de Implementación

#### 1. Crear formulario
```
1. Ve a https://www.usebasin.com/
2. Crea tu formulario (automático)
3. Copia la URL de tu formulario
```

#### 2. Formulario HTML
```html
<form action="https://usebasin.com/api/v1/basin/YOUR_BASIN_ID" method="POST">
    <input type="text" name="nombre" placeholder="Nombre" required>
    <input type="email" name="email" placeholder="Email" required>
    <textarea name="mensaje" placeholder="Mensaje" required></textarea>
    <button type="submit">Enviar</button>
</form>
```

---

## ⚠️ OPCIÓN 5: Discord Webhook (NO ES EMAIL, PERO ÚTIL)

### Descripción
No es email real, pero puedes recibir notificaciones en Discord cuando alguien envía el formulario.

### Ventajas ✅
- ✅ **100% gratis**
- ✅ **Ilimitado**
- ✅ **Notificaciones en tiempo real**
- ✅ **Archivo embebido**: Puedes agregar imágenes

### Desventajas ❌
- ❌ **NO es email real**: Llega a Discord, no a email
- ❌ No es profesional para clientes

### Costo
- **Gratis**: 100% gratis

### Pasos de Implementación

#### 1. Crear Webhook en Discord
```
1. Click derecho en tu servidor → Configuración
2. Integraciones → Webhooks → Nuevo Webhook
3. Copia la URL del webhook
```

#### 2. Código
```javascript
async function enviarADiscord(event) {
    event.preventDefault();
    
    const mensaje = {
        content: "📧 Nuevo mensaje del formulario",
        embeds: [{
            title: document.getElementById("nombre").value,
            description: document.getElementById("mensaje").value,
            fields: [
                {
                    name: "Email",
                    value: document.getElementById("email").value
                },
                {
                    name: "Hora",
                    value: new Date().toLocaleString()
                }
            ],
            color: 5814783
        }]
    };
    
    try {
        await fetch("YOUR_WEBHOOK_URL", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mensaje)
        });
        
        alert("✅ Mensaje enviado!");
    } catch (error) {
        console.error("Error:", error);
    }
}
```

---

## 💡 OPCIÓN 6: Google Apps Script (AVANZADO)

### Descripción
Usa Google Sheets + Apps Script como "backend" gratis para recibir emails.

### Ventajas ✅
- ✅ **Completamente gratis**
- ✅ **Sin límites**
- ✅ **Integración Google**: Sheets, Drive, Gmail
- ✅ **Guardar datos**: Almacena en hoja de cálculo

### Desventajas ❌
- ❌ **Configuración compleja**: Requiere Google Cloud
- ❌ Curva de aprendizaje pronunciada
- ❌ Cold start en serverless

### Pasos de Implementación

#### 1. Crear Apps Script
```
1. Ve a https://script.google.com/
2. Nuevo proyecto
3. Escribe este código:
```

```javascript
function doPost(e) {
    const params = e.parameter;
    
    // Guardar en Google Sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.appendRow([
        new Date(),
        params.nombre,
        params.email,
        params.mensaje
    ]);
    
    // Enviar email
    GmailApp.sendEmail(
        "tu-email@gmail.com",
        "Nuevo mensaje del formulario",
        `Nombre: ${params.nombre}\nEmail: ${params.email}\n\nMensaje:\n${params.mensaje}`
    );
    
    return ContentService.createTextOutput("OK");
}
```

#### 2. Publicar como API
```
1. Deploy → New deployment
2. Type: Web app
3. Execute as: Tu cuenta
4. Allow access to: Anyone
5. Copy URL de deployment
```

#### 3. Formulario HTML
```html
<form id="formulario">
    <input type="text" id="nombre" placeholder="Nombre" required>
    <input type="email" id="email" placeholder="Email" required>
    <textarea id="mensaje" placeholder="Mensaje" required></textarea>
    <button type="submit">Enviar</button>
</form>

<script>
document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("nombre", document.getElementById("nombre").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("mensaje", document.getElementById("mensaje").value);
    
    const respuesta = await fetch("YOUR_APPS_SCRIPT_URL", {
        method: "POST",
        body: formData
    });
    
    alert("✅ Enviado!");
});
</script>
```

---

## 🎯 RECOMENDACIÓN FINAL

### Para tu Portfolio - **EmailJS o Formspree**

#### 📊 Comparativa Final

```
┌─────────────────────────────────────────────────────────────┐
│                   MEJOR OPCIÓN: EmailJS                     │
├─────────────────────────────────────────────────────────────┤
│ ✅ 200 emails gratis/mes (suficiente)                       │
│ ✅ Interfaz profesional y fácil                             │
│ ✅ Plantillas personalizadas                                │
│ ✅ Dashboard intuitivo                                      │
│ ✅ Perfecto para portfolio + contacto profesional           │
│ ✅ Escalable si crece tu tráfico                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│             ALTERNATIVA: Formspree o FormSubmit             │
├─────────────────────────────────────────────────────────────┤
│ ✅ Ilimitado completamente                                  │
│ ✅ Configuración casi nula                                  │
│ ✅ Perfect si esperas poco tráfico                          │
│ ✅ Mejor si quieres 0 complejidad                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 PRÓXIMOS PASOS

### Opción 1: Implementar EmailJS
```bash
# 1. Instalar
npm install @emailjs/browser

# 2. Crear archivo contacto.js
# 3. Configurar en index.html
# 4. Agregar tu Public Key y Service ID
# 5. Probar con formulario de contacto
```

### Opción 2: Implementar Formspree
```html
<!-- Solo necesitas el atributo action del formulario -->
<form action="https://formspree.io/f/YOUR_ID" method="POST">
    ...
</form>
```

### Opción 3: Implementar FormSubmit
```html
<!-- Ni siquiera necesitas registro -->
<form action="https://formsubmit.co/tu-email@gmail.com" method="POST">
    ...
</form>
```

---

## 📝 VERIFICACIÓN DE SEGURIDAD

⚠️ **Importante**: Nunca expongas en el código:
- ❌ Contraseñas reales
- ❌ API Keys privadas
- ❌ Direcciones de email privadas en HTML plano

✅ **Seguro**:
- ✅ Public Key de EmailJS (NO la private key)
- ✅ Form IDs de Formspree
- ✅ Webhook URLs (puedes regenerar)

---

## 🔗 Enlaces Útiles

- **EmailJS**: https://www.emailjs.com/
- **Formspree**: https://formspree.io/
- **FormSubmit**: https://formsubmit.co/
- **Basin**: https://www.usebasin.com/
- **Google Apps Script**: https://script.google.com/

---

## ❓ Preguntas Frecuentes

### ¿Cuál es la más rápida?
EmailJS y Formspree son muy rápidas. FormSubmit puede tardar 1-2 segundos.

### ¿Cuál se ve más profesional?
EmailJS, porque puedes personalizar completamente el email.

### ¿Cuál es mejor para testing?
FormSubmit o Formspree (0 configuración).

### ¿Puedo cambiar después?
Sí, el código es similar en todas. Puedes migrar fácilmente.

### ¿Funciona en localhost?
Sí, todas funcionan en localhost durante desarrollo.

---

**Recomendación para tu portfolio**: Comienza con **EmailJS** 🎯
