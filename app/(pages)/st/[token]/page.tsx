'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';
import style from './site.module.scss';
import userData from '@/app/api/userData';
import Image from 'next/image';

const SitePage = () => {

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
                        <div className={style.Head}>
                            <Image 
                                src={`https://tarjet.site/imagenes/tarjetas_frente_usuarios/${data?.ImgTarFrente}`}
                                alt='Tarjeta de presentación'
                                width={820}
                                height={515}
                                quality={100}
                                className={style.Card}
                            />
                            <Image 
                                src={`https://tarjet.site/imagenes/perfil-imagenes/${data?.ImgFoto}`}
                                alt='Imagen de perfil'
                                width={500}
                                height={500}
                                quality={100}
                                className={style.Perfil}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePage;