'use client';

import { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface BookingsFilterProps {
  onFilterChange: (filters: {
    search: string;
    dateFrom: string;
    dateTo: string;
  }) => void;
}

export function BookingsFilter({ onFilterChange }: BookingsFilterProps) {
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value, dateFrom, dateTo });
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateFrom(value);
    onFilterChange({ search, dateFrom: value, dateTo });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateTo(value);
    onFilterChange({ search, dateFrom, dateTo: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Поиск по имени или телефону..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 mr-2" />
              С даты
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={handleDateFromChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 mr-2" />
              По дату
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={handleDateToChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 