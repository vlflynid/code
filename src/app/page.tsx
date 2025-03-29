'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Scissors, Clock, Calendar, Users } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Салон красоты</h1>
            <div className="space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button>Личный кабинет</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/sign-in">
                    <Button variant="outline">Войти</Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button>Регистрация</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
                Добро пожаловать
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Создайте свой идеальный образ
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Профессиональные мастера, современное оборудование и лучшие косметические средства для вашей красоты
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <Scissors className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Профессиональные мастера</h3>
                <p className="mt-2 text-base text-gray-500">
                  Опытные стилисты с многолетним стажем работы
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Удобное время</h3>
                <p className="mt-2 text-base text-gray-500">
                  Работаем каждый день с 9:00 до 21:00
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Онлайн-запись</h3>
                <p className="mt-2 text-base text-gray-500">
                  Быстрая и удобная запись через личный кабинет
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Индивидуальный подход</h3>
                <p className="mt-2 text-base text-gray-500">
                  Учитываем все пожелания каждого клиента
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Готовы преобразиться?</span>
              <span className="block">Запишитесь прямо сейчас</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-100">
              Создайте аккаунт и получите возможность записываться онлайн в любое удобное время
            </p>
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="mt-8 w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50"
              >
                Начать
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <p className="text-center text-base text-gray-500">
              &copy; 2025 Салон красоты. Все права защищены.
            </p>
            <div className="text-center">
              <Link href="/admin/sign-in" className="text-sm text-gray-500 hover:text-gray-700">
                Вход для сотрудников
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 