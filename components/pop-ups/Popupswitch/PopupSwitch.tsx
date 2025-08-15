import { useState, useEffect } from 'react';
import styles from './Popupswitchsocial.module.scss';

interface PopupSwitchProps {
  uuid: string;
}

type PopupType = 'PopGoogle' | 'PopWhats' | 'PopOtro';

const PopupSwitch = ({ uuid }: PopupSwitchProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>('PopWhats');
  const [customUrl, setCustomUrl] = useState('');
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
      const url = data?.SDTSite?.URLPopup ?? '';
      
      console.log('Estado del popup:', { mostrar, tipo, url });
      setShowPopup(mostrar);
      setPopupType(tipo as PopupType);
      setCustomUrl(url || '');
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
  const updatePopupType = async (type: PopupType, url: string = '') => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      let apiUrl = `https://souvenir-site.com/WebTarjet/APIUsuDtos/ActualizarPopupSite?Usutarjetid=${uuid}&Tipopopup=${type}`;
      
      if (type === 'PopOtro' && url) {
        apiUrl += `&URLpopup=${encodeURIComponent(url)}`;
      }
      
      apiUrl += `&_=${timestamp}`;

      const response = await fetch(apiUrl);

      if (!response.ok) throw new Error('Error al actualizar el tipo de popup');

      setPopupType(type);
      if (type === 'PopOtro') {
        setCustomUrl(url);
      } else {
        setCustomUrl('');
      }
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
    // Cambiar el tipo inmediatamente en el estado local
    setPopupType(type);
    
    // Solo actualizar el backend si no es PopOtro o si es PopOtro con URL existente
    if (type !== 'PopOtro' || (type === 'PopOtro' && customUrl)) {
      updatePopupType(type, type === 'PopOtro' ? customUrl : '');
    }
  };

  const handleCustomUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomUrl(e.target.value);
  };

  const handleSaveCustomUrl = () => {
    if (popupType === 'PopOtro' && customUrl) {
      updatePopupType('PopOtro', customUrl);
    }
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

          <button
            className={`${styles.popupTypeButton} ${popupType === 'PopOtro' ? styles.active : ''}`}
            onClick={() => handlePopupTypeChange('PopOtro')}
            type="button"
            disabled={loading}
          >
            Otro
          </button>
        </div>
      )}

      {showPopup && popupType === 'PopOtro' && (
        <div className={styles.customUrlContainer}>
          <input
            type="text"
            value={customUrl}
            onChange={handleCustomUrlChange}
            placeholder="Ingresa la URL para el Pop Up"
            className={styles.urlInput}
          />
          <button
            onClick={handleSaveCustomUrl}
            disabled={loading || !customUrl}
            className={styles.saveButton}
          >
            Guardar URL
          </button>
          {!customUrl && (
            <p className={styles.urlWarning}>Por favor ingresa una URL válida</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PopupSwitch;