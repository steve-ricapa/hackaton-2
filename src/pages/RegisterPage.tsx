// src/pages/RegisterPage.tsx
import React from 'react'
import RegisterForm from '../components/Auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <RegisterForm />
      </div>
    </div>
  )
}
