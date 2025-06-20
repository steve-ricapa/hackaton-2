// src/api/auth.api.ts
import Api from './api'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth'

const api = Api.getInstance()

export async function register(creds: RegisterRequest): Promise<void> {
  await api.post<void>('/authentication/register', creds)
}

/** Ahora extraemos `result.token` */
export async function login(creds: LoginRequest): Promise<string> {
  const res = await api.post<AuthResponse>('/authentication/login', creds)
  return res.result.token
}
