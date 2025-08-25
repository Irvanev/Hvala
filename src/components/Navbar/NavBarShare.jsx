import React from "react";
import { useHistory } from "react-router-dom";

export const NavBarShare = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Поделиться страницей',
        url: window.location.href
      }).then(() => {
        console.log('Успешное открытие диалога "Поделиться"');
      })
        .catch((error) => {
          console.log('Ошибка при открытии диалога "Поделиться"', error);
        });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          console.log('Ссылка скопирована в буфер обмена');
          alert('Ссылка скопирована в буфер обмена');
        })
        .catch((err) => {
          console.log('Ошибка при копировании ссылки в буфер обмена', err);
        });
    }
  };

  return (
    <div className="d-lg-none">
      <div className="lg:hidden fixed top-0 w-full z-50 border-b border-gray-300 bg-customColor1 h-16 pt-4">
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={goBack} className="text-blue-500">
            <svg className="w-6 h-6 text-customColor3 transition-transform transform active:scale-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
            </svg>
          </button>
          <button onClick={handleShare} className="text-blue-500">
            <svg class="w-6 h-6 text-customColor3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
}