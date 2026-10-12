# Alrededor de los EE.UU. (Sprint 8)

## Descripción y Funcionalidad
Aplicación web interactiva que permite a los usuarios compartir y explorar tarjetas fotográficas de diferentes lugares de los Estados Unidos. 
Funcionalidades principales:
- Visualización de tarjetas con imágenes y títulos.
- Creación de nuevas tarjetas a través de un formulario emergente con validación en tiempo real.
- Marcado de tarjetas favoritas mediante botón "Me gusta".
- Eliminación de tarjetas.
- Visualización de imágenes en tamaño ampliado al hacer clic sobre ellas.
- Edición del perfil de usuario (nombre y ocupación).
- Cierre de modales interactivo mediante clic fuera de los bordes (overlay) o tecla `Escape`.

## Tecnologías y Técnicas
- **HTML5 y CSS3**: Estructura semántica, metodología BEM y diseño adaptable.
- **TypeScript**: Tipado estático estricto, interfaces y genéricos para robustez y mantenibilidad del código.
- **POO (Programación Orientada a Objetos)**:
  - Clases modulares (`Card`, `Section`, `FormValidator`, `Popup`, `PopupWithImage`, `PopupWithForm`, `UserInfo`).
  - Herencia en componentes modales.
  - Acoplamiento débil mediante funciones callback y paso de configuraciones por objetos.

## Estructura y ejecución
- `src/` contiene el código fuente en TypeScript (`index.ts`, `components/` con una clase por archivo y `utils/constants.ts`).
- `public/` contiene `index.html`, los estilos, imágenes, fuentes y el JavaScript compilado.

```bash
npm install     # instala TypeScript
npm run build   # compila src/ en public/
```

Después, abre `public/index.html` con un servidor local (por ejemplo, Live Server).
