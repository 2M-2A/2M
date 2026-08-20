# 2M — Página web oficial

Esta carpeta contiene una página estática lista para publicar en GitHub Pages.

## Contenido

- `index.html` — página principal.
- `styles.css` — diseño responsive.
- `script.js` — descarga y ventana de donaciones.
- `assets/logo.svg` — logo de 2M.
- `assets/yape-qr.jpg` — QR de Yape proporcionado por el creador.
- `2M-1.0-Beta.zip` — programa 2M.

## Activar PayPal

Entra en PayPal y crea una página/enlace de donación. PayPal permite crear una página de donación con un enlace que puedes compartir.

Cuando tengas el enlace, abre `script.js` y busca:

`const PAYPAL_DONATION_URL = "";`

Pega tu enlace entre las comillas. Por ejemplo:

`const PAYPAL_DONATION_URL = "TU_ENLACE_DE_PAYPAL";`

Guarda el archivo y vuelve a subirlo a GitHub.

Página oficial de PayPal para crear una donación:
https://www.paypal.com/donate/buttons

## Publicar gratis con GitHub Pages

1. Crea una cuenta en GitHub si todavía no tienes una.
2. Crea un repositorio público. GitHub Pages está disponible con GitHub Free para repositorios públicos.
3. Sube TODO el contenido de esta carpeta al repositorio.
4. En GitHub entra a `Settings` → `Pages`.
5. En `Build and deployment`, selecciona `Deploy from a branch`.
6. Selecciona la rama `main` y la carpeta `/ (root)`.
7. Guarda.
8. GitHub publicará el sitio.

Si el repositorio se llama `2M`, la dirección normalmente será:

`https://TU-USUARIO.github.io/2M/`

Si quieres una dirección del tipo `TU-USUARIO.github.io`, crea el repositorio con ese nombre exacto.

## Importante sobre la descarga

La página inicia la descarga del ZIP y luego muestra la ventana de donación. La página web no puede obligar al navegador a abrir el selector de carpeta de Windows. Si el usuario quiere elegir la carpeta cada vez, debe activar en su navegador la opción equivalente a "Preguntar dónde guardar cada archivo antes de descargarlo".

## Sobre el QR de Yape

El QR incluido es el que proporcionó el creador y muestra el nombre:

Marcelo Andre Abanto Escobar

Antes de publicar, verifica que el QR sea el que quieres hacer público.

## Actualizar el programa

Cuando salga una nueva versión:

1. Reemplaza `2M-1.0-Beta.zip`.
2. Actualiza la versión en `index.html`.
3. Cambia el nombre del archivo en `index.html` y `script.js`.
4. Sube los cambios a GitHub.

GitHub Pages puede tardar unos minutos en reflejar cambios.
