import { Calendar } from "@/components/calendar";
import { BookingForm } from "@/components/booking-form";
import { BookingsList } from "@/components/bookings-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Запись в парикмахерскую</h1>
          <p className="text-lg text-gray-600">Выберите удобное время и услугу</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Записаться</h2>
              <BookingForm />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ваши записи</h2>
              <BookingsList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 