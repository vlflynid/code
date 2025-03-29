# Salon Booking App

Веб-приложение для записи в парикмахерскую, разработанное с использованием Next.js, Tailwind CSS и Supabase.

## Функциональность

- Просмотр календаря доступных дат
- Запись на услуги парикмахерской
- Отмена записи
- Выбор времени и услуги

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` и добавьте в него ваши Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Запустите приложение:
```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## Технологии

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- date-fns 