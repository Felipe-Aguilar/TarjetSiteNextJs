import { useState, useEffect } from 'react';
import styles from './Popupswitchsocial.module.scss';

interface PopupSwitchProps {
  uuid: string;
}

const PopupSwitch = ({ uuid }: PopupSwitchProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'whatsapp' | 'google'>('whatsapp');
  const [loading, setLoading] = useState(false);

  // Obtener estado actual del popup
  const fetchPopupStatus = async () => {
    try {
      const response = await fetch(
        `https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaMiSite?Siteusuid=${uuid}`
      );
  
      if (!response.ok) throw new Error('Error al consultar el sitio');
  
      const data = await response.json();
      const mostrar = data?.SDTSite?.MostrarPopup;
  console.log('Estado del popup:', mostrar);
      setShowPopup(mostrar);

    } catch (error) {
      console.error('Error al obtener el estado del popup:', error);
    }
  };
  

  // Actualizar estado del popup
  const updatePopupStatus = async (mostrar: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://souvenir-site.com/WebTarjet/APIUsuDtos/MostrarPopupSite?Usutarjetid=${uuid}&Activo=${mostrar}`,
        {
          method: 'GET',
        }
      );
  
      if (!response.ok) throw new Error('Error al actualizar el estado del popup');
  
      setShowPopup(mostrar);
    } catch (error) {
      console.error('Error al actualizar popup:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPopupStatus();
  }, [uuid]);

  const handleToggleChange = () => {
    updatePopupStatus(!showPopup);
  };

  const handlePopupTypeChange = (type: 'whatsapp' | 'google') => {
    setPopupType(type);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        <label className={styles.toggleSwitch}>
          <input 
            type="checkbox" 
            checked={showPopup} 
            onChange={handleToggleChange}
            disabled={loading}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleLabel}>
          {showPopup ? 'Ocultar pop-up social' : 'Mostrar pop-up social'}
          {loading && ' (cargando...)'}
        </span>
      </div>

      {showPopup && (
        <div className={styles.popupTypeSelector}>
          <button
            className={`${styles.popupTypeButton} ${popupType === 'whatsapp' ? styles.active : ''}`}
            onClick={() => handlePopupTypeChange('whatsapp')}
            type="button"
            disabled={loading}
          >
            WhatsApp
          </button>
          <button
            className={`${styles.popupTypeButton} ${popupType === 'google' ? styles.active : ''}`}
            onClick={() => handlePopupTypeChange('google')}
            type="button"
            disabled={loading}
          >
            Google
          </button>
        </div>
      )}
    </div>
  );
};

export default PopupSwitch;
