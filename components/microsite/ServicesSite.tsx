import { UserDataResponse } from '@/interfaces/userData-interface';
import style from './site.module.scss';
import { Fragment } from 'react';
import Image from 'next/image';

interface Props {
    userData: UserDataResponse;
}

const ServicesSite = ({userData} : Props) => {
    return ( 
        <div className={style.Services}>
            { userData && ( 
                <Fragment>
                    <hr/>
        
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

                    <hr/>

                    { userData.Serv?.map((service)=>(
                        (service.ServSiteId === 2 && service.ServSubTitulo) && (
                            <div key={service.ServNum} className={style.ServiceContainer}>
                                <h3>{service.ServSubTitulo}</h3>
                                { service.ServImg && (
                                    <Image 
                                        src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/ServiciosImg/${service.ServImg}?timestamp=${Date.now()}`}
                                        alt='Imagen de servicio'
                                        width={800}
                                        height={800}
                                        priority={false}
                                        unoptimized
                                    />
                                ) }
                                <p>{service.ServDescrip}</p>
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