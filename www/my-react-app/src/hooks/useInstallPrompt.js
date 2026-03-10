import { useState, useEffect } from 'react';

/**
 * Hook для управления установкой приложения на рабочий стол (A2HS)
 * @returns {Object} - { canInstall, installApp }
 */
export const useInstallPrompt = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Предотвращаем автоматическое появление подсказки
      e.preventDefault();
      // Сохраняем событие для последующего использования
      setDeferredPrompt(e);
      // Показываем кнопку установки
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA успешно установлена');
      setDeferredPrompt(null);
      setCanInstall(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Очистка слушателей
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Показываем подсказку установки
    deferredPrompt.prompt();

    // Ожидаем выбора пользователя
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Пользователь ответил: ${outcome}`);

    // Очищаем переменную
    setDeferredPrompt(null);
    setCanInstall(false);
  };

  return {
    canInstall,
    installApp,
  };
};
