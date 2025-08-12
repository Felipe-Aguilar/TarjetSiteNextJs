import { UserDataResponse } from '@/interfaces/userData-interface';
import { Fragment } from 'react';

import defaultStyle from './site.module.scss';
import winterStyle from '../themes/winter.module.scss'
import darkStyle from '../themes/dark.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Workers from './Workers';

interface Props {
    userData: UserDataResponse;
    tema: string;
}

    

const ServicesSite = ({userData, tema} : Props) => {

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
   

    return ( 
        <div className={style.Services}>
            { userData && ( 
                <Fragment>
                    <hr/>

                    { userData.ImgHeader && (
                        <Image 
                            src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/usuHeaders/${userData.ImgHeader}?timestamp=${Date.now()}`}
                            alt='imagen de encabezado de servicios'
                            width={400}
                            height={800}
                            unoptimized
                            style={{width: '100%', height: 'auto', marginBottom: '20px'}}
                        />
                    )}

                    <Image 
                        src={`${userData.ImgFoto 
                            ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/ImgPerf/${userData.ImgFoto}?timestamp=${Date.now()}` 
                            : '/images/perfil-temporal.webp'
                        }`}
                        alt='Imagen de perfil'
                        width={500}
                        height={500}
                        quality={80}
                        className={style.Perfil} 
                        unoptimized
                    /> 
        
                    <h2>{userData.Lev3Desc}</h2>
                    
                    <ul>
                        { userData.Serv?.map((service)=>(
                            (service.ServSiteId === 1 && service.ServDescrip) && (
                                <li key={service.ServNum}>{service.ServDescrip}</li>
                            )
                        ))}
                    </ul>

                    {userData.Tipo === 'EMP' && (
                        <Fragment>
                            <hr/>

                            <h3 style={{textAlign: 'left', marginBottom: '1.5rem'}}>Colaboradores</h3>

                            <Workers uuid={userData.UUID} tema={tema}/>
                        </Fragment>
                    )}

                    <hr/>

                    { userData.Serv?.map((service)=>(
                        (service.ServSiteId === 2 || service.ServSiteId === 3) && (service.ServSubTitulo || service.ServImg) && (
                            <div key={service.ServNum} className={style.ServiceContainer}>
                                {service.ServSubTitulo && (
                                    <h3>{service.ServSubTitulo}</h3>
                                )}
                                { (service.ServImg && service.ServSiteId === 2) && (
                                    <Image 
                                        src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/ServiciosImg/${service.ServImg}?timestamp=${Date.now()}`}
                                        alt='Imagen de servicio'
                                        width={800}
                                        height={800}
                                        priority={false}
                                        unoptimized
                                    />
                                ) }
                                { (service.ServImg && service.ServSiteId === 3) && (
                                    <video width="1000" height="720" autoPlay controls preload="auto" style={{width: '100%', height: 'auto'}}>
                                        <source src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/ServiciosImg/${service.ServImg}`} type="video/mp4" />
                                        Tu navegador no soporta etiquetas de video.
                                    </video>
                                ) }
                                {service.ServDescrip && (
                                    <p>{service.ServDescrip}</p>
                                )}
                                <hr/>
                            </div>
                        )
                    ))}
                </Fragment>
            )}
        </div>
    );
}

export default ServicesSite;