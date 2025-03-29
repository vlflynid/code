'use client';

import { useState } from 'react';
import { Calendar } from './calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useBookings } from '@/context/BookingsContext';
import { Calendar as CalendarIcon, Clock, User, Phone, Scissors } from 'lucide-react';

export function BookingForm() {
  const { addBooking } = useBookings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'haircut',
    date: '',
    time: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addBooking(formData);
      setMessage('Запись успешно создана!');
      setFormData({
        name: '',
        phone: '',
        service: 'haircut',
        date: '',
        time: '',
      });
      setSelectedDate(null);
    } catch (error: any) {
      console.error('Ошибка при создании записи:', error);
      setMessage(
        `Произошла ошибка при создании записи: ${error.message || 'Неизвестная ошибка'}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      date: format(date, 'yyyy-MM-dd')
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes('успешно')
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 mr-2" />
              Ваше имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Введите ваше имя"
            />
          </div>

          <div>
            <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Phone className="w-4 h-4 mr-2" />
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div>
            <label htmlFor="service" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Scissors className="w-4 h-4 mr-2" />
              Услуга
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="haircut">Стрижка</option>
              <option value="coloring">Окрашивание</option>
              <option value="styling">Укладка</option>
              <option value="treatment">Уход за волосами</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Дата
            </label>
            <div className="relative">
              <input
                type="text"
                id="date"
                name="date"
                value={selectedDate ? format(selectedDate, 'd MMMM yyyy', { locale: ru }) : ''}
                onClick={() => setIsCalendarOpen(true)}
                readOnly
                required
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm cursor-pointer"
                placeholder="Выберите дату"
              />
              <button
                type="button"
                onClick={() => setIsCalendarOpen(true)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="time" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Clock className="w-4 h-4 mr-2" />
              Время
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Создание записи...
            </>
          ) : (
            'Записаться'
          )}
        </button>
      </form>

      <Calendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </>
  );
} 