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

interface Props {
    userData: UserDataResponse & {
        MostrarPopup?: boolean;
        TipoPopup?: string;
    };
    tokenServer: string | undefined | null;
    uuidServer: string | undefined | null;
}

const MicrositeHome = ({userData, tokenServer, uuidServer}: Props) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        if (userData.MostrarPopup && userData.TipoPopup) {
            setTimeout(() => {
                setShowPopup(true);
            }, 1500);
        }
    }, [userData.MostrarPopup, userData.TipoPopup]);

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
                            tipoPopup={userData.TipoPopup || ''}
                            phone={userData.Telefono1}
                            token={userData.TokenId}
                            onClose={() => setShowPopup(false)}
                        />
                    )}
                </Fragment>
            </div>
        </div>
    );
}

export default MicrositeHome;