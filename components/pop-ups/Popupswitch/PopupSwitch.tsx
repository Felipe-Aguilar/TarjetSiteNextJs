import { useState } from 'react';
import styles from './Popupswitchsocial.module.scss';

const PopupSwitch = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'whatsapp' | 'google'>('whatsapp');

  const handleToggleChange = () => {
    const newState = !showPopup;
    setShowPopup(newState);
    console.log('Mostrar popup:', newState);
    // llamada a la API
  };

  const handlePopupTypeChange = (type: 'whatsapp' | 'google') => {
    setPopupType(type);
    console.log('Tipo de popup seleccionado:', type);
    // llamada a la API
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        <label className={styles.toggleSwitch}>
          <input 
            type="checkbox" 
            checked={showPopup} 
            onChange={handleToggleChange} 
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleLabel}>
          {showPopup ? 'Ocultar pop-up social' : 'Mostrar pop-up social'}
        </span>
      </div>

      {showPopup && (
        <div className={styles.popupTypeSelector}>
          <button
            className={`${styles.popupTypeButton} ${popupType === 'whatsapp' ? styles.active : ''}`}
            onClick={() => handlePopupTypeChange('whatsapp')}
            type="button"
          >
            WhatsApp
          </button>
          <button
            className={`${styles.popupTypeButton} ${popupType === 'google' ? styles.active : ''}`}
            onClick={() => handlePopupTypeChange('google')}
            type="button"
          >
            Google
          </button>
        </div>
      )}
    </div>
  );
};

export default PopupSwitch;