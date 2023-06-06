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
  createdAt

- muscleGroup:
  id
  exerciseId
  description
  createdAt

## ENDPOINTS 🏁

## Users Endpoints:

- POST ['/users'] ▶️ Registro de usuario pendiente de validar ◾ newUser.✅
- PUT - ['/users/validate/:regCode'] ▶️ Valida a un usuario recién registrado. >>opcional:brevo.com<<
- POST - ['/users/login'] ▶️ Logea a un usuario retornando un token. loginUser.✅
- GET - ['/users/:userId'] ▶️ Retorna información de un usuario(mi propio usuario)**DOMINGO** ✅
- GET - ['/users'] ▶️ Retorna información de un usuario del token(mi propio usuario)✅

## Exercises:

## Usuario Admin

- POST ['/exercises'] ▶️ Registro de un nuevo ejercicio/entrenamiento Token ✅
- GET ['/exercises/:exercisesId']▶️ Devuelve info de un ejercicio en concreto Token ✅
- PUT ['/exercises/:exercisesId'] ▶️ Modificar ejercicio. Token
- DELETE ['/exercises/:exercisesId'] ▶️ Eliminar ejercicio. Token

## Usuario normal

- POST ['/exercises/:exerciseId/likes'] Dar like
- DELETE ['/exercises/:exerciseId/likes'] Eliminar like
- POST ['/exercises/:exerciseId/favorites'] Anade un ejercicio a la lista favoritos
- DELETE ['/exercises/:exerciseId/favorites'] Eliminar un ejercicio a la lista favoritos
- GET ['/exercises'] ▶️ Listado de todos los ejercicios con filtros. Token hace falta estar logeado para ver ejercicios

Si nos da tiempo:

# bonus track

- PUT - ['/users/password'] - Resetea la contraseña de un usuario. Token **DOMINGO**
- PUT - ['/users/avatar'] - Permite actualizar el avatar del usuario. ➡️ Token
- PUT - ['/users/validate/:regCode'] ▶️ Valida a un usuario recién registrado. >>opcional:brevo.com'anonimo'<<
- PUT - ['/users/password/recover'] - Envía al usuario un correo de recuperación de contraseña. >regis
- DELETE - ['/users/:userId] - Eliminar a un usuario - el admin
