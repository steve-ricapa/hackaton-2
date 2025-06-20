// src/api/api.ts
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export default class Api {
  private static _instance: Api
  private _basePath = import.meta.env.VITE_PUBLIC_API_BASE_PATH!
  private _token: string | null = null

  private constructor() {}

  static getInstance(): Api {
    if (!Api._instance) Api._instance = new Api()
    return Api._instance
  }

  /** Llamar tras login/logout para actualizar el JWT */
  public setToken(token: string | null) {
    this._token = token
  }

  private get headers(): Record<string,string> {
    return {
      'Content-Type': 'application/json',
      ...(this._token ? { Authorization: `Bearer ${this._token}` } : {}),
    }
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const resp = await axios.request<T>({
      baseURL: this._basePath,
      headers: this.headers,
      ...config,
    })
    return resp.data
  }

  public get<T>(url: string, cfg?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: 'GET', url, ...cfg })
  }

  // Ahora usamos `unknown` en lugar de `any`
  public post<T>(url: string, data?: unknown, cfg?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: 'POST', url, data, ...cfg })
  }

  public delete<T>(url: string, cfg?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: 'DELETE', url, ...cfg })
  }

  public patch<T>(url: string, data?: unknown, cfg?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: 'PATCH', url, data, ...cfg })
  }
}
