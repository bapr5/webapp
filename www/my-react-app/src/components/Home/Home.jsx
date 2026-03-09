import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Choicer from "../Choicer/Choicer";
import classes from "./home.css";
import Emojis from "../Emojis/Emojis";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedChoice, setSelectedChoice] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) setSideBarOpen(false);
    if (isRightSwipe) setSideBarOpen(true);
  };

  let pageContent;
  switch (currentPage) {
    case "about":
      pageContent = (
        <>
          <h2>О приложении</h2>
          <p>Это простое PWA-приложение на React.</p>
        </>
      );
      break;
    case "shows":
      pageContent = (
        <>
          <h2>Сериалы</h2>
          <p>Здесь будет информация о сериалах.</p>
          <Choicer onSelect={setSelectedChoice} />
          {selectedChoice && (
            <div style={{marginTop: 16, fontSize: 16}}>
              <strong>Выбранный элемент:</strong><br />
              {selectedChoice.country} → {selectedChoice.show} → {selectedChoice.episode}
            </div>
          )}
        </>
      );
      break;
    case "emojis":
     
      pageContent= (
        <>Test
      <Emojis />
    </>
    );
   
      break;
    default:
      pageContent = (
        <>
          <h2>Главная страница</h2>
          <p>Свайпните вправо, чтобы открыть сайдбар, влево — чтобы закрыть.</p>
          <div>Состояние: {sideBarOpen ? "Открыт" : "Закрыт"}</div>
        </>
      );
  }

  return (
    <div
      className={classes.home}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Sidebar
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setSideBarOpen(false);
        }}
      />
      <header className={classes.header}>
        <button
          className={classes['arrow-btn']}
          onClick={() => {
            console.log('Button clicked, current state:', sideBarOpen);
            setSideBarOpen(!sideBarOpen);
          }}
          aria-label={sideBarOpen ? 'Закрыть сайдбар' : 'Открыть сайдбар'}
        >
          <span
            className={sideBarOpen ? `${classes['arrow-icon']} ${classes['open']}` : classes['arrow-icon']}
            aria-hidden="true"
          >
            ➡️
          </span>
        </button>
        <span className={classes['header-logo']}>mob</span>
        <span style={{ verticalAlign: 'middle' }}>Приложение</span>
      </header>
      <div style={{ padding: '20px' }}>
        {pageContent}
      </div>
    </div>
  );
}
