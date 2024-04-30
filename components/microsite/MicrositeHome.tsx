'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';

import style from './site.module.scss';
import userData from '@/app/api/userData';
import HeadSite from './HeadSite';
import ButtonsSite from './ButtonsSite';
import ServicesSite from './ServicesSite';

interface Props {
    tokenServer: string | undefined | null;
}

const MicrositeHome = ({tokenServer}: Props) => {

    const { token } = useParams();
    const [data, setData] = useState<UserDataResponse>();

    useEffect(()=>{
        const getUserData = async () => {

            const tk = atob(Array.isArray(token) ? token[0].toString() : token);

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

    return ( 
        <div className="greenWhite">
            <div className="background">
                <div className={`body ${style.Site}`}>
                    <div className="contain">
                        <HeadSite userData={data!} />

                        <ButtonsSite userData={data!} />

                        <ServicesSite userData={data!}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MicrositeHome;