'use client';

import WhatsAppMessage from './whatsapp-message/WhatsAppMessage';
import GoogleMessage from './google-message/GoogleMessage';
import OtherMessage from './other-message/OtherMessage';

interface PopupSelectorProps {
    tipoPopup: string;
    phone?: string;
    token?: string;
    googleUrl: string;
    customUrl?: string;
    onClose: () => void;
}

const PopupSelector = ({ tipoPopup, phone, token, googleUrl, customUrl, onClose }: PopupSelectorProps) => {
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
                     googleUrl={googleUrl}
                   />;
            
        case 'PopOtro':
            return <OtherMessage
                     close={onClose}
                     url={customUrl || ''}
                   />;
            
        default:
            return null;
    }
};

export default PopupSelector;