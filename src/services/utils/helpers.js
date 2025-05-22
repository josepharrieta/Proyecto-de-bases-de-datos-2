// src/utils/helpers.js

/**
 * Verifica si un valor está vacío (null, undefined o string vacío)
 * @param {*} value
 * @returns {boolean}
 */
export function isEmpty(value) {
  return value === null || value === undefined || value === '';
}

/**
 * Limpia y normaliza un string (espacios y minúsculas)
 * @param {string} str
 * @returns {string}
 */
export function normalizeString(str) {
  return str?.trim().toLowerCase() || '';
}

/**
 * Genera una respuesta de error estándar
 * @param {string} message
 * @param {number} statusCode
 * @returns {{ error: string, statusCode: number }}
 */
export function errorResponse(message = 'Error interno del servidor', statusCode = 500) {
  return {
    error: message,
    statusCode
  };
}

/**
 * Formatea una fecha YYYY-MM-DD a objeto legible
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
