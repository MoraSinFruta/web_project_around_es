# Around The U.S. (Alrededor de los EE.UU.) - Parte 2

## Enlace del Proyecto
* [Ver proyecto en vivo en GitHub Pages](https://morasinfruta.github.io/web_project_around_es/)

## Descripción del Proyecto
Este proyecto es una aplicación web interactiva que permite a los usuarios compartir fotografías de diversos lugares de los EE.UU., darles "Me gusta", eliminar elementos de la galería y administrar la información de su propio perfil. 

En esta segunda etapa (Sprint 7), el enfoque principal estuvo en implementar un sistema robusto de **validación de formularios en tiempo real** y optimizar la **experiencia de usuario (UX)** a través de controles avanzados de cierre de ventanas emergentes y accesibilidad por teclado.

## Tecnologías Utilizadas
* **HTML5:** Estructuración semántica de la aplicación y atributos de validación nativos.
* **CSS3:** Maquetación responsiva, metodología BEM para estilos organizados y transiciones suaves para los componentes dinámicos.
* **JavaScript (ES6+):** Manipulación avanzada del DOM, eventos en tiempo real y **desarrollo modular** para separar responsabilidades.

## Funcionalidades Implementadas
* **Renderizado Dinámico:** Generación de tarjetas interactivas utilizando elementos `<template>` a partir de un arreglo inicial de datos.
* **Validación de Formularios en Tiempo Real (UX):**
  * Validación nativa interactiva para los formularios "Editar Perfil" y "Nuevo Lugar" utilizando la API de validación de HTML5 y `ValidityState`.
  * Mensajes de error personalizados que aparecen debajo de cada campo cuando los datos ingresados no cumplen con los requisitos (longitudes mínimas/máximas o formato de URL).
  * Desactivación dinámica del botón de guardar/crear si el formulario actual contiene campos inválidos, aplicando los estilos visuales de Figma.
* **Mejoras de Accesibilidad y Control de Popups:**
  * Cierre intuitivo de cualquier ventana emergente haciendo clic en la superposición (fondo oscuro/overlay) fuera de los bordes del formulario.
  * Cierre instantáneo por teclado presionando la tecla `Esc`.
  * Registro y remoción dinámica de escuchadores de eventos para optimizar el rendimiento y liberar recursos en el navegador.
* **Programación Modular:** Toda la lógica de validación se ha encapsulado e independizado en un módulo exclusivo (`validate.js`), comunicándose con el script principal (`index.js`) a través de importaciones y exportaciones nativas de JavaScript.

## Estructura del Directorio
* `/blocks` — Hojas de estilo CSS estructuradas por componentes independientes bajo la metodología BEM.
* `/images` — Almacén de recursos gráficos, vectores de interfaz e imágenes de respaldo.
* `/pages` — Estilos globales de la página.
* `/scripts` — Lógica de ejecución dividida modularmente:
  * `index.js`: Control del flujo de datos, renderizado de la galería y control de modales.
  * `validate.js`: Lógica genérica y reutilizable de validación de entradas y estado de formularios.