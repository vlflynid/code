'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useBookings } from '@/context/BookingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Calendar } from './calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, User, Phone, Scissors } from 'lucide-react';

export function BookingForm() {
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth/sign-in');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await addBooking({
        ...formData,
        name: user.name || '',
        phone: user.phone || '',
        user_id: user.id,
      });

      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Произошла ошибка при создании записи');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      date: format(date, 'yyyy-MM-dd')
    }));
  };

  if (!user) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Запись на услуги</h2>
        <p className="mb-4">Для записи на услуги необходимо войти в систему</p>
        <Link href="/auth/sign-in">
          <Button>Войти</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Запись на услуги</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="service">
            Услуга
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Выберите услугу</option>
            <option value="haircut">Стрижка</option>
            <option value="coloring">Окрашивание</option>
            <option value="styling">Укладка</option>
            <option value="treatment">Уход за волосами</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="date">
            Дата
          </label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="time">
            Время
          </label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Создание записи...' : 'Записаться'}
        </Button>
      </form>

      <Calendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
} 