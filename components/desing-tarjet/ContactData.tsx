import { Fragment, useEffect, useState } from "react";
import { UserDataResponse } from '../../interfaces/userData-interface';
import { BsCaretDownFill, BsTelephoneFill, BsWhatsapp } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { ListColoniesInterface } from "@/interfaces/design-tarjet/listColonies-interface";

import Image from "next/image";
import MapGoogle from "./MapGoogle";
import style from './contact.module.scss';
import EditData from "@/app/api/editData";
import Company from "./Company";
import { Map } from '@vis.gl/react-google-maps';

interface Props {
    userData: UserDataResponse;
}

const animate = {
    initial: {opacity: 0, height: 0},
    animate: {opacity: 1, height: 'auto'},
    exit: {opacity: 0, height: 0},
}

const ContactData = ( { userData }:Props ) => {
    const [open, setOpen] = useState<boolean>(false);
    const [company, setCompany] = useState<boolean>(userData.Tipo === 'COL' ? true : false);

    const [whatsApp, setWhatsApp] = useState(userData.Telefono1);
    const [phone, setPhone] = useState(userData.Telefono2);
    const [showUbication, setShowUbication] = useState(userData.VerUbicacion == 0 ? false : true);
    const [email, setEmail] = useState(userData.Mail);
    const [website, setWebsite] = useState(userData.Web);

    // Obtener la primera dirección del array o usar los campos individuales como fallback
    const firstAddress = userData.ListDirecciones?.find(d => d.DirId === "1") || {
        DirTextoUbica: userData.TexoUbica || '',
        DirCalle: userData.Calle,
        DirNumExt: userData.NumExt,
        DirCodP: userData.CodP,
        DirCol: userData.Colonia,
        DirMunicip: userData.Municip,
        DirEstado: userData.Estado,
        DirMapsGeoloc: userData.MapsGeoloc
    };

    const [avenue, setAvenue] = useState(firstAddress.DirCalle);
    const [number, setNumber] = useState(firstAddress.DirNumExt);
    const [postalCode, setPostalCode] = useState(firstAddress.DirCodP);
    const [state, setState] = useState(firstAddress.DirEstado);
    const [mun, setMun] = useState(firstAddress.DirMunicip);
    const [colony, setColony] = useState(firstAddress.DirCol);
    const [MapGeoloc, setMapGeoloc] = useState(firstAddress.DirMapsGeoloc);

    const [range, setRange] = useState(userData.RangoLocal);
    const [publicTarjet, setPublicTarjet] = useState(userData.PublicPriva == 0 ? true : false);
    const [qualification, setQualification] = useState(userData.PermitirCalif == 0 ? true : false);
    const [comments, setComments] = useState(userData.PermitirComments == 0 ? true : false);
    
    //Mostrar Mapa
    const [showMap, setShowMap] = useState<boolean>(false);

    const onChangeShowMap = () => {
        if (postalCode) {
            setShowMap(!showMap);
        }
    }

    //Asignación de Municipio y Estado
    const [listColonies, setListColonies] = useState<ListColoniesInterface>();

    // Estados para la segunda ubicación (opcional)
    const [showSecondUbication, setShowSecondUbication] = useState(
        Boolean(userData.ListDirecciones?.find(d => d.DirId === "2")?.DirCalle)
    );
    const [avenue2, setAvenue2] = useState(
        userData.ListDirecciones?.find(d => d.DirId === "2")?.DirCalle || ''
    );
    const [number2, setNumber2] = useState(
        userData.ListDirecciones?.find(d => d.DirId === "2")?.DirNumExt || ''
    );
    const [postalCode2, setPostalCode2] = useState(
        userData.ListDirecciones?.find(d => d.DirId === "2")?.DirCodP || ''
    );
    const [state2, setState2] = useState(
        userData.ListDirecciones?.find(d => d.DirId === "2")?.DirEstado || ''
    );
    const [mun2, setMun2] = useState(
        userData.ListDirecciones?.find(d => d.DirId === "2")?.DirMunicip || ''
    );
    const [colony2, setColony2] = useState(
        userData.ListDirecciones?.find(d => d.DirId === "2")?.DirCol || ''
    );

    // En la sección de estados, junto con los demás estados de dirección
    const [locationText, setLocationText] = useState(firstAddress.DirTextoUbica || '');
    const [locationText2, setLocationText2] = useState(
        userData.ListDirecciones?.find(d => d.DirId === "2")?.DirTextoUbica || ''
    );
    
    const [showMap2, setShowMap2] = useState<boolean>(userData.CodP ? false : false);
    const [listColonies2, setListColonies2] = useState<ListColoniesInterface>();

    const onSubmitData = async () => {
        // Crear array de direcciones
        const direcciones = [{
            "DirId": "1",
            "DirTextoUbica": locationText, 
            "DirCalle": avenue,
            "DirNumExt": number,
            "DirCodP": postalCode,
            "DirCol": colony,
            "DirMunicip": mun,
            "DirEstado": state,
            "DirMapsGeoloc": MapGeoloc || "",
        }];

        // Agregar segunda dirección si existe
        if (showSecondUbication) {
            direcciones.push({
                "DirId": "2",
                "DirTextoUbica": locationText2,
                "DirCalle": avenue2,
                "DirNumExt": number2,
                "DirCodP": postalCode2,
                "DirCol": colony2,
                "DirMunicip": mun2,
                "DirEstado": state2,
                "DirMapsGeoloc": ""
            });
        }

        const contactForm = {
            "Telefono1": whatsApp,
            "Telefono2": phone,
            "VerUbicacion": showUbication ? 1 : 0,
            "Mail": email,
            "Web": website,
            // Mantener campos individuales para compatibilidad
            
            "DirCalle": avenue,
            "DirNumExt": number,
            "DirCodP": postalCode,
            "DirCol": colony,
            "DirMunicip": mun,
            "DirEstado": state,
            // Agregar los campos requeridos por el tipo
            "Calle": avenue,
            "NumExt": number,
            "CodP": postalCode,
            "Colonia": colony,
            "Municip": mun,
            "Estado": state,
            "PublicPriva": publicTarjet ? 0 : 1,
            "PermitirCalif": qualification ? 0 : 1,
            "PermitirComments": comments ? 0 : 1,
            "RangoLocal": range,
            "MapsGeoloc": MapGeoloc || "",
            // Enviar el array de direcciones
            "ListDirecciones": direcciones
        };

        await EditData({userData, contactForm});
    }

    useEffect(() => {
    console.log('MapsGeoloc from userData:', userData.ListDirecciones?.find(d => d.DirId === "1")?.DirMapsGeoloc);
}, [userData]);

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

    useEffect(()=>{
        const onChangePostalCode2 = async (postalCode2:string) => {
            const code = postalCode2.replace(/\D/g, '');
            setPostalCode2(code);

            if (postalCode2.length == 5) {
                const response = await fetch(`https://souvenir-site.com/WebTarjet/ApiCatalogos/ListaColonias?CPID=${postalCode2}`, {
                    method: 'GET',
                    mode: 'cors'
                });

                const data = await response.json();
                setListColonies2(data);
                setState2(data.ListColonias[0].CPEstado);
                setMun2(data.ListColonias[0].CPMunicipio);
            }
        }

        if (postalCode2) {
            onChangePostalCode2(postalCode2);
        }
    }, [postalCode2]);


    return ( 
        <Fragment>
            <button className={style.title} type="button" onClick={()=>setOpen(!open)}>
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
                                onBlur={onSubmitData}
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
                                onBlur={onSubmitData}
                            />
                        </div>

                        <div className="input-checkbox">
                            <input 
                                type="checkbox" 
                                id="ubication"
                                checked={showUbication}
                                onChange={()=>setShowUbication(!showUbication)}
                                onBlur={onSubmitData}
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
                                onBlur={onSubmitData}
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
                                onBlur={onSubmitData}
                            />
                        </div>

                        <h4>Ubicación</h4>

                        <input 
                            type="text" 
                            placeholder="Calle, privada, avenida"
                            value={avenue}
                            onChange={(e)=>setAvenue(e.target.value)}
                            onBlur={onSubmitData}
                        />

                        <div className={style.two}>
                            <input 
                                type="text" 
                                maxLength={6} 
                                placeholder="Número"
                                value={number}
                                onChange={(e)=>setNumber(e.target.value.trim())}
                                onBlur={onSubmitData}
                            />

                            <input 
                                type="text" 
                                maxLength={5} 
                                placeholder="Código postal"
                                value={postalCode}
                                onChange={(e)=>setPostalCode(e.target.value.trim())}
                                onBlur={onSubmitData}
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
                            onBlur={onSubmitData}
                        >
                            <option value="colonia" key="colonia">Colonia*</option>

                            { listColonies?.ListColonias.map((colony)=>(
                                <option value={colony.CPColonia} key={colony.CPColonia}>{colony.CPColonia}</option>
                            ))}
                        </select>

                        <input 
                            type="text" 
                            placeholder="Texto a Mostrar (opcional)"
                            value={locationText}
                            onChange={(e)=>setLocationText(e.target.value)}
                            onBlur={onSubmitData}
                        />

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

                        {/* Checkbox para mostrar segunda ubicación */}
                        <div className="input-checkbox">
                            <input 
                                type="checkbox" 
                                id="secondUbication"
                                checked={showSecondUbication}
                                onChange={()=>setShowSecondUbication(!showSecondUbication)}
                            />
                            <label htmlFor="secondUbication">Agregar segunda ubicación (opcional)</label>
                        </div>

                        {/* Segunda ubicación (condicional) */}
                        {showSecondUbication && (
                            <Fragment>
                                <h4>Segunda Ubicación</h4>

                                <input 
                                    type="text" 
                                    placeholder="Calle, privada, avenida"
                                    value={avenue2}
                                    onChange={(e)=>setAvenue2(e.target.value)}
                                    onBlur={onSubmitData}
                                />

                                <div className={style.two}>
                                    <input 
                                        type="text" 
                                        maxLength={6} 
                                        placeholder="Número"
                                        value={number2}
                                        onChange={(e)=>setNumber2(e.target.value.trim())}
                                        onBlur={onSubmitData}
                                    />

                                    <input 
                                        type="text" 
                                        maxLength={5} 
                                        placeholder="Código postal"
                                        value={postalCode2}
                                        onChange={(e)=>setPostalCode2(e.target.value.trim())}
                                        onBlur={onSubmitData}
                                    />
                                </div>

                                <input 
                                    type="text" 
                                    placeholder="Estado" 
                                    readOnly
                                    value={state2}
                                />

                                <input 
                                    type="text" 
                                    placeholder="Municipio"
                                    readOnly
                                    value={mun2}
                                />

                                <select 
                                    style={{borderRadius: '8px'}}
                                    value={colony2}
                                    onChange={(e)=>setColony2(e.target.value)}
                                    onBlur={onSubmitData}
                                >
                                    <option value="colonia" key="colonia2">Colonia*</option>
                                    { listColonies2?.ListColonias.map((colony)=>(
                                        <option value={colony.CPColonia} key={`${colony.CPColonia}-2`}>{colony.CPColonia}</option>
                                    ))}
                                </select>

                                <input 
                                    type="text" 
                                    placeholder="Texto a Mostrar (opcional)" 
                                    value={locationText2}
                                    onChange={(e)=>setLocationText2(e.target.value)}
                                    onBlur={onSubmitData}
                                />

                                <div className="input-checkbox">
                                    <input 
                                        type="checkbox" 
                                        id="showMap2"
                                        checked={showMap2}
                                        onChange={() => setShowMap2(!showMap2)}
                                    />
                                    <label htmlFor="showMap2">Ver segunda ubicación en el mapa</label>
                                </div>

                                { showMap2 && postalCode2 && (
                                    <MapGoogle address={`${avenue2} ${number2}, ${postalCode2}, ${mun2}`}/>
                                )}
                            </Fragment>
                        )}

                        <div className={style.inputSelected}>
                            <select disabled={!userData.Premium} value={range} onChange={(e)=>setRange(e.target.value)} onBlur={onSubmitData}>
                                <option value="3" key="3">3km</option>
                                <option value="10" key="10">10km</option>
                                <option value="20" key="20">20km</option>
                                <option value="10000" key="10000">Sin límite</option>
                            </select>

                            <label>Rango de visualización en el mapa</label>
                        </div>

                        <span>Tu tarjet podrá ser vista en el buscador por personas que se encuentren dentro del rango configurado</span>

                        <a href="https://tarjetshop.com/" className={style.Link}>
                            Necesitas ser encontrado en mayor rango, <span>inscríbete a Premium, tu tarjeta sin límites.</span>
                        </a>

                        <div className={style.Switch}>
                            <label className={style.switch}>
                                <input 
                                    type="checkbox"
                                    checked={publicTarjet}
                                    onChange={()=>setPublicTarjet(!publicTarjet)}
                                    onBlur={onSubmitData}
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
                                    onBlur={onSubmitData}
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
                                    onBlur={onSubmitData}
                                />
                                <span className={style.slider}></span>
                            </label>

                            <span className={style.Text}>Permitir comentarios en directorio</span>
                        </div>

                        <div className={style.Switch}>
                            <label className={style.switch}>
                                <input 
                                    type="checkbox" 
                                    onChange={()=>setCompany(!company)} 
                                    checked={company}
                                    disabled={company}
                                />
                                <span className={style.slider}></span>
                            </label>

                            <span className={style.Text}>Pertenece a Empresa</span>
                        </div>

                        {company && <Company uuid={userData.UUID} tken={userData.TokenId} businessName={userData.NomNegocio}/>}

                    </motion.div>
                )}
            </AnimatePresence>

        </Fragment>
    );
}

export default ContactData;