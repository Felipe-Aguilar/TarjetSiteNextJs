import { UserDataResponse } from '@/interfaces/userData-interface';
import { Fragment } from 'react';

import style from './site.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Workers from './Workers';

interface Props {
    userData: UserDataResponse;
}

const ServicesSite = ({userData} : Props) => {

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

        
                    <h2>{userData.Lev3Desc}</h2>

                    <Image 
                        src={'/images/icono-servicios.svg'}
                        alt='icono'
                        width={90}
                        height={90}
                        className={style.Icon}
                    />
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

                            <Workers uuid={userData.UUID}/>
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
                                    <video width="1000" height="720" autoPlay controls preload="none" style={{width: '100%', height: 'auto'}}>
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