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
      const timestamp = new Date().getTime();
      const response = await fetch(
        `https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaMiSite?Siteusuid=${uuid}&_=${timestamp}`
      );     

      if (!response.ok) throw new Error('Error al consultar el sitio');

      const data = await response.json();
      console.log('Respuesta completa:', data);

      const mostrar = data?.SDTSite?.MostrarPopup ?? false;
      console.log('Estado del popup (mostrar):', mostrar);
      setShowPopup(mostrar);
    } catch (error) {
      console.error('Error al obtener el estado del popup:', error);
    }
  };

  // Actualizar estado del popup
  const updatePopupStatus = async (mostrar: boolean) => {
    console.log('Intentando actualizar popup a:', mostrar);
    setLoading(true);
  
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(
        `https://souvenir-site.com/WebTarjet/APIUsuDtos/MostrarPopupSite?Usutarjetid=${uuid}&Activo=${mostrar}&_=${timestamp}`
      );
  
      console.log('Respuesta al actualizar popup:', response);
  
      if (!response.ok) throw new Error('Error al actualizar el estado del popup');
  
      // Actualizamos el estado directamente sin esperar al backend
      setShowPopup(mostrar);
    } catch (error) {
      console.error('Error al actualizar popup:', error);
    } finally {
      setLoading(false);
    }
  };
  

  // Obtener el estado inicial
  useEffect(() => {
    fetchPopupStatus();
  }, [uuid]);

  // Volver a consultar si showPopup cambia
  useEffect(() => {
    console.log('Cambio en showPopup:', showPopup);
  }, [showPopup]);

  const handleSetPopup = (status: boolean) => {
    updatePopupStatus(status);
  };

  const handlePopupTypeChange = (type: 'whatsapp' | 'google') => {
    setPopupType(type);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        <button
          className={styles.popupTypeButton}
          onClick={() => handleSetPopup(true)}
          disabled={loading}
        >
          Mostrar popup
        </button>
        <button
          className={styles.popupTypeButton}
          onClick={() => handleSetPopup(false)}
          disabled={loading}
        >
          Ocultar popup
        </button>
        <span className={styles.toggleLabel}>
          Estado actual: {showPopup ? 'Mostrado' : 'Oculto'}
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
