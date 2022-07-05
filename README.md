<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Pokemon

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

En este proyecto se ponen a prueba las tecnologías aprendidas en el bootcamp, creando una SPA que consume datos de una API, que va desde backend con base de datos, hasta el frontend, para muestreo y carga de datos mediante formulario.

## Objetivos del Proyecto
- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Quick Start

 1. Clonar el repositorio en sus computadoras
 2. Moverse desde la consola a la carpeta /client y /api, y en cada una ejecutar el comando
> npm install

para instalar las dependencias necesarias.

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Para verificar que versión tienen instalada:

> node -v
>
> npm -v

Al clonar no dispondrá de base de datos, así que el formulario de creación no funcionará. Podrá estar disponible cuando la aplicación esté deployada (próximamente)

El contenido de `client` fue creado usando: Create React App.

## La aplicación

La idea general es una aplicación en la cual se puedan ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons

__IMPORTANTE__: Para las funcionalidades de filtrado y ordenamiento NO fueron utilizados los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados sino que fueron desarrollados manualmente mediante JS.

#### Únicos Endpoints/Flags que pueden utilizaron:

  - GET https://pokeapi.co/api/v2/pokemon
  - GET https://pokeapi.co/api/v2/pokemon/{id}
  - GET https://pokeapi.co/api/v2/pokemon/{name}
  - GET https://pokeapi.co/api/v2/type

#### Tecnologías necesarias:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres (no necesario para demo)


### Frontend
Contiene:

__Pagina inicial__:
- [ ] Landing page con imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__:
- [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda será exacta, es decir solo encontrará al pokemon si se coloca el nombre completo)
- [ ] Área donde se verá el listado de pokemons. Al iniciar cargará los primeros resultados obtenidos desde la ruta `GET /pokemons` y mostrará su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
- [ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
- [ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina.

__NOTA__: Por cuestiones de performance, debido a que se hacen querys y subquerys a la API, y a que esto puede hacer que la búsqueda sea muy lenta se limita el resultado total a 40 pokemons iniciales. La búsqueda directa sí trae pokemons de toda la API.

__Ruta de detalle de Pokemon__:
- [ ] campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [ ] Número de Pokemon (id)
- [ ] Estadísticas (vida, fuerza, defensa, velocidad)
- [ ] Altura y peso

__Ruta de creación__:
- [ ] Formulario __controlado con JavaScript__ con los campos mencionados en el detalle del Pokemon
- [ ] Posibilidad de seleccionar/agregar más de un tipo de Pokemon
- [ ] Botón/Opción para crear un nuevo Pokemon


### Backend
Se desarrolló un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /pokemons__:
  - Obtiene un listado de los pokemons desde pokeapi.
  - Devuelve solo los datos necesarios para la ruta principal
- [ ] __GET /pokemons/{idPokemon}__:
  - Obtiene el detalle de un pokemon en particular
  - Trae solo los datos pedidos en la ruta de detalle de pokemon
- [ ] __GET /pokemons?name="..."__:
  - Obtiene el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
- [ ] __POST /pokemons__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
  - Crea un pokemon en la base de datos (solo para deploy)
- [ ] __GET /types__:
  - Obtiene todos los tipos de pokemons posibles
