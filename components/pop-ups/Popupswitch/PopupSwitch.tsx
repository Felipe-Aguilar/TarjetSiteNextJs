import { useState, useEffect } from 'react';
import styles from './Popupswitchsocial.module.scss';

interface PopupSwitchProps {
  uuid: string; // Añadimos prop para el UUID del usuario
}

const PopupSwitch = ({ uuid }: PopupSwitchProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'whatsapp' | 'google'>('whatsapp');
  const [loading, setLoading] = useState(false);

  // Función para obtener el estado actual del popup
  const fetchPopupStatus = async () => {
    try {
      const response = await fetch(
        `https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaMiSite?Siteusuid=${uuid}`
      );
      const data = await response.json();
      console.log('Estado del data:', data);
      const mostrar = data.SDTSite.MostrarPopup;
      console.log('Estado del popup:', mostrar);
      setShowPopup(mostrar || false);
    } catch (error) {
      console.error('Error fetching popup status:', error);
    }
  };

  // Función para actualizar el estado del popup
  const updatePopupStatus = async (mostrar: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://souvenir-site.com/WebTarjet/APIUsuDtos/MostrarPopupSite?Usutarjetid=${uuid}&Activo=${mostrar ? 'TRUE' : 'FALSE'}`,
        {
          method: 'GET',
        }
      );
      console.log('Respuesta de la API:', response);
      
      if (response.ok) {
        setShowPopup(mostrar);
      }
    } catch (error) {
      console.error('Error updating popup status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopupStatus();
  }, [uuid]);

  const handleToggleChange = () => {
    const newState = !showPopup;
    updatePopupStatus(newState);
  };

  const handlePopupTypeChange = (type: 'whatsapp' | 'google') => {
    setPopupType(type);
    console.log('Tipo de popup seleccionado:', type);
    // Aquí puedes agregar la llamada a la API cuando esté disponible
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