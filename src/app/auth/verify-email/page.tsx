import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Подтвердите ваш email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Мы отправили ссылку для подтверждения на ваш email адрес. Пожалуйста, проверьте вашу почту и перейдите по ссылке для завершения регистрации.
          </p>
        </div>
        <div className="mt-4">
          <Link href="/auth/sign-in">
            <Button variant="outline" className="w-full">
              Вернуться на страницу входа
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 