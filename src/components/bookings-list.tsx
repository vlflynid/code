'use client';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useBookings } from '@/context/BookingsContext';
import { Loader2, Calendar, Clock, Scissors, Phone, X } from 'lucide-react';

const serviceIcons: { [key: string]: JSX.Element } = {
  haircut: <Scissors className="w-4 h-4" />,
  coloring: <span className="text-lg">🎨</span>,
  styling: <span className="text-lg">💇</span>,
  treatment: <span className="text-lg">✨</span>,
};

const serviceNames: { [key: string]: string } = {
  haircut: 'Стрижка',
  coloring: 'Окрашивание',
  styling: 'Укладка',
  treatment: 'Уход за волосами',
};

export function BookingsList() {
  const { bookings, deleteBooking, loading, error } = useBookings();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Произошла ошибка при загрузке записей
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-block p-3 bg-gray-50 rounded-full mb-4">
          <Calendar className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Нет активных записей</h3>
        <p className="text-gray-500">Записей на услуги пока нет</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-50 rounded-full">
                {serviceIcons[booking.service]}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{booking.name}</h3>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-1.5" />
                    {booking.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {format(new Date(booking.date), 'd MMMM yyyy', { locale: ru })}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {booking.time}
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {serviceNames[booking.service]}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(booking.id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Отменить запись"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 