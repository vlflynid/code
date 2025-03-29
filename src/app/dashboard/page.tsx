'use client';

import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { BookingsList } from '@/components/bookings-list';
import { BookingForm } from '@/components/booking-form';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.role === 'admin' ? 'Панель администратора' : 'Личный кабинет'}
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {user?.name} ({user?.email})
                </p>
              </div>
              <Button variant="outline" onClick={() => signOut()}>
                Выйти
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {user?.role === 'client' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Создать запись</h2>
                  <BookingForm />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4">Мои записи</h2>
                  <BookingsList />
                </div>
              </div>
            )}

            {user?.role === 'admin' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Все записи</h2>
                <BookingsList />
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 