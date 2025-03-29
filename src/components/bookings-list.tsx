'use client';

import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useBookings } from '../context/BookingsContext';
import { Loader2, Calendar, Clock, Scissors, Phone, X, AlertCircle, Trash2, Search } from 'lucide-react';
import { BookingsFilter } from './bookings-filter';
import { Pagination } from './pagination';
import { DeleteConfirmation } from './delete-confirmation';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ITEMS_PER_PAGE = 5;

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

interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export function BookingsList() {
  const { bookings, deleteBooking, loading, error } = useBookings();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBookingId, setDeleteBookingId] = useState<string | null>(null);
  const [deleteBookingName, setDeleteBookingName] = useState<string>('');
  const itemsPerPage = 10;

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchString = searchQuery.toLowerCase();
      return (
        booking.name.toLowerCase().includes(searchString) ||
        booking.phone.toLowerCase().includes(searchString) ||
        booking.service.toLowerCase().includes(searchString) ||
        booking.date.toLowerCase().includes(searchString) ||
        booking.time.toLowerCase().includes(searchString)
      );
    });
  }, [bookings, searchQuery]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteBookingId(id);
    setDeleteBookingName(name);
  };

  const handleDeleteConfirm = async () => {
    if (deleteBookingId) {
      try {
        await deleteBooking(deleteBookingId);
        setDeleteBookingId(null);
        setDeleteBookingName('');
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteBookingId(null);
    setDeleteBookingName('');
  };

  if (loading) {
    return <div className="text-center p-4">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Ошибка: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Поиск по имени, телефону, услуге или дате..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10"
        />
      </div>

      {currentBookings.length === 0 ? (
        <div className="text-center p-4">
          {searchQuery
            ? 'Нет бронирований, соответствующих поисковому запросу'
            : 'Нет бронирований'}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Имя
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Телефон
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Услуга
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Время
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(booking.id, booking.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
        </>
      )}

      <DeleteConfirmation
        isOpen={deleteBookingId !== null}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        bookingName={deleteBookingName}
      />
    </div>
  );
} 