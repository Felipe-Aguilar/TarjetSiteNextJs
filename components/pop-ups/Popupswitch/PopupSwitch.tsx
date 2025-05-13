import { useState, useEffect } from 'react';
import styles from './Popupswitchsocial.module.scss';
import AnalyticsChart from '@/components/analytics/AnalyticsChart';

interface PopupSwitchProps {
  uuid: string;
}

type PopupType = 'PopGoogle' | 'PopWhats';

const PopupSwitch = ({ uuid }: PopupSwitchProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>('PopWhats');
  const [loading, setLoading] = useState(false);

  // Obtener estado actual del popup y tipo
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
      const tipo = data?.SDTSite?.TipoPopup ?? 'PopWhats';
      
      console.log('Estado del popup:', { mostrar, tipo });
      setShowPopup(mostrar);
      setPopupType(tipo as PopupType);
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
  
      setShowPopup(mostrar);
    } catch (error) {
      console.error('Error al actualizar popup:', error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar tipo de popup
  const updatePopupType = async (type: PopupType) => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(
        `https://souvenir-site.com/WebTarjet/APIUsuDtos/ActualizarPopupSite?Usutarjetid=${uuid}&Tipopopup=${type}&_=${timestamp}`
      );

      if (!response.ok) throw new Error('Error al actualizar el tipo de popup');

      setPopupType(type);
    } catch (error) {
      console.error('Error al actualizar tipo de popup:', error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener el estado inicial
  useEffect(() => {
    fetchPopupStatus();
  }, [uuid]);

  const handleSetPopup = (status: boolean) => {
    updatePopupStatus(status);
  };

  const handlePopupTypeChange = (type: PopupType) => {
    updatePopupType(type);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        <button
          className={styles.popupTypeButton}
          onClick={() => handleSetPopup(true)}
          disabled={loading}
        >
          Mostrar Pop-Up
        </button>
        <button
          className={styles.popupTypeButton}
          onClick={() => handleSetPopup(false)}
          disabled={loading}
        >
          Ocultar Pop-Up
        </button>
        <span className={styles.toggleLabel}>
          Estado actual: {showPopup ? 'Mostrado' : 'Oculto'}
          {loading && ' (cargando...)'}
        </span>
      </div>

      {showPopup && (
        <p className={styles.parrafo}>Seleccionar tipo de Pop-Up:</p>
      )}
      {showPopup && (
        <div className={styles.popupTypeSelector}> 
          <button
            className={`${styles.popupTypeButton} ${popupType === 'PopWhats' ? styles.active : ''}`}
            onClick={() => handlePopupTypeChange('PopWhats')}
            type="button"
            disabled={loading}
          >
            WhatsApp
          </button>
          <button
            className={`${styles.popupTypeButton} ${popupType === 'PopGoogle' ? styles.active : ''}`}
            onClick={() => handlePopupTypeChange('PopGoogle')}
            type="button"
            disabled={loading}
          >
            Google
          </button>
        </div>
      )}

      {/* <AnalyticsChart /> */}
    </div>
  );
};

export default PopupSwitch;