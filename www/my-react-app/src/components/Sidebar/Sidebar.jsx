import React from "react";
import styles from "./Sidebar.css";


export default function Sidebar({ open, onClose, currentPage, onNavigate }) {
  const pages = [
    { key: "home", label: "Главная" },
    { key: "about", label: "О приложении" },
    { key: "profile", label: "Профиль" },
  ];

  return (
    <div className={open ? `${styles.sidebar} ${styles.open}` : styles.sidebar}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть сайдбар">
        ✖
      </button>
      <nav className={styles.content}>
        <h3>Навигация</h3>
        <ul>
          {pages.map(page => (
            <li key={page.key}>
              <button
                className={currentPage === page.key ? styles.active : ""}
                onClick={() => onNavigate(page.key)}
              >
                {page.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}