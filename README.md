# 🛍️ Moda Urbana SPA

Aplicación frontend desarrollada en **React.js** como parte del caso semestral del curso de Desarrollo Web Avanzado.
El sistema permite la navegación entre distintas secciones, gestión de productos y visualización de información de pedidos y clientes.

## 🚀 Tecnologías utilizadas
- React.js
- React Router DOM
- Bootstrap
- Context API
- Jest + React Testing Library

## 📂 Estructura del proyecto
```
src/
 ├── components/
 │    ├── NavBar.jsx
 │    └── products/
 ├── context/
 │    └── AppContext.js
 ├── data/
 │    └── moda.mock.js
 ├── pages/
 │    ├── Home.jsx
 │    ├── Products.jsx
 │    ├── Contact.jsx
 │    ├── Order.jsx
 │    └── Client.jsx
 ├── App.js
 └── index.js
```

## ⚙️ Ejecución del proyecto
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Moda-Urbana-SPA/ModaUrbanaSPA.git
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el servidor local:
   ```bash
   npm start
   ```

## 🧪 Pruebas Unitarias
Ejecutar las pruebas con:
```bash
npm test
```
Incluye tests para `Contact`, `Order` y `Products` con validaciones de renderizado y eventos.

PASS  src/pages/Contact.test.jsx
PASS  src/pages/Products.test.jsx
PASS  src/pages/Order.test.jsx

Test Suites: 3 passed, 3 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        1.683 s, estimated 2 s
Ran all test suites.

Watch Usage: Press w to show more.

## 👥 Equipo de desarrollo
**MONSERRATT ALDEA ARANGUIZ**
**JOSE PABLO DIAZ LOPEZ**
**FABIAN EDUARDO FARIAS RODRIGUEZ**
**ENZO IGNACIO GABRIELLI VALDERRAMA**

## 📝 Licencia
Proyecto académico. Uso educativo permitido bajo licencia MIT.