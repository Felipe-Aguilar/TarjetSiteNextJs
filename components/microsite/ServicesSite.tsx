import { UserDataResponse } from '@/interfaces/userData-interface';
import { Fragment, useEffect, useRef } from 'react';

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
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Crear observer para animaciones de scroll
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-reveal');
                        observerRef.current?.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observar elementos con clase 'reveal-on-scroll'
        const elementsToObserve = document.querySelectorAll('.reveal-on-scroll');
        elementsToObserve.forEach(el => {
            observerRef.current?.observe(el);
        });

        return () => {
            observerRef.current?.disconnect();
        };
    }, [userData]);

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
                        <div className={`${style.HeaderImageContainer} reveal-on-scroll`}>
                            <Image 
                                src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/usuHeaders/${userData.ImgHeader}?timestamp=${Date.now()}`}
                                alt='imagen de encabezado de servicios'
                                width={400}
                                height={800}
                                unoptimized
                                className={style.HeaderImage}
                            />
                        </div>
                    )}

                    {userData.Premium && (
                        <div className={`${style.ProfileContainer} reveal-on-scroll`}>
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
                        </div> 
                    )}                    
        
                    <div className={`${style.TitleContainer} reveal-on-scroll`}>
                        <h2>{userData.Lev3Desc}</h2>
                    </div>
                    
                    <div className={`${style.ServicesListContainer} reveal-on-scroll`}>
                        <ul>
                            { userData.Serv?.map((service, index)=>(
                                (service.ServSiteId === 1 && service.ServDescrip) && (
                                    <li key={service.ServNum} style={{animationDelay: `${index * 0.1}s`}}>
                                        {service.ServDescrip}
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>

                    {userData.Tipo === 'EMP' && (
                        <Fragment>
                            <hr/>

                            <div className={`${style.WorkersSection} reveal-on-scroll`}>
                                <h3>Colaboradores</h3>
                                <Workers uuid={userData.UUID} tema={tema}/>
                            </div>
                        </Fragment>
                    )}

                    <hr/>

                    <div className={style.ServicesGrid}>
                        { userData.Serv?.map((service, index)=>(
                            (service.ServSiteId === 2 || service.ServSiteId === 3) && (service.ServSubTitulo || service.ServImg) && (
                                <div key={service.ServNum} className={`${style.ServiceContainer} reveal-on-scroll`} style={{animationDelay: `${index * 0.2}s`}}>
                                    {service.ServSubTitulo && (
                                        <div className={style.ServiceTitleContainer}>
                                            <h3>{service.ServSubTitulo}</h3>
                                        </div>
                                    )}
                                    
                                    <div className={style.ServiceMediaContainer}>
                                        { (service.ServImg && service.ServSiteId === 2) && (
                                            <div className={style.ServiceImageWrapper}>
                                                <Image 
                                                    src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/ServiciosImg/${service.ServImg}?timestamp=${Date.now()}`}
                                                    alt='Imagen de servicio'
                                                    width={800}
                                                    height={800}
                                                    priority={false}
                                                    unoptimized
                                                    className={style.ServiceImage}
                                                />
                                                <div className={style.ImageOverlay}></div>
                                            </div>
                                        ) }
                                        
                                        { (service.ServImg && service.ServSiteId === 3) && (
                                            <div className={style.ServiceVideoWrapper}>
                                                <video 
                                                    width="1000" 
                                                    height="720" 
                                                    autoPlay 
                                                    controls 
                                                    preload="auto" 
                                                    className={style.ServiceVideo}
                                                >
                                                    <source src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/ServiciosImg/${service.ServImg}`} type="video/mp4" />
                                                    Tu navegador no soporta etiquetas de video.
                                                </video>
                                            </div>
                                        ) }
                                    </div>
                                    
                                    {service.ServDescrip && (
                                        <div className={style.ServiceDescriptionContainer}>
                                            <p>{service.ServDescrip}</p>
                                        </div>
                                    )}
                                    <hr/>
                                </div>
                            )
                        ))}
                    </div>
                </Fragment>
            )}
        </div>
    );
}

export default ServicesSite;