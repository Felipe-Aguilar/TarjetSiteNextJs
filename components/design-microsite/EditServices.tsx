'use client';

import { Serv, UserDataResponse } from '@/interfaces/userData-interface';
import { BsCardImage, BsPlusLg } from 'react-icons/bs';
import { Fragment, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import style from './services.module.scss';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import EditData from '@/app/api/editData';
import UploadImage from '../pop-ups/upload-image/UploadImage';
import Image from 'next/image';

interface Props {
    userData: UserDataResponse;
}

const animate = {
    initial: {height: 0, opacity: 0},
    animate: {opacity: 1, height: 'auto'},
    exit: {height: 0, opacity: 0},
}

type ServiceState = {
    service9: boolean;
    service10: boolean;
    service11: boolean;
    service12: boolean;
    service13: boolean;
    service14: boolean;
    service15: boolean;
    service16: boolean;
    service17: boolean;
    service18: boolean;
};

interface SecondSerivce {
    ServNum: string;
    ServDescrip: string;
    ServSubTitulo: string;
    ServImg: string;
    ServIcono: string;
    ServSiteId: number;
}

const EditServices = ({ userData } : Props) => {
    // Estado para los servicios
    const [services, setServices] = useState<Serv[]>(userData.Serv || []);
    
    // *Primeros 4 (8) servicios
    const [firstServices, setFirstServices] = useState({
        service1: '',
        service2: '',
        service3: '',
        service4: '',
        service5: '',
        service6: '',
        service7: '',
        service8: '',
    });

    // *Bloques de 4 (8) servicios
    const [secondServices, setSecondServices] = useState<Record<string, SecondSerivce>>({});

    // Cargar los servicios cuando el componente se monta o cambian los datos del usuario
    useEffect(() => {
        if (userData.Serv && userData.Serv.length > 0) {
            // Actualizar firstServices
            setFirstServices({
                service1: userData.Serv[0]?.ServDescrip || '',
                service2: userData.Serv[1]?.ServDescrip || '',
                service3: userData.Serv[2]?.ServDescrip || '',
                service4: userData.Serv[3]?.ServDescrip || '',
                service5: userData.Serv[14]?.ServDescrip || '',
                service6: userData.Serv[15]?.ServDescrip || '',
                service7: userData.Serv[16]?.ServDescrip || '',
                service8: userData.Serv[17]?.ServDescrip || '',
            });

            // Actualizar secondServices
            const initialSecondServices = userData.Serv.slice(4, 14);
            const initialSecond: Record<string, SecondSerivce> = {};
            
            initialSecondServices.forEach((service, index) => {
                initialSecond[`service${index+9}`] = {
                    ServNum: service.ServNum,
                    ServDescrip: service.ServDescrip || '',
                    ServSubTitulo: service.ServSubTitulo || '',
                    ServImg: service.ServImg || '',
                    ServIcono: service.ServIcono || '',
                    ServSiteId: service.ServSiteId || 0
                };
            });

            setSecondServices(initialSecond);
        }
    }, [userData.Serv]);

    // *Abrir servicios de bloque
    const initialOpenServices: ServiceState = {
        service9: false,
        service10: false,
        service11: false,
        service12: false,
        service13: false,
        service14: false,
        service15: false,
        service16: false,
        service17: false,
        service18: false,
    } 

    const [openServices, setOpenServices] = useState(initialOpenServices);

    const FirstInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFirstServices({...firstServices, [name]: value});
    }

    const SecondInputChange = (key: string, value: string) => {
        setSecondServices(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                ServSubTitulo: value
            }
        }))
    }

    const SecondTextAreaChange = (key: string, value:string) => {
        setSecondServices(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                ServDescrip: value
            }
        }))
    }

    const OpenService = (serviceName: keyof ServiceState) => {
        setOpenServices(prev => ({
            ...prev, 
            [serviceName]: !prev[serviceName]
        }));
    }

    // *Subir Datos al formulario y guardar
    const SubmitData = async () => {
        const servicesForm = {
            "FirstServices": firstServices,
            "SecondServices": secondServices
        }

        await EditData({userData, servicesForm});
    }

    // *Subir imagen
    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const [imageType, setImageType] = useState<string>('');
    const [serviceNumber, setServiceNumber] = useState<string>('');

    const onUploadImage = async (type:string, serviceNumber?:string) => {
        setImageType(type);

        if (serviceNumber) {
            setServiceNumber(serviceNumber);
        }

        setOpenUpload(true);
    }

    // *Borrar contenido del bloque
    const clearInfo = (key: string) => {
        setSecondServices(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                ServSubTitulo: '',
                ServDescrip: '',
                ServImg: ''
            }
        }))
    }

    return ( 
        <div className={style.Services}>
            <p>
                En tu Tarjet Site, se mostrarán los campos con la información que llenes, mientras que los campos vacíos permanecerán ocultos.
            </p>

            <h3>Encabezado para tu micrositio (premium)</h3>

            { userData.ImgHeader
                ? ( 
                    <Image 
                        src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/usuHeaders/${userData.ImgHeader}?timestamp=${Date.now()}`}
                        alt='Encabezado de perfil'
                        width={500}
                        height={500}
                        unoptimized
                        className={style.ImageHeader}
                        style={{width: '100%', height: 'auto'}}
                    />
                )
                : (
                    <div className={style.UploadImage}>
                        <BsCardImage />
                    </div>
                )
            }

            <button className={`btn ${style.UploadButton}`} onClick={()=>onUploadImage('SITE')} disabled={userData.Premium ? false : true}>
                Subir imagen
            </button>

            { openUpload && (
                <UploadImage token={userData.TokenId} imageType={imageType} close={()=>setOpenUpload(false)} serviceNumber={serviceNumber}/>
            )}

            <h3>Listado de servicios</h3>
            <p>
                Te sugerimos uses enunciados en forma de lista que describan tus actividades o principales servicios.
            </p>

            <div className={style.FormServices}>
                <h4>Servicios</h4>
                <form>
                    <input type="text" placeholder='• Listado de servicio' name='service1' value={firstServices.service1} onChange={FirstInputChange} onBlur={SubmitData}/>
                    <input type="text" placeholder='• Listado de servicio' name='service2' value={firstServices.service2} onChange={FirstInputChange} onBlur={SubmitData}/>
                    <input type="text" placeholder='• Listado de servicio' name='service3' value={firstServices.service3} onChange={FirstInputChange} onBlur={SubmitData}/>
                    <input type="text" placeholder='• Listado de servicio' name='service4' value={firstServices.service4} onChange={FirstInputChange} onBlur={SubmitData}/>

                    { userData.Premium && (
                        <Fragment>
                            <input type="text" placeholder='• Listado de servicio' name='service5' value={firstServices.service5} onChange={FirstInputChange} onBlur={SubmitData}/>
                            <input type="text" placeholder='• Listado de servicio' name='service6' value={firstServices.service6} onChange={FirstInputChange} onBlur={SubmitData}/>
                            <input type="text" placeholder='• Listado de servicio' name='service7' value={firstServices.service7} onChange={FirstInputChange} onBlur={SubmitData}/>
                            <input type="text" placeholder='• Listado de servicio' name='service8' value={firstServices.service8} onChange={FirstInputChange} onBlur={SubmitData}/>
                        </Fragment>
                    )}

                    <h4>Muestra de productos ó servicios</h4>

                    { Object.entries(secondServices).map(([key, service], index)=>(
                        <Fragment key={key}>
                            <button 
                                type='button' 
                                onClick={()=>OpenService(key as keyof ServiceState)}
                                disabled={(index >= 4 && !userData.Premium) ? true : false}
                            >
                                Bloque de servicio No. {index+1}
                                <span><BsPlusLg /></span>
                            </button>

                            <AnimatePresence>
                                { openServices[key as keyof ServiceState] && (
                                    <motion.div className={style.ServiceContainer} {...animate}>
                                        <input 
                                            type="text" 
                                            placeholder='Título de imagen'
                                            value={service.ServSubTitulo}
                                            onChange={(e)=>SecondInputChange(key, e.target.value)}
                                            onBlur={SubmitData}
                                        />
                                        { service.ServImg 
                                            ? (
                                                <Image 
                                                    src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/ServiciosImg/${service.ServImg}?timestamp=${Date.now()}`}
                                                    alt='Imagen de servicio personalizado'
                                                    width={500}
                                                    height={500}
                                                    className={style.ImageService}
                                                    priority={false}
                                                    unoptimized
                                                />
                                            )
                                            : (<div className={style.UploadImage}><BsCardImage/></div>)
                                        }
                                        <button type='button' className={`btn ${style.UploadButton}`} onClick={()=>onUploadImage('SERV', (index + 5).toString())}>
                                            Subir imagen
                                        </button>
                                        <div className={style.TextAreaContent}>
                                            <textarea 
                                                placeholder='Descripción de la foto (hasta 300 caracteres)' 
                                                maxLength={300}
                                                value={service.ServDescrip}
                                                onChange={(e)=>SecondTextAreaChange(key, DOMPurify.sanitize(e.target.value, {ALLOWED_TAGS: []}))}
                                                onBlur={SubmitData}
                                            ></textarea>
                                            <span>{service.ServDescrip.length} / 300</span>
                                        </div>
                                        <button  
                                            type='button' 
                                            className={style.ClearButton}
                                            onClick={()=>clearInfo(key)}
                                        >Borrar contenido del bloque</button>
                                    </motion.div>
                                ) }
                            </AnimatePresence>

                            { (!userData.Premium && index === 3) && (
                                <Fragment>
                                    <p>Al adquirir el plan premium, puedes agregar hasta 10 servicios</p>
        
                                    <Link href={'/contacto'}>
                                        ¡Adquiérelo aquí!
                                    </Link>
                                </Fragment>
                            ) }

                        </Fragment>
                    ))}
                </form>
            </div>
        </div>
    );
}

export default EditServices;