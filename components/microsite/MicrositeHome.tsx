'use client';

import { useParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';
import { NextSeo } from 'next-seo';

import style from './site.module.scss';
import userData from '@/app/api/userData';
import HeadSite from './HeadSite';
import ButtonsSite from './ButtonsSite';
import ServicesSite from './ServicesSite';
import SocialNetworsSite from './SocialNetworksSite';
import WhatsAppMessage from '../pop-ups/whatsapp-message/WhatsAppMessage';

interface Props {
    tokenServer: string | undefined | null;
    uuidServer: string | undefined | null;
}

const MicrositeHome = ({tokenServer, uuidServer}: Props) => {

    const { token } = useParams();
    const [data, setData] = useState<UserDataResponse>();
    const [tokenClient, setTokenClient] = useState<string>('');

    useEffect(()=>{
        const getUserData = async () => {

            const tk = atob(Array.isArray(token) ? token[0].toString() : token);
            setTokenClient(tk);

            const responseToken = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaUsuXToken`,{
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "Token": tk
                })
            });

            const dataToken = await responseToken.json();

            const response = await userData(dataToken.usuId);

            setData(response);
        }

        getUserData();
    },[])

    // *Mensaje de WhatsApp
    const [message, setMessage] = useState<boolean>(false);

    useEffect(()=>{
        setTimeout(()=>{
            setMessage(true);
        }, 3500)
    },[])

    return ( 
        <div className="greenWhite">
            <div className="background">
                { data && (
                    <Fragment>

                        <NextSeo 
                            title='NEXT SEO TITLE'
                            description='NEXT SEO DESCRIPTION'
                            openGraph={{
                                title: 'Title next seo',
                                description: 'description next seo'
                            }}
                        />

                        <div className={`body ${style.Site}`}>
                            <div className="contain">
                                <HeadSite userData={data!} />

                                <ButtonsSite userData={data!} tokenServer={tokenServer} tokenClient={tokenClient} uuidServer={uuidServer} uuidClient={data!.UUID}/>

                                <ServicesSite userData={data!}/>

                                <SocialNetworsSite userData={data!}/>
                            </div>
                        </div>

                        { message &&  <WhatsAppMessage close={()=>setMessage(false)} phone={data.Telefono1}/> }

                    </Fragment>
                ) }
            </div>
        </div>
    );
}

export default MicrositeHome;