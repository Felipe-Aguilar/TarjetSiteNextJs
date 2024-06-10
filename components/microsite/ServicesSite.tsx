import { UserDataResponse } from '@/interfaces/userData-interface';
import { Fragment, useEffect, useState } from 'react';

import style from './site.module.scss';
import Image from 'next/image';

interface Props {
    userData: UserDataResponse;
}

const ServicesSite = ({userData} : Props) => {

    // Colaboradores de una empresa
    const [workers, setWorkers] = useState<string []>();

    useEffect(()=>{

        const getWorkersCompany = async () => {
            const response = await fetch('', {
                method: 'GET',
                mode: 'cors'
            });

            const data = await response.json();

            setWorkers(data);
        }

        if (userData.Tipo === 'EMP') {
            getWorkersCompany();
        }

    }, []);

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

                    {/* TODO: Terminar mostrar empleados aquí */}

                    {/* Debe ser un arreglo de colaboradores y usarlos en un map. El diseño según me lo pasa él pero esto no tiene ni pies ni cabeza */}
                    {userData.Tipo === 'EMPR' && (
                        <Fragment>
                            <hr/>

                            <div className='Empleado'>
                                
                            </div>

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
                                    <video width="1000" height="720" autoPlay controls muted preload="none" style={{width: '100%', height: 'auto'}}>
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