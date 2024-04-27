'use client';

import { UserDataResponse } from '@/interfaces/userData-interface';
import { BsCardImage, BsPlusLg } from 'react-icons/bs';
import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import style from './services.module.scss';
import Link from 'next/link';

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

const EditServices = ({ userData } : Props) => {

    // *Primeros 4 (8) servicios
    const [firstServices, setFirstServices] = useState({
        service1: userData.Serv ? userData.Serv[0].ServDescrip : '',
        service2: userData.Serv ? userData.Serv[1].ServDescrip : '',
        service3: userData.Serv ? userData.Serv[2].ServDescrip : '',
        service4: userData.Serv ? userData.Serv[3].ServDescrip : '',
        service5: userData.Serv ? userData.Serv[14].ServDescrip : '',
        service6: userData.Serv ? userData.Serv[15].ServDescrip : '',
        service7: userData.Serv ? userData.Serv[16].ServDescrip : '',
        service8: userData.Serv ? userData.Serv[17].ServDescrip : '',
    });

    const FirstInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFirstServices({...firstServices, [name]: value});
    }

    // *Bloques de 4 (8) servicios
    const [secondServices, setSecondServices] = useState({
        service9: { 
            ServDescrip: userData.Serv ? userData.Serv[4].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[4].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[4].ServImg : ''
        },
        service10: { 
            ServDescrip: userData.Serv ? userData.Serv[5].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[5].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[5].ServImg : ''
        },
        service11: { 
            ServDescrip: userData.Serv ? userData.Serv[6].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[6].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[6].ServImg : ''
        },
        service12: { 
            ServDescrip: userData.Serv ? userData.Serv[7].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[7].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[7].ServImg : ''
        },
        service13: { 
            ServDescrip: userData.Serv ? userData.Serv[8].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[8].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[8].ServImg : ''
        },
        service14: { 
            ServDescrip: userData.Serv ? userData.Serv[9].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[9].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[9].ServImg : ''
        },
        service15: { 
            ServDescrip: userData.Serv ? userData.Serv[10].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[10].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[10].ServImg : ''
        },
        service16: { 
            ServDescrip: userData.Serv ? userData.Serv[11].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[11].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[11].ServImg : ''
        },
        service17: { 
            ServDescrip: userData.Serv ? userData.Serv[12].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[12].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[12].ServImg : ''
        },
        service18: { 
            ServDescrip: userData.Serv ? userData.Serv[13].ServDescrip : '', 
            ServSubTitulo: userData.Serv ? userData.Serv[13].ServSubTitulo : '', 
            ServImg: userData.Serv ? userData.Serv[13].ServImg : ''
        },
    });

    const SecondInputChange = (e : React.ChangeEvent<HTMLInputElement>, serviceName: string) => {
        const {name, value} = e.target;

        console.log(serviceName, name);

        setSecondServices({...secondServices, [serviceName]: { [name]: value}});
    }

    // *Abrir servicios de bloque
    const [openServices, setOpenServices] = useState({
        service9: false,
        service10: false,
        service11: false,
        service12: false,
        service13: false,
        service14: false,
        service15: false,
        service16: false,
        service17: false,
        service18: false
    })

    const OpenService = (serviceName: keyof ServiceState) => {

    // TODO: FALTA TERMINAR

        setOpenServices(prev => ({
            ...prev, 
            [serviceName]: !prev[serviceName]
        }));
    }

    console.log(secondServices);

    return ( 
        <div className={style.Services}>
            <p>
                En tu Tarjet Site, se mostrarán los campos con la información que llenes, mientras que los campos vacíos permanecerán ocultos.
            </p>
            <h3>Listado de actividades</h3>
            <p>
                Sugerimos uses enunciados en forma de lista que describan tus actividades o principales servicios.
            </p>

            <div className={style.UploadImage}>
                <BsCardImage />
            </div>

            <button className={`btn ${style.UploadButton}`}>
                Subir imagen
            </button>

            <div className={style.FormServices}>
                <h4>Servicios</h4>
                <form>
                    <input type="text" placeholder='• Listado de servicio' name='service1' value={firstServices.service1} onChange={FirstInputChange}/>
                    <input type="text" placeholder='• Listado de servicio' name='service2' value={firstServices.service2} onChange={FirstInputChange}/>
                    <input type="text" placeholder='• Listado de servicio' name='service3' value={firstServices.service3} onChange={FirstInputChange}/>
                    <input type="text" placeholder='• Listado de servicio' name='service4' value={firstServices.service4} onChange={FirstInputChange}/>

                    { userData.Premium && (
                        <Fragment>
                            <input type="text" placeholder='• Listado de servicio' name='service5' value={firstServices.service5} onChange={FirstInputChange}/>
                            <input type="text" placeholder='• Listado de servicio' name='service6' value={firstServices.service6} onChange={FirstInputChange}/>
                            <input type="text" placeholder='• Listado de servicio' name='service7' value={firstServices.service7} onChange={FirstInputChange}/>
                            <input type="text" placeholder='• Listado de servicio' name='service8' value={firstServices.service8} onChange={FirstInputChange}/>
                        </Fragment>
                    )}

                    <h4>Muestra de productos ó servicios</h4>

                    <button type='button' onClick={()=>OpenService('service9')}> 
                        Bloque de servicio No. 1
                        <span><BsPlusLg /></span>
                    </button>

                    <AnimatePresence>
                        { openServices.service9 && (
                            <motion.div className={style.ServiceContainer} {...animate}>
                                <input 
                                    type="text" 
                                    placeholder='Título de imagen' 
                                    name='ServSubTitulo' 
                                    value={secondServices.service9.ServSubTitulo} 
                                    onChange={(e)=>SecondInputChange(e, 'service9')}
                                />
                                <div className={style.UploadImage}><BsCardImage/></div>
                                <button type='button' className={`btn ${style.UploadButton}`}>
                                    Subir imagen
                                </button>
                                <textarea 
                                    placeholder='Descripción de la foto (hasta 300 caracteres)' 
                                    maxLength={300}
                                    name='ServDescrip'
                                    value={secondServices.service9.ServDescrip}
                                    // onChange={(e)=>SecondInputChange(e, 'service9')}
                                    
                                ></textarea>
                                <button  type='button' className={style.ClearButton}>Borrar contenido del bloque</button>
                            </motion.div>
                        ) }
                    </AnimatePresence>

                    <button type='button' onClick={()=>OpenService('service10')}>
                        Bloque de servicio No. 2
                        <span><BsPlusLg /></span>
                    </button>

                    <AnimatePresence>
                        { openServices.service10 && (
                            <motion.div className={style.ServiceContainer} {...animate}>
                                <input type="text" placeholder='Título de imagen'/>
                                <div className={style.UploadImage}><BsCardImage/></div>
                                <button type='button' className={`btn ${style.UploadButton}`}>
                                    Subir imagen
                                </button>
                                <textarea placeholder='Descripción de la foto (hasta 300 caracteres)' maxLength={300}></textarea>
                                <button  type='button' className={style.ClearButton}>Borrar contenido del bloque</button>
                            </motion.div>
                        ) }
                    </AnimatePresence>

                    <button type='button' onClick={()=>OpenService('service11')}>
                        Bloque de servicio No. 3
                        <span><BsPlusLg /></span>
                    </button>

                    <AnimatePresence>
                        { openServices.service11 && (
                            <motion.div className={style.ServiceContainer} {...animate}>
                                <input type="text" placeholder='Título de imagen'/>
                                <div className={style.UploadImage}><BsCardImage/></div>
                                <button type='button' className={`btn ${style.UploadButton}`}>
                                    Subir imagen
                                </button>
                                <textarea placeholder='Descripción de la foto (hasta 300 caracteres)' maxLength={300}></textarea>
                                <button  type='button' className={style.ClearButton}>Borrar contenido del bloque</button>
                            </motion.div>
                        ) }
                    </AnimatePresence>

                    <button type='button' onClick={()=>OpenService('service12')}>
                        Bloque de servicio No. 4
                        <span><BsPlusLg /></span>
                    </button>

                    <AnimatePresence>
                        { openServices.service12 && (
                            <motion.div className={style.ServiceContainer} {...animate}>
                                <input type="text" placeholder='Título de imagen'/>
                                <div className={style.UploadImage}><BsCardImage/></div>
                                <button type='button' className={`btn ${style.UploadButton}`}>
                                    Subir imagen
                                </button>
                                <textarea placeholder='Descripción de la foto (hasta 300 caracteres)' maxLength={300}></textarea>
                                <button  type='button' className={style.ClearButton}>Borrar contenido del bloque</button>
                            </motion.div>
                        ) }
                    </AnimatePresence>

                    { !userData.Premium && (
                        <Fragment>
                            <p>Al adquirir el plan premium, puedes agregar hasta 10 servicios</p>

                            <Link href={'/contacto'}>
                                ¡Adquiérelo aquí!
                            </Link>
                        </Fragment>
                    )}

                    <button type='button' onClick={()=>OpenService('service13')} disabled={userData.Premium ? false : true}>
                        Bloque de servicio No. 5
                        <span><BsPlusLg /></span>
                    </button>

                    <button type='button' onClick={()=>OpenService('service14')} disabled={userData.Premium ? false : true}>
                        Bloque de servicio No. 6
                        <span><BsPlusLg /></span>
                    </button>

                    <button type='button' onClick={()=>OpenService('service15')} disabled={userData.Premium ? false : true}>
                        Bloque de servicio No. 7
                        <span><BsPlusLg /></span>
                    </button>

                    <button type='button' onClick={()=>OpenService('service16')} disabled={userData.Premium ? false : true}>
                        Bloque de servicio No. 8
                        <span><BsPlusLg /></span>
                    </button>

                    <button type='button' onClick={()=>OpenService('service17')} disabled={userData.Premium ? false : true}>
                        Bloque de servicio No. 9
                        <span><BsPlusLg /></span>
                    </button>

                    <button type='button' onClick={()=>OpenService('service18')} disabled={userData.Premium ? false : true}>
                        Bloque de servicio No. 10
                        <span><BsPlusLg /></span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditServices;