import { useState, useEffect } from 'react';
import styles from './Popupswitchsocial.module.scss';
import EditData from '@/app/api/editData';
import { UserDataResponse } from '@/interfaces/userData-interface';

interface PopupSwitchProps {
  userData: UserDataResponse; // Usamos la interfaz UserDataResponse que ya tienes definida
}

type PopupType = 'PopGoogle' | 'PopWhats' | 'PopOtro';

const PopupSwitch = ({ userData }: PopupSwitchProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>('PopWhats');
  const [customUrl, setCustomUrl] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Obtener estado actual del popup y tipo
  const fetchPopupStatus = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(
        `https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaMiSite?Siteusuid=${userData.UUID}&_=${timestamp}`
      );

      if (!response.ok) throw new Error('Error al consultar el sitio');

      const data = await response.json();
      
      setShowPopup(data?.SDTSite?.MostrarPopup ?? false);
      setPopupType((data?.SDTSite?.TipoPopup ?? 'PopWhats') as PopupType);
      setCustomUrl(data?.SDTSite?.URLPopup ?? '');
      setPopupMessage(data?.SDTSite?.SiteTextoUbica ?? '');
    } catch (error) {
      console.error('Error al obtener el estado del popup:', error);
    }
  };

  // Actualizar estado del popup (mostrar/ocultar)
  const updatePopupStatus = async (mostrar: boolean) => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(
        `https://souvenir-site.com/WebTarjet/APIUsuDtos/MostrarPopupSite?Usutarjetid=${userData.UUID}&Activo=${mostrar}&_=${timestamp}`
      );

      if (!response.ok) throw new Error('Error al actualizar el estado del popup');

      setShowPopup(mostrar);
    } catch (error) {
      console.error('Error al actualizar popup:', error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar tipo de popup y URL
  const updatePopupType = async (type: PopupType, url: string = '') => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      let apiUrl = `https://souvenir-site.com/WebTarjet/APIUsuDtos/ActualizarPopupSite?Usutarjetid=${userData.UUID}&Tipopopup=${type}`;
      
      if (type === 'PopOtro' && url) {
        apiUrl += `&URLpopup=${encodeURIComponent(url)}`;
      }
      
      apiUrl += `&_=${timestamp}`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Error al actualizar el tipo de popup');

      setPopupType(type);
      setCustomUrl(type === 'PopOtro' ? url : '');
    } catch (error) {
      console.error('Error al actualizar tipo de popup:', error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar el mensaje del popup usando EditData
  const savePopupMessage = async () => {
    if (!popupMessage) return;
    
    setLoading(true);
    try {
      await EditData({
        userData,
        popupForm: {
          TexoUbica: popupMessage
        }
      });
    } catch (error) {
      console.error('Error al guardar el mensaje del popup:', error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar toda la configuración del popup
  const handleSavePopup = async () => {
    setLoading(true);
    try {
      // Primero actualizamos el tipo y URL (si es necesario)
      if (popupType === 'PopOtro') {
        await updatePopupType(popupType, customUrl);
      }
      
      // Luego guardamos el mensaje
      if (popupMessage) {
        await savePopupMessage();
      }
    } catch (error) {
      console.error('Error al guardar la configuración del popup:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopupStatus();
  }, [userData.UUID]);

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        <button
          className={styles.popupTypeButton}
          onClick={() => updatePopupStatus(true)}
          disabled={loading}
        >
          Mostrar Pop-Up
        </button>
        <button
          className={styles.popupTypeButton}
          onClick={() => updatePopupStatus(false)}
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
        <>
          <p className={styles.parrafo}>Seleccionar tipo de Pop-Up:</p>
          <div className={styles.popupTypeSelector}>
            <button
              className={`${styles.popupTypeButton} ${popupType === 'PopWhats' ? styles.active : ''}`}
              onClick={() => updatePopupType('PopWhats')}
              disabled={loading}
            >
              WhatsApp
            </button>
            <button
              className={`${styles.popupTypeButton} ${popupType === 'PopGoogle' ? styles.active : ''}`}
              onClick={() => updatePopupType('PopGoogle')}
              disabled={loading}
            >
              Google
            </button>
            <button
              className={`${styles.popupTypeButton} ${popupType === 'PopOtro' ? styles.active : ''}`}
              onClick={() => updatePopupType('PopOtro')}
              disabled={loading}
            >
              Otro
            </button>
          </div>
        </>
      )}

      {showPopup && popupType === 'PopOtro' && (
        <div className={styles.customUrlContainer}>
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Ingresa la URL para el Pop Up"
            className={styles.urlInput}
          />
          <input
            type="text"
            value={popupMessage}
            onChange={(e) => setPopupMessage(e.target.value)}
            placeholder="Ingresa el mensaje para el Pop Up"
            className={styles.urlInput}
          />
          <button
            onClick={handleSavePopup}
            disabled={loading || (!customUrl && !popupMessage)}
            className={styles.saveButton}
          >
            Guardar Mensaje
          </button>
          {!customUrl && !popupMessage && (
            <p className={styles.urlWarning}>Por favor ingresa una URL o un mensaje válido</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PopupSwitch;