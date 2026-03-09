import React, { useState } from "react";
import styles from "./Choicer.css";


const initialMenuData = {
  Россия: {
    "Кухня": ["Серия 1", "Серия 2", "Серия 3"],
    "Интерны": ["Серия 1", "Серия 2"],
  },
  США: {
    "Friends": ["Episode 1", "Episode 2"],
    "Breaking Bad": ["Episode 1", "Episode 2", "Episode 3"],
  },
  Япония: {
    "Naruto": ["Эпизод 1", "Эпизод 2"],
    "Attack on Titan": ["Эпизод 1"],
  },
};



const Choicer = ({ onSelect }) => {
  const [menuData, setMenuData] = useState(initialMenuData);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newItem, setNewItem] = useState("");

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedShow(null);
    setSelectedEpisode(null);
  };

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    setSelectedEpisode(null);
  };

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    if (selectedCountry && selectedShow && onSelect) {
      onSelect({ country: selectedCountry, show: selectedShow, episode });
    }
  };

  const addCountry = () => {
    if (newItem.trim() && !menuData[newItem]) {
      setMenuData(prev => ({ ...prev, [newItem]: {} }));
      setNewItem("");
    }
  };

  const deleteCountry = (country) => {
    setMenuData(prev => {
      const updated = { ...prev };
      delete updated[country];
      return updated;
    });
    if (selectedCountry === country) {
      setSelectedCountry(null);
      setSelectedShow(null);
      setSelectedEpisode(null);
    }
  };

  const addShow = () => {
    if (selectedCountry && newItem.trim() && !menuData[selectedCountry][newItem]) {
      setMenuData(prev => ({
        ...prev,
        [selectedCountry]: {
          ...prev[selectedCountry],
          [newItem]: []
        }
      }));
      setNewItem("");
    }
  };

  const deleteShow = (show) => {
    if (selectedCountry) {
      setMenuData(prev => {
        const updated = { ...prev };
        delete updated[selectedCountry][show];
        return updated;
      });
      if (selectedShow === show) {
        setSelectedShow(null);
        setSelectedEpisode(null);
      }
    }
  };

  const addEpisode = () => {
    if (selectedCountry && selectedShow && newItem.trim()) {
      setMenuData(prev => ({
        ...prev,
        [selectedCountry]: {
          ...prev[selectedCountry],
          [selectedShow]: [...prev[selectedCountry][selectedShow], newItem]
        }
      }));
      setNewItem("");
    }
  };

  const deleteEpisode = (episode) => {
    if (selectedCountry && selectedShow) {
      setMenuData(prev => ({
        ...prev,
        [selectedCountry]: {
          ...prev[selectedCountry],
          [selectedShow]: prev[selectedCountry][selectedShow].filter(e => e !== episode)
        }
      }));
      if (selectedEpisode === episode) {
        setSelectedEpisode(null);
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 16 }}>
      <button className={editBtnStyle} onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "Выйти из режима редактирования" : "Режим редактирования"}
      </button>
      {!selectedCountry && (
        <div>
          <h3>Выберите страну</h3>
          {Object.keys(menuData).map(country => (
            <div key={country} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button className={btnStyle} onClick={() => handleCountrySelect(country)}>
                {country}
              </button>
              {isEditMode && (
                <button className={deleteBtnStyle} onClick={() => deleteCountry(country)}>Удалить</button>
              )}
            </div>
          ))}
          {isEditMode && (
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новая страна"
                className={inputStyle}
              />
              <button className={addBtnStyle} onClick={addCountry}>Добавить страну</button>
            </div>
          )}
        </div>
      )}
      {selectedCountry && !selectedShow && (
        <div>
          <button className={backBtnStyle} onClick={() => setSelectedCountry(null)}>← Назад</button>
          <h3>Сериалы из {selectedCountry}</h3>
          {Object.keys(menuData[selectedCountry]).map(show => (
            <div key={show} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button className={btnStyle} onClick={() => handleShowSelect(show)}>
                {show}
              </button>
              {isEditMode && (
                <button className={deleteBtnStyle} onClick={() => deleteShow(show)}>Удалить</button>
              )}
            </div>
          ))}
          {isEditMode && (
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новый сериал"
                className={inputStyle}
              />
              <button className={addBtnStyle} onClick={addShow}>Добавить сериал</button>
            </div>
          )}
        </div>
      )}
      {selectedCountry && selectedShow && !selectedEpisode && (
        <div>
          <button className={backBtnStyle} onClick={() => setSelectedShow(null)}>← Назад</button>
          <h3>{selectedShow}: серии</h3>
          {menuData[selectedCountry][selectedShow].map(episode => (
            <div key={episode} style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
              <button className={btnStyle} onClick={() => handleEpisodeSelect(episode)}>
                {episode}
              </button>
              {isEditMode && (
                <button className={deleteBtnStyle} onClick={() => deleteEpisode(episode)}>Удалить</button>
              )}
            </div>
          ))}
          {isEditMode && (
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новая серия"
                className={inputStyle}
              />
              <button className={addBtnStyle} onClick={addEpisode}>Добавить серию</button>
            </div>
          )}
        </div>
      )}
      {selectedCountry && selectedShow && selectedEpisode && (
        <div>
          <button className={backBtnStyle} onClick={() => setSelectedEpisode(null)}>← Назад</button>
          <h3>Вы выбрали:</h3>
          <div style={{fontSize: 18, margin: "16px 0"}}>
            <strong>{selectedCountry}</strong> → <strong>{selectedShow}</strong> → <strong>{selectedEpisode}</strong>
          </div>
          <button className={btnStyle} onClick={() => {
            setSelectedCountry(null);
            setSelectedShow(null);
            setSelectedEpisode(null);
          }}>Сбросить выбор</button>
        </div>
      )}
    </div>
  );
};

const btnStyle = styles.btn;
const backBtnStyle = `${styles.btn} ${styles["btn-back"]}`;
const editBtnStyle = `${styles.btn} ${styles["btn-edit"]}`;
const deleteBtnStyle = `${styles.btn} ${styles["btn-delete"]}`;
const addBtnStyle = `${styles.btn} ${styles["btn-add"]}`;
const inputStyle = styles.input;

export default Choicer;