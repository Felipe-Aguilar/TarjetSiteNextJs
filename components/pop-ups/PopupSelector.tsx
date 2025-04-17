// components/pop-ups/PopupSelector.tsx
'use client';

import WhatsAppMessage from './whatsapp-message/WhatsAppMessage';
import GoogleMessage from './google-message/GoogleMessage';

interface PopupSelectorProps {
    tipoPopup: string;
    phone?: string;
    token?: string;
    googleUrl: string; // Nueva prop para la URL de Google
    onClose: () => void;
}

const PopupSelector = ({ tipoPopup, phone, token, googleUrl, onClose }: PopupSelectorProps) => {
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
            return <GoogleMessage 
                     close={onClose} 
                     googleUrl={googleUrl} // Pasar la URL de Google
                   />;
            
        default:
            return null;
    }
};

export default PopupSelector;