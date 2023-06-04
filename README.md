## API
Aplicacion 
## BASE DE DATOS 💻

## TABLAS

- users:

id
name
email
password
avatar
role
createdAt
modifiedAt


- exercises:

id
name
description
photo
typologyId
muscleGroupId
userId
createdAt
modifiedAt


- likes:

id
userId
exerciseId
createdAt


- favourites:

id
userId
exerciseId
createdAt


- typology:
id
exerciseId
description


- muscleGroup:
id
exerciseId
description


## ENDPOINTS 🏁

## Users Endpoints:


- POST ['/users'] ▶️ Registro de usuario pendiente de validar ◾ newUser.✅
- PUT - ['/users/validate/:regCode'] ▶️ Valida a un usuario recién registrado. >>opcional:brevo.com<<
- POST - ['/users/login'] ▶️ Logea a un usuario retornando un token. **DOMINGO**
- PUT - ['/users/password'] - Resetea la contraseña de un usuario. Token **DOMINGO**
- GET - ['/users'] ▶️ Retorna información de un usuario del token(mi propio usuario)**DOMINGO**
 PUT - ['/users/avatar'] - Permite actualizar el avatar del usuario. ➡️ Token **DOMINGO**

## Exercises:
- POST ['/exercises'] ▶️ Registro de un nuevo ejercicio/entrenamiento Token
- GET ['/exercises']  ▶️  Listado de todos los ejercicios con filtros. Token hace falta estar logeado para ver ejercicios
- GET ['/exercises/:exercisesId']▶️ Devuelve info de un ejercicio en concreto Token
- PUT ['/exercises/:exercisesId'] ▶️ Modificar ejercicio. Token
- DELETE ['/exercises/:exercisesId'] ▶️ Eliminar ejercicio. Token
- POST ['/exercises/:exerciseId/likes'] Dar like
- DELETE ['/exercises/:exerciseId/likes'] Eliminar like
- POST ['/exercises/:exerciseId/favorites'] Anade un ejercicio a la lista favoritos
- DELETE ['/exercises/:exerciseId/favorites'] Eliminar un ejercicio a la lista favoritos


# Usuario registrado:

Si nos da tiempo:
# bonus track
- PUT - ['/users/validate/:regCode'] ▶️ Valida a un usuario recién registrado. >>opcional:brevo.com'anonimo'<<
- PUT - ['/users/password/recover'] - Envía al usuario un correo de recuperación de contraseña. >regis
- DELETE - ['/users/:userId] - Eliminar a un usuario - el admin


