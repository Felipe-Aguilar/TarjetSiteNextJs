import { Fragment, useEffect, useState } from "react";
import { UserDataResponse } from '../../interfaces/userData-interface';
import { BsCaretDownFill, BsTelephoneFill, BsWhatsapp } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { ListColoniesInterface } from "@/interfaces/design-tarjet/listColonies-interface";

import Image from "next/image";
import MapGoogle from "./MapGoogle";
import style from './contact.module.scss';

interface Props {
    userData: UserDataResponse;
}

const animate = {
    initial: {opacity: 0, height: 0},
    animate: {opacity: 1, height: 'auto'},
    exit: {opacity: 0, height: 0},
}

const ContactData = ( {userData}:Props ) => {

    const [open, setOpen] = useState<boolean>(false);

    const [whatsApp, setWhatsApp] = useState(userData.Telefono2);
    const [phone, setPhone] = useState(userData.Telefono2);
    const [showUbication, setShowUbication] = useState(userData.VerUbicacion == 0 ? false : true);
    const [email, setEmail] = useState(userData.Mail);
    const [website, setWebsite] = useState(userData.Web);
    const [avenue, setAvenue] = useState(userData.Calle);
    const [number, setNumber] = useState(userData.NumExt);
    const [postalCode, setPostalCode] = useState(userData.CodP);
    const [state, setState] = useState(userData.Estado);
    const [mun, setMun] = useState(userData.Municip);
    const [colony, setColony] = useState(userData.Colonia);
    const [range, setRange] = useState(userData.RangoLocal);
    const [publicTarjet, setPublicTarjet] = useState(userData.PublicPriva == 0 ? true : false);
    const [qualification, setQualification] = useState(userData.PermitirCalif == 0 ? true : false);
    const [comments, setComments] = useState(userData.PermitirComments == 0 ? true : false);


    // *Mostrar Mapa
    const [showMap, setShowMap] = useState<boolean>(userData.CodP ? true : false);

    const onChangeShowMap = () => {
        if (postalCode) {
            setShowMap(!showMap);
        }
    }

    // *Asignación de Municipio y Estado
    const [listColonies, setListColonies] = useState<ListColoniesInterface>();

    useEffect(()=>{
        const onChangePostalCode = async (postalCode:string) => {
    
            const code = postalCode.replace(/\D/g, '');
            setPostalCode(code);
    
            if (postalCode.length == 5) {
    
                const response = await fetch(`https://souvenir-site.com/WebTarjet/ApiCatalogos/ListaColonias?CPID=${postalCode}`, {
                    method: 'GET',
                    mode: 'cors'
                });
    
                const data = await response.json();
    
                setListColonies(data);
                setState(data.ListColonias[0].CPEstado);
                setMun(data.ListColonias[0].CPMunicipio);
            }
        }

        onChangePostalCode(postalCode);

    }, [postalCode]);


    return ( 
        <Fragment>
            <button className="title" type="button" onClick={()=>setOpen(!open)}>
                Datos de contacto

                <motion.div animate={open ? {rotate: 180} : {rotate: 0}}>
                    <BsCaretDownFill />
                </motion.div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div {...animate} className="contact">
                        <div className="input-contact">
                            <div>
                                <BsWhatsapp />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Teléfono WhatsApp"
                                maxLength={10}
                                value={whatsApp}
                                onChange={(e)=>setWhatsApp(e.target.value.trim())}
                            />
                        </div>

                        <div className="input-contact">
                            <div>
                                <BsTelephoneFill />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Teléfono fijo ó de contacto"
                                maxLength={10}
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value.trim())}
                            />
                        </div>

                        <div className="input-checkbox">
                            <input 
                                type="checkbox" 
                                id="ubication"
                                checked={showUbication}
                                onChange={()=>setShowUbication(!showUbication)}
                            />

                            <label htmlFor="ubication">Mostrar mi ubicación registrada en mi perfil</label>
                        </div>

                        <div className="input-contact">
                            <div>
                                <Image 
                                    src={'/images/icono-ubicacion.svg'}
                                    alt="Icono ubicación"
                                    width={200}
                                    height={200}
                                    priority={false}
                                />
                            </div>

                            <select>
                                <option value="1" key="2">Visita mi oficina ubicada en:</option>
                            </select>
                        </div>

                        <div className="input-contact">
                            <div>
                                <Image 
                                    src={'/images/icono-correo.svg'}
                                    alt="Icono correo"
                                    width={200}
                                    height={200}
                                    priority={false}
                                />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value.trim())}
                            />
                        </div>

                        <div className="input-contact">
                            <div>
                                <Image 
                                    src={'/images/icono-sitio-web.svg'}
                                    alt="Icono sitio web"
                                    width={200}
                                    height={200}
                                    priority={false}
                                />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Sitio Web"
                                value={website}
                                onChange={(e)=>setWebsite(e.target.value.trim())}
                            />
                        </div>

                        <h4>Ubicación</h4>

                        <input 
                            type="text" 
                            placeholder="Calle, privada, avenida"
                            value={avenue}
                            onChange={(e)=>setAvenue(e.target.value)}
                        />

                        <div className="two">
                            <input 
                                type="text" 
                                maxLength={6} 
                                placeholder="Número"
                                value={number}
                                onChange={(e)=>setNumber(e.target.value.trim())}
                            />

                            <input 
                                type="text" 
                                maxLength={5} 
                                placeholder="Código postal"
                                value={postalCode}
                                onChange={(e)=>setPostalCode(e.target.value.trim())}
                            />
                        </div>

                        <input 
                            type="text" 
                            placeholder="Estado" 
                            readOnly
                            value={state}
                        />

                        <input 
                            type="text" 
                            placeholder="Municipio"
                            readOnly
                            value={mun}
                            onChange={(e)=>setMun(e.target.value)}
                        />

                        <select 
                            style={{borderRadius: '8px'}}
                            value={colony}
                            onChange={(e)=>setColony(e.target.value)}
                        >
                            <option value="colonia" key="colonia">Colonia*</option>

                            { listColonies?.ListColonias.map((colony)=>(
                                <option value={colony.CPColonia} key={colony.CPColonia}>{colony.CPColonia}</option>
                            ))}
                        </select>

                        <div className="input-checkbox">
                            <input 
                                type="checkbox" 
                                id="showMap"
                                checked={showMap}
                                onChange={onChangeShowMap}
                            />

                            <label htmlFor="showMap">Ver en el mapa</label>
                        </div>

                        { showMap && (
                            <MapGoogle address={`${avenue} ${number}, ${postalCode}, ${mun}`}/>
                        )}

                        <div className="input-selected">
                            <select disabled={!userData.Premium} value={range}>
                                <option value="3" key="3">3km</option>
                                <option value="10" key="10">10km</option>
                                <option value="20" key="20">20km</option>
                                <option value="10000" key="10000">Sin límite</option>
                            </select>

                            <label>Rango de visualización en el mapa</label>
                        </div>

                        <span>Tu tarjet podrá ser vista en el buscador por personas que se encuentren dentro del rango configurado</span>

                        <a href="https://shop.tarjet.mx/" className={style.Link}>
                            Necesitas ser encontrado en mayor rango, <span>inscríbete a Premium, tu tarjeta sin límites.</span>
                        </a>

                        <div className={style.Switch}>
                            <label className={style.switch}>
                                <input 
                                    type="checkbox"
                                    checked={publicTarjet}
                                    onChange={()=>setPublicTarjet(!publicTarjet)}
                                />
                                <span className={style.slider}></span>
                            </label>

                            <span className={style.Text}>Mostrar mi tarjet en el directorio</span>
                        </div>

                        <div className={style.Switch}>
                            <label className={style.switch}>
                                <input 
                                    type="checkbox"
                                    checked={qualification}
                                    onChange={()=>setQualification(!qualification)}
                                />
                                <span className={style.slider}></span>
                            </label>

                            <span className={style.Text}>Permitir calificación por usuarios</span>
                        </div>

                        <div className={style.Switch}>
                            <label className={style.switch}>
                                <input 
                                    type="checkbox"
                                    checked={comments}
                                    onChange={()=>setComments(!comments)}
                                />
                                <span className={style.slider}></span>
                            </label>

                            <span className={style.Text}>Permitir comentarios en directorio</span>
                        </div>

                        <div className={style.Switch}>
                            <label className={style.switch}>
                                <input 
                                    type="checkbox"/>
                                <span className={style.slider}></span>
                            </label>

                            <span className={style.Text}>Pertenece a Empresa</span>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </Fragment>
    );
}

export default ContactData;