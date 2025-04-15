'use client';

import { Fragment, useEffect, useState } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';

import style from './site.module.scss';
import HeadSite from './HeadSite';
import ButtonsSite from './ButtonsSite';
import ServicesSite from './ServicesSite';
import SocialNetworsSite from './SocialNetworksSite';
import WhatsAppMessage from '../pop-ups/whatsapp-message/WhatsAppMessage';

interface Props {
    userData: UserDataResponse & {
        MostrarPopup?: boolean;
    };
    tokenServer: string | undefined | null;
    uuidServer: string | undefined | null;
}

const MicrositeHome = ({userData, tokenServer, uuidServer}: Props) => {
    // Estado para controlar si mostrar el mensaje
    const [message, setMessage] = useState<boolean>(false);
    
    // Obtener la preferencia del usuario (por defecto true si no está definido)
    const showPopup = userData?.MostrarPopup ?? true;

    useEffect(() => {
        if (showPopup) {
            setTimeout(() => {
                setMessage(true);
            }, 3500);
        }
    }, [showPopup]);

    return ( 
        <div className="greenWhite">
            <div className="background">
                <Fragment>
                    <div className={`body ${style.Site}`}>
                        <div className="contain">
                            <HeadSite userData={userData} />

                            <ButtonsSite 
                                userData={userData} 
                                tokenServer={tokenServer} 
                                uuidServer={uuidServer}
                            />

                            <ServicesSite userData={userData} />

                            <SocialNetworsSite 
                                userData={userData} 
                                tokenServer={tokenServer}
                            />
                        </div>
                    </div>

                    {userData.Telefono1 && message && (
                        <WhatsAppMessage 
                            close={() => setMessage(false)} 
                            phone={userData.Telefono1} 
                            token={userData.TokenId}
                        />
                    )}
                </Fragment>
            </div>
        </div>
    );
}

export default MicrositeHome;