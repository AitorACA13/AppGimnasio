'use strict';

const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');
const { UPLOADS_DIR, SMTP_PASS, SMTP_USER } = process.env;
const nodemailer = require('nodemailer');

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (msg, code) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};

/**
 * #####################
 * ## Validate Schema ##
 * #####################
 */

const validateSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    error.httpStatus = 400;
    throw error;
  }
};

/* ####################
 * ##   Save photo   ##
 * ####################
 */
const savePhoto = async (img, width) => {
  try {
    //ruta absoluta al directorio de subida de archivos
    const uploadsPath = path.join(__dirname, UPLOADS_DIR);

    //Accedemos a la ruta
    try {
      await fs.access(uploadsPath);
      //si no existe se crea.
    } catch {
      await fs.mkdir(uploadsPath);
    }
    // Creamos un objeto de tipo sharp con la imagen.
    const sharpImg = sharp(img.data);
    //Redimensionamos la imagen.
    sharpImg.resize(width);
    //Generamos un nombre unico.
    const imgName = `${uuid()}.jpg`;
    // Ruta absoluta a la imagen.
    const imgPath = path.join(uploadsPath, imgName);
    //Guardamos la imagen.
    await sharpImg.toFile(imgPath);
    //Retornamos el nombre de la imagen.
    return imgName;
  } catch (err) {
    console.error(err);
    generateError('Error al guardar la imagen en el servidor.', 500);
  }
};
/* #####################
 * ##  Delete photo   ##
 * #####################
 */
const deletePhoto = async (imgName) => {
  try {
    //Ruta absoluta al archivo que vamos a eliminar.
    const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);
    try {
      await fs.access(imgPath);
      //Si no existe el archivo finalizamos la función.
    } catch {
      return;
    }
    //Eliminamos el archivo de la carpeta
    await fs.unlink(imgPath);
  } catch (err) {
    console.error(err);
    generateError('Error al eliminar la imagen del servidor', 500);
  }
};

/**
 * ###############
 * ## Send Mail ##
 * ###############
 */

// Creamos un transporte para poder enviar emails con nodemailer.
const transport = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendMail = async (email, subject, body) => {
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject,
      text: body,
    };

    await transport.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
    generateError('Error al enviar el email al usuario', 500);
  }
};

module.exports = {
  generateError,
  validateSchema,
  savePhoto,
  deletePhoto,
  sendMail,
};
