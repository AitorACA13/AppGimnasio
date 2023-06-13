# PROYECTO 2: APP GIMNASIO

## EQUIPO PROYECTO:

| Nombre | LinkedIn |
| ----------- | ----------- |
| Aitor de la Cueva Alonso | https://www.linkedin.com/in/aitordelacuevaalonso/ |
| Marina Hernández | https://www.linkedin.com/in/marina-hernandez-hernandez/ |
| Oriol Solanes | https://www.linkedin.com/in/oriol-solanes/ |
| Ryan John Quinn| https://www.linkedin.com/in/rjq/ |

---

### DESCRIPCIÓN GYMÑam:

Implementar una API que permite publicar ejercicios para la gestión de los mismos en un gimnasio.

**Una vez descargado el proyecto, se deben seguir los siguientes pasos:**
1. Desde la consola, en el directorio raiz, instalar todas las dependencias disponibles en el archivo package.json con el comando <code>npm install</code>.
2. Crear un archivo <code>.env</code> a partir del archivo ya existente como referencia <code>.env.example</code> completando todas las variables con sus valores correspondientes.
3. Crear la base de datos desde MySQL Workbench con el nombre <code>gymñam</code>.
4. Desde la consola, en el directorio raiz, iniciar la base de datos desde el archivo <code>initDB.js</code>. El código en la consola se será <code>npm run initDB</code>, script en el archivo package.json. En este momento las tablas se deberían de haber creado en la base de datos. El usuario ADMIN se crea en este momento de forma automática.
5. Existe un script en el archivo package.json que permite al usuario iniciar el servidor con la dependencia nodemon. Para ello basta con introducir en la consola en comando <code>npm run dev</code>.

---

<br>

### FUNCIONAMIENTO DE LA APP

1.  Asegurarse de que el servidor esté en escucha.
2.  La colección de POSTMAN tiene el nombre de **APP GIMNASIO**:

 - Utilizar la petición **New User** para crear un nuevo usuario. El body de la petición debe de ser un objeto JSON raw.

            {
             "name": "Your name",
             "email": "Your email",
             "password": "Your password"
            }
 - El usuario, recibirá un email a el correo indicado, para validar su cuenta. Petición **Validate User** 
 - Petición **Login User**  para loguearse con el usuario que se desee . El body de la petición debe ser un objeto JSON raw. El loggin devolverá el TOKEN de usuario. Necesario para realizar determinadas acciones.

            {
             "email": "Your email",
             "password": "Your password"
            }


---

<br>
  

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

- muscleGroup:
  id
  exerciseId
  description
  createdAt


## ENDPOINTS 🏁

**Users Endpoints:**

- POST ['/users'] ▶️ Registro de usuario pendiente de validar ◾ newUser.✅
- PUT - ['/users/validate/:regCode'] ▶️ Valida a un usuario recién registrado. ✅
- POST - ['/users/login'] ▶️ Logea a un usuario retornando un token. loginUser. ✅
- GET - ['/users/:userId'] ▶️ Retorna información de un usuario(mi propio usuario) ✅
- GET - ['/users'] ▶️ Retorna información de un usuario del token(mi propio usuario) ✅
- PUT - ['/users/password/recover'] - Envía al usuario un correo de recuperación de contraseña. ✅
- PUT - ['/users/password'] - Resetea la contraseña de un usuario. Token **ERROR:Tutoria. Funciona, pero al conectar con joi,recorverpass code undefined**
- PUT - ['/users/avatar'] - Permite actualizar el avatar del usuario. ➡️ Token ✅

**Exercises:**

***Usuario Admin***

- POST ['/exercises'] ▶️ Registro de un nuevo ejercicio/entrenamiento Token ✅
- GET ['/exercises/:id']▶️ Devuelve info de un ejercicio en concreto Token ✅
- PUT ['/exercises/:id'] ▶️ Modificar ejercicio. Token ✅
- DELETE ['/exercises/:id'] ▶️ Eliminar ejercicio. Token ✅
- DELETE - ['/users/:id] - Eliminar a un usuario - Role:Administrador. ✅

***Usuario normal***

- POST ['/exercises/:id/likes'] Dar like ✅
- DELETE ['/exercises/:id/likes'] Eliminar like ✅
- GET ['/exercises'] ▶️ Listado de todos los ejercicios con filtros. Token hace falta estar logeado para ver ejercicios ✅
- POST ['/exercises/:id/favorites'] Añade un ejercicio a la lista favoritos ✅
- DELETE ['/exercises/:id/favorites'] Eliminar un ejercicio a la lista favoritos jueves ✅
- GET ['/favourites/:id'] ▶️ Listado de todos los favoritos según usuario. Token hace falta estar logeado para ver ejercicios ✅






