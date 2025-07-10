// components/microsite/MicrositeHome.tsx
'use client';

import { Fragment, useEffect, useState } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';

import style from './site.module.scss';
import HeadSite from './HeadSite';
import ButtonsSite from './ButtonsSite';
import ServicesSite from './ServicesSite';
import SocialNetworsSite from './SocialNetworksSite';
import PopupSelector from '../pop-ups/PopupSelector';
import Image from 'next/image';

interface Props {
    userData: UserDataResponse & {
        MostrarPopup?: boolean;
        TipoPopup?: string;
        SiteGoogle?: string; // Asegúrate de que la interfaz incluya este campo
    };
    tokenServer: string | undefined | null;
    uuidServer: string | undefined | null;
}

const MicrositeHome = ({userData, tokenServer, uuidServer}: Props) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showStickyImage, setShowStickyImage] = useState<boolean>(true);

    // Extraer SiteGoogle directamente de userData (ya viene de la API)
    const siteGoogle = userData.SiteGoogle || '';

    useEffect(() => {
        if (userData.MostrarPopup) {
            setTimeout(() => {
                setShowPopup(true);
            }, 3500);
        }
    }, [userData.MostrarPopup]);    

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

                    {showPopup && (
                        <PopupSelector 
                            tipoPopup={userData.TipoPopup || 'PopWhats'}
                            phone={userData.Telefono1}
                            token={userData.TokenId}
                            googleUrl={siteGoogle} // Usar el valor extraído de la API
                            onClose={() => setShowPopup(false)}
                        />
                    )}

                    {/* Imagen sticky con botón de cerrar */}
                    {((userData.AppP.toLowerCase()) == "castro" || (userData.AppM.toLowerCase()) == "castro") && showStickyImage && (
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