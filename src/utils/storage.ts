// src/utils/storage.ts

const TOKEN_KEY = 'token'

/**
 * Obtiene el JWT almacenado (o null si no existe)
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Guarda el JWT en localStorage bajo la clave definida
 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * Elimina el JWT del almacenamiento
 */
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}
