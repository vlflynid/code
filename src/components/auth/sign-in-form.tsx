'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface SignInFormProps {
  adminMode?: boolean;
}

export function SignInForm({ adminMode = false }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (adminMode && userData?.role !== 'admin') {
          setError('Доступ запрещен. Этот аккаунт не является администратором.');
          await supabase.auth.signOut();
          return;
        }

        if (!adminMode && userData?.role === 'admin') {
          setError('Пожалуйста, используйте страницу входа для администраторов.');
          await supabase.auth.signOut();
          return;
        }

        router.push('/dashboard');
      }
    } catch (error: any) {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {adminMode ? 'Вход для администраторов' : 'Вход в систему'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Пароль
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </Button>
      </form>
      {!adminMode && (
        <p className="mt-4 text-center text-sm">
          Нет аккаунта?{' '}
          <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      )}
      <div className="mt-4 text-center text-sm">
        {adminMode ? (
          <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
            Вход для клиентов
          </Link>
        ) : (
          <Link href="/admin/sign-in" className="text-blue-600 hover:underline">
            Вход для администраторов
          </Link>
        )}
      </div>
    </div>
  );
} 