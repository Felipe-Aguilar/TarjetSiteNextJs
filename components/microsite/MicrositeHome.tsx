// components/microsite/MicrositeHome.tsx
'use client';

import { Fragment, useEffect, useState } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';

import defaultStyle from './site.module.scss';
import winterStyle from '../themes/winter.module.scss'
import darkStyle from '../themes/dark.module.scss';

import HeadSite from './HeadSite';
import ButtonsSite from './ButtonsSite';
import ServicesSite from './ServicesSite';
import SocialNetworsSite from './SocialNetworksSite';
import PopupSelector from '../pop-ups/PopupSelector';
import Image from 'next/image';
import userData from '@/app/api/userData';

interface Props {
    userData: UserDataResponse & {
        MostrarPopup?: boolean;
        TipoPopup?: string;
        SiteGoogle?: string;
        customUrl?: string;
        message?: string;
        Tema?: string; 
        ImagenPopup: string;
        RegistroTarjet?: boolean;
    };
    tokenServer: string | undefined | null;
    uuidServer: string | undefined | null;
}

const MicrositeHome = ({userData, tokenServer, uuidServer}: Props) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showStickyImage, setShowStickyImage] = useState<boolean>(true);
    const tema = userData.Tema || ''; // Usar el tema del usuario o un valor por defecto
    
    // Verificar si el usuario está registrado
    const isUserRegistered = userData.RegistroTarjet === true;
    
    // Determinar qué tema usar
    const getThemeStyle = () => {
        switch(tema) {
            case 'invierno':
                return winterStyle;
            case 'oscuro':
                return darkStyle;
            default:
                return defaultStyle;
        }
    };
    const style = getThemeStyle();

    const googleSocial = userData.ListRedesSociales?.find(item => item.RedSocialId === "GOOG");
    const googleUrl = googleSocial ? googleSocial.RedSocialUrl : '';

    const customUrl = userData.customUrl;    
    const message = userData.message;

    useEffect(() => {
        if (userData.MostrarPopup && isUserRegistered) {
            setTimeout(() => {
                setShowPopup(true);
            }, 3500);
        }
    }, [userData.MostrarPopup, isUserRegistered]);    

    useEffect(() => {
        const encodedTokenId = btoa(userData.TokenId);

        if (encodedTokenId !== 'YjUyYTQ1Zjhm') return;
        if (!("Notification" in window) || !("serviceWorker" in navigator)) return;

        navigator.serviceWorker.register("/sw.js").then(registration => {
            console.log("SW registrado:", registration);

            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    // === HORA OBJETIVO ===
                    const targetHour = 12;  // 12 PM
                    const targetMinute = 15; // 12:15 PM

                    const now = new Date();
                    const options = { timeZone: 'America/Mexico_City', hour12: false };
                    const cdmxDate = new Date(now.toLocaleString('en-US', options));

                    const targetTime = new Date(cdmxDate);
                    targetTime.setHours(targetHour, targetMinute, 0, 0);

                    if (targetTime < cdmxDate) {
                        targetTime.setDate(targetTime.getDate() + 1);
                    }

                    const delay = targetTime.getTime() - cdmxDate.getTime();

                    console.log("Notificación programada en", delay / 1000, "segundos");

                    setTimeout(() => {
                        registration.showNotification("¿Te gustó este perfil?", {
                            body: "Vuelve a visitar el sitio de este usuario 😊",
                            icon: "/images/registro-exitoso.png",
                            data: {
                                url: 'https://tarjet.site/st/' + encodedTokenId
                            },
                            tag: "recordatorio-micrositio"
                        });
                    }, delay);
                }
            });
        });
    }, [userData.TokenId]);

    console.log('Datos del usuario en MicrositeHome:', userData);

    // Si el usuario no está registrado, mostrar mensaje de error
    if (!isUserRegistered) {
        return (
            <div className={tema.length > 1 ? style.Site : 'greenWhite'}>
                <div className="background">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            maxWidth: '500px',
                            padding: '40px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            fontFamily: 'Arial, sans-serif'
                        }}>
                            <div style={{
                                fontSize: '64px',
                                marginBottom: '20px'
                            }}>
                                🔍
                            </div>
                            <h2 style={{
                                color: '#333',
                                marginBottom: '15px',
                                fontSize: '24px'
                            }}>
                                Usuario no encontrado o eliminado
                            </h2>
                            <p style={{
                                color: '#666',
                                lineHeight: '1.6',
                                marginBottom: '20px'
                            }}>
                                Si Usted es el propietario y piensa que se trata de un error, 
                                contáctenos para más información.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return ( 
        <div className={tema.length > 1 ? style.Site : 'greenWhite'}>
            <div className="background">
                <Fragment>
                    <div
                        className={`body ${style.Site}`}
                        style={userData.Premium ? { padding: '7px 0 40px 5px' } : { padding: '45px 0' }}
                    >
                        <div className="contain">
                            <HeadSite userData={userData} tema={tema} />

                            <ButtonsSite 
                                userData={userData} 
                                tokenServer={tokenServer} 
                                uuidServer={uuidServer}
                                tema={tema}
                            />

                            <ServicesSite userData={userData} tema={tema}/>

                            <SocialNetworsSite 
                                userData={userData} 
                                tokenServer={tokenServer}
                                tema={tema}
                            />
                        </div>
                    </div>

                    {showPopup && (
                        <PopupSelector
                            tipoPopup={userData.TipoPopup || 'PopWhats'}
                            phone={userData.Telefono1}
                            token={userData.TokenId}
                            googleUrl={googleUrl}
                            customUrl={customUrl}
                            message={message}
                            onClose={() => setShowPopup(false)}
                            ImagenPopup={userData.ImagenPopup}
                        />
                    )}

                    {/* Imagen sticky con botón de cerrar */}
                    {((userData.AppP?.toLowerCase()) == "castro" || (userData.AppM?.toLowerCase()) == "castro") && showStickyImage && (
                        <div style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            zIndex: 1000,
                            width: '200px',
                            height: 'auto',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}>
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%'
                            }}>
                                <Image 
                                    src="/images/AsistVirTarjet_Demo_1.jpg" 
                                    alt="Demo" 
                                    width={200}
                                    height={300}
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: 'auto'
                                    }}
                                />
                                <button 
                                    onClick={() => setShowStickyImage(false)}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}
                </Fragment>
            </div>
        </div>
    );
}

export default MicrositeHome;