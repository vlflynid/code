import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookingsProvider } from "@/context/BookingsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salon Booking",
  description: "Book your appointment at our salon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BookingsProvider>{children}</BookingsProvider>
      </body>
    </html>
  );
} 