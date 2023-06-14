# PROYECTO 2: APP GIMNASIO

## EQUIPO PROYECTO:

| Nombre                   | LinkedIn                                                |
| ------------------------ | ------------------------------------------------------- |
| Aitor de la Cueva Alonso | https://www.linkedin.com/in/aitordelacuevaalonso/       |
| Marina Hernández         | https://www.linkedin.com/in/marina-hernandez-hernandez/ |
| Oriol Solanes            | https://www.linkedin.com/in/oriol-solanes/              |
| Ryan John Quinn          | https://www.linkedin.com/in/rjq/                        |

---

### DESCRIPCIÓN GYMÑam:

Implementar una API que permite publicar ejercicios para la gestión de los mismos en un gimnasio.

**Una vez descargado el proyecto, se deben seguir los siguientes pasos:**

1. Desde la consola, en el directorio raíz, instalar todas las dependencias disponibles en el archivo package.json con el comando <code>npm install</code> o <code>npm i</code>.
2. Crear un archivo <code>.env</code> a partir del archivo ya existente como referencia <code>.env.example</code> completando todas las variables con sus valores correspondientes.
3. Crear la base de datos desde MySQL Workbench con el nombre <code>gymñam</code>.
4. Desde la consola, en el directorio raíz, iniciar la base de datos desde el archivo <code>initDB.js</code>. El código en la consola será <code>npm run initDB</code>, script en el archivo package.json. En este momento las tablas se deberían de haber creado en la base de datos. El usuario ADMIN se crea en este momento de forma automática.
5. Existe un script en el archivo package.json que permite al usuario iniciar el servidor con la dependencia nodemon. Para ello basta con introducir en la consola el comando <code>npm run dev</code>.

---

## BASE DE DATOS 💻

### TABLAS:

**USERS**
id
name
email
password
avatar
role
createdAt
modifiedAt

**EXERCISES**
id
name
description
photo
typologyId
muscleGroupId
userId
createdAt
modifiedAt

**LIKES**
id
userId
exerciseId
createdAt

**FAVOURITES**
id
userId
exerciseId
createdAt

**TYPOLOGY**
id
exerciseId
description
createdAt

**MUSCLEGROUP**
id
exerciseId
description
createdAt

## ENDPOINTS 🏁

**Users Endpoints:**

- POST ['/users'] ▶️ Registro de usuario pendiente de validar. ✅
- PUT - ['/users/validate/:regCode'] ▶️ Valida a un usuario recién registrado. ✅
- POST - ['/users/login'] ▶️ Loguea a un usuario retornando un token. ✅
- GET - ['/users/:userId'] ▶️ Retorna información de un usuario según id. ✅
- GET - ['/users'] ▶️ Retorna información de un usuario del token(mi propio usuario) ➡️ Token de cualquier usuario. ✅
- PUT - ['/users/password/recover'] ▶️ Envía al usuario un correo de recuperación de contraseña. ✅
- PUT - ['/users/password'] ▶️ Resetea la contraseña de un usuario. ➡️ Token de cualquier usuario. ✅
- PUT - ['/users/avatar'] ▶️ Permite actualizar el avatar del usuario. ➡️ Token de cualquier usuario. ✅

**Exercises:**

**_Usuario Admin_**

- POST ['/exercises'] ▶️ Registro de un nuevo ejercicio/entrenamiento. ➡️ Token del Admin. ✅
- GET ['/exercises/:id']▶️ Devuelve info de un ejercicio en concreto. ➡️ Token de cualquier usuario. ✅
- PUT ['/exercises/:id'] ▶️ Modificar ejercicio. ➡️ Token del Admin. ✅
- DELETE ['/exercises/:id'] ▶️ Eliminar ejercicio. ➡️ Token del Admin. ✅
- DELETE - ['/users/:id] ▶️ Eliminar a un usuario. ➡️ Token del Admin. ✅

**_Usuario normal_**

- POST ['/exercises/:id/likes'] Dar like. ➡️ Token de cualquier usuario. ✅
- DELETE ['/exercises/:id/likes'] Eliminar like. ➡️ Token de cualquier usuario. ✅
- GET ['/exercises'] ▶️ Listado de todos los ejercicios con filtros según keyword (name), typology o muscleGroup. ➡️ Token de cualquier usuario. ✅
- POST ['/exercises/:id/favorites'] Añade un ejercicio a la lista de favoritos. ➡️ Token de cualquier usuario. ✅
- DELETE ['/exercises/:id/favorites'] Eliminar un ejercicio a la lista de favoritos. ➡️ Token de cualquier usuario. ✅
- GET ['/favourites/:id'] ▶️ Listado de todos los favoritos según usuario. ➡️ Token de cualquier usuario. ✅
