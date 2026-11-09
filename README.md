# ToolShare — мобільний вебзастосунок (ЛР5)

Оренда побутових інструментів між сусідами. React 18 + Vite + Tailwind CSS, дані в LocalStorage, без бекенду.

## Запуск
    npm install
    npm run dev      # http://localhost:5173
    npm run build    # збірка у папку dist

## Екрани
Авторизація · Пошук · Картка інструменту · Чат з власником · Розумний підбір · Набір інструментів ·
Календар · Оплата (тестовий режим) · Інструкція з безпеки · Акт прийому-передачі · Нове оголошення · Мої оренди

## Тестові дані
- Демо-дата календаря: 10.10.2026, дати 15–17 жовтня зайняті.
- Картки: 4242 4242 4242 4242 — успішна оплата, 4242 4242 4242 0002 — відмова. CVV будь-які 3 цифри.
- «Мої оренди» → «Скинути демо-дані» очищує LocalStorage.

## Структура
    src/
      main.jsx, App.jsx        вхід, тема, маршрути (HashRouter)
      index.css                токени світлої й темної тем (з ЛР4)
      state/                   BookingContext (стан оренди), storage (LocalStorage)
      data/                    інструменти, каталог задач, підбір набору
      utils/                   формати, тарифи, розрахунок бронювання
      hooks/                   useStored (стан у LocalStorage)
      components/              PhoneFrame, AppScreen, TopBar, BottomNav, ToolCard, Row
        ui/                    Button, Field, Chip
        calendar/              MonthGrid, QuoteCard
        act/                   Photos, ReturnAct
      screens/                 12 екранів

## Публікація
Push у гілку main запускає .github/workflows/deploy.yml: збірка й публікація на GitHub Pages.
