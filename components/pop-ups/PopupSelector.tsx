'use client';

import WhatsAppMessage from './whatsapp-message/WhatsAppMessage';
import GoogleMessage from './google-message/GoogleMessage';

interface PopupSelectorProps {
    tipoPopup: string;
    phone?: string;
    token?: string;
    onClose: () => void;
}

const PopupSelector = ({ tipoPopup, phone, token, onClose }: PopupSelectorProps) => {
    // Asignar 'PopWhats' como valor por defecto si está vacío
    const popupType = tipoPopup || 'PopWhats';

    switch(popupType) {
        case 'PopWhats':
            return phone && token ? (
                <WhatsAppMessage 
                    close={onClose} 
                    phone={phone} 
                    token={token}
                />
            ) : null;
        
        case 'PopGoogle':
            return <GoogleMessage close={onClose} />;
            
        default:
            // Por seguridad, si llega un tipo desconocido, no mostrar nada
            return null;
    }
};

export default PopupSelector;