import React from 'react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import './InstallButton.css';

/**
 * Компонент для отображения кнопки установки приложения на рабочий стол
 */
const InstallButton = () => {
  const { canInstall, installApp } = useInstallPrompt();



  return (
    <button 
      className="install-button"
      onClick={installApp}
      title="Добавить приложение на рабочий стол"
      aria-label="Установить приложение"
    >
      <span className="install-icon">⬇️</span>
      <span className="install-text">Установить</span>
    </button>
  );
};

export default InstallButton;
