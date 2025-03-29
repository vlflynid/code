import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { BookingsProvider } from "@/context/BookingsContext";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Салон красоты - Онлайн запись",
  description: "Запишитесь онлайн в наш салон красоты",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          <BookingsProvider>{children}</BookingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 