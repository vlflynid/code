'use client';

import { SignInForm } from '@/components/auth/sign-in-form';

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Вход для администраторов
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Доступ только для сотрудников салона
          </p>
        </div>
        <SignInForm adminMode />
      </div>
    </div>
  );
} 