// src/types/auth.ts

export interface LoginRequest {
  email: string
  passwd: string
}

export interface RegisterRequest {
  name: string
  email: string
  passwd: string
}

/**
 * Ahora el backend envuelve el token en `result.token`
 */
export interface AuthResponse {
  status: number
  message: string
  result: {
    token: string
    username: string
  }
}
