// src/pages/LoginPage.tsx
import React from 'react'
import LoginForm from '../components/Auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  )
}
