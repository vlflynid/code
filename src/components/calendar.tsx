'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Calendar({ selectedDate, onDateSelect, isOpen, onClose }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ←
          </button>
          <h3 className="text-lg font-semibold">
            {format(currentDate, 'LLLL yyyy', { locale: ru })}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => {
                onDateSelect(day);
                onClose();
              }}
              className={`
                p-2 text-sm rounded-full transition-colors
                ${!isSameMonth(day, currentDate) ? 'text-gray-400' : ''}
                ${isSameDay(day, selectedDate || new Date()) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
              `}
            >
              {format(day, 'd')}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
} 