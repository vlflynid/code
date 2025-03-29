'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  user_id: string;
}

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  refreshBookings: () => Promise<void>;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    // Подписываемся на изменения в таблице bookings
    const channel = supabase
      .channel('bookings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addBooking = async (booking: Omit<Booking, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

      if (error) throw error;
      
      await fetchBookings(); // Обновляем список после добавления
      return data;
    } catch (error: any) {
      console.error('Error adding booking:', error);
      throw error;
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchBookings(); // Обновляем список после удаления
    } catch (error: any) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  };

  return (
    <BookingsContext.Provider 
      value={{ 
        bookings, 
        addBooking, 
        deleteBooking, 
        loading, 
        error,
        refreshBookings: fetchBookings
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
} 