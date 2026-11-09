// Мобільний контейнер 390×844; на великому екрані центрується
export default function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen bg-line-off sm:flex sm:items-center sm:justify-center">
      <div className="relative mx-auto h-screen w-full max-w-[390px] overflow-hidden bg-page sm:h-[844px] sm:rounded-[32px] sm:shadow-2xl">
        {children}
      </div>
    </div>
  );
}
