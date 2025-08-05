import { UserDataResponse } from '@/interfaces/userData-interface';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-scroll';
import { useRouter } from 'next/navigation';

import defaultStyle from './site.module.scss';
import winterStyle from '../themes/winter.module.scss'
import darkStyle from '../themes/dark.module.scss';
import Image from 'next/image';
import FileSaver from 'file-saver';
import Social from '../pop-ups/social/Social';
import SaveSuccessfully from '../pop-ups/save-successfully/SaveSuccessfully';

interface Props {
    userData: UserDataResponse;
    tokenServer: string | null | undefined;
    uuidServer: string | null | undefined;
    tema: string;
}

const animate = {
    initial :{ opacity:0 , y: -20 },
    whileInView:{ y:0, opacity: 1 },
    viewport: { once:true }
}

const ButtonsSite = ({userData, tokenServer, uuidServer, tema} :Props) => {

    // *Guardar contacto
    const SaveContact = async () => {
        const nameUser = `${userData.Nom} ${userData.AppP} ${userData.AppM}`;

        const content = `BEGIN:VCARD
VERSION:3.0
N:${nameUser};;;
FN:${nameUser}
TITLE:${nameUser};
EMAIL;type=INTERNET;type=pref:${userData.Mail}
TEL;type=MAIN:${userData.Activid}
TEL;type=CELL;type=VOICE;type=pref:${userData.Telefono1}
ADR;type=WORK;type=pref:;;;${userData.Colonia};;;
END:VCARD`;

        const blob = new Blob([content], { type: "text/vcard;charset=utf-8" });
        FileSaver.saveAs(blob, `${nameUser}.vcf`, true);
    }

    // *Compartir perfil
    const [shareProfile, setShareProfile] = useState<boolean>(false);

    // *Guardar en tarjetero
    const [success, setSuccess] = useState<boolean>(false);
    const router = useRouter();

    const SaveUser = async() => {
        const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/GuardaTarjet', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "TarjetGIdUsuario": uuidServer,
                "TarjetGIdTarjet": userData.UUID
            })
        });

        const data = await response.json();

        if (data.Messages) {
            setTimeout(()=>{
                setSuccess(true);
                
                setTimeout(()=>{
                    router.replace(`/st/${btoa(userData.TokenId)}`);
                    setSuccess(false);
                },3500);
            }, 1000)
        }
    }

    // Get addresses
    const primaryAddress = userData.ListDirecciones?.find(d => d.DirId === "1");
    const secondaryAddress = userData.ListDirecciones?.find(d => d.DirId === "2" && d.DirCalle?.trim());

    // Helper function to get maps URL
    const getMapsUrl = (address: {
        DirMapsGeoloc?: string;
        DirCalle?: string;
        DirNumExt?: string;
        DirCol?: string;
    }) => {
        if (address.DirMapsGeoloc && address.DirMapsGeoloc.trim() !== '') {
            return `https://www.google.com/maps?q=${address.DirMapsGeoloc}`;
        }
        return `https://www.google.com/maps?q=${address.DirCalle || ''}${
            address.DirNumExt ? ' ' + address.DirNumExt : ''
        },${address.DirCol || ''}`;
    };

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
        <Fragment>
            <div className={style.Buttons}>
                <motion.button {...animate} {...animate} transition={{delay: 1}} onClick={()=>SaveContact()}>
                    Guardar en mis contactos
    
                    <span>
                        <Image 
                            src={'/images/icono-contacto.svg'}
                            alt='icono de contacto'
                            width={150}
                            height={150}
                        />
                    </span>
                </motion.button>
    
                { userData.Telefono1 && (
                    <motion.a 
                        href={`https://api.whatsapp.com/send?phone=+52${userData.Telefono1}&text=¡Hola!%20👋🏻%20te%20contacto%20desde%20tu%20Tarjet.%0A%0Ahttps://tarjet.site/%23/st/${btoa(userData.TokenId)}`} 
                        target='_blank' {...animate} 
                        transition={{delay: 1.2}} 
                        className={style.WhatsApp}
                    >
                        Envíame un WhatsApp
    
                        <span>
                            <BsWhatsapp />
                        </span>
                    </motion.a>
                ) }

                { userData.Telefono2 && (
                    <motion.a 
                        href={`https://api.whatsapp.com/send?phone=+52${userData.Telefono2}&text=¡Hola!%20👋🏻%20te%20contacto%20desde%20tu%20Tarjet.%0A%0Ahttps://tarjet.site/%23/st/${btoa(userData.TokenId)}`} 
                        target='_blank' {...animate} 
                        transition={{delay: 1.4}} 
                        className={style.WhatsApp2}
                    >
                        Envíame un WhatsApp
    
                        <span>
                            <BsWhatsapp />
                        </span>
                    </motion.a>
                ) }

                { userData.VerUbicacion === 1 && (
                    <>
                        {/* Primary location */}
                        {primaryAddress ? (
                            <motion.a 
                                href={getMapsUrl(primaryAddress)}
                                target='_blank' 
                                {...animate} 
                                transition={{delay: 1.4}} 
                                className={style.Ubication}
                            >
                                {userData.TexoUbica && `${userData.TexoUbica} `}
                                {primaryAddress.DirCol === '' ? '' : `${primaryAddress.DirCol} `}

                                <span>
                                    <Image 
                                        src={'/images/icono-ubicacion.svg'}
                                        alt='icono de ubicación'
                                        width={150}
                                        height={150}
                                    />
                                </span>
                            </motion.a>
                        ) : (
                            <motion.a 
                                href={userData.MapsGeoloc === '' ? 
                                    `https://www.google.com/maps?q=${userData.Calle}${userData.NumExt ? ' ' + userData.NumExt : ''},${userData.Colonia}` : 
                                    `https://www.google.com/maps?q=${userData.MapsGeoloc}`} 
                                target='_blank' 
                                {...animate} 
                                transition={{delay: 1.4}} 
                                className={style.Ubication}
                            >
                                {userData.TexoUbica && `${userData.TexoUbica} `}
                                {userData.Colonia === '' ? '' : `${userData.Colonia} `}

                                <span>
                                    <Image 
                                        src={'/images/icono-ubicacion.svg'}
                                        alt='icono de ubicación'
                                        width={150}
                                        height={150}
                                    />
                                </span>
                            </motion.a>
                        )}

                        {/* Secondary location */}
                        {secondaryAddress && (
                            <motion.a 
                                href={getMapsUrl(secondaryAddress)}
                                target='_blank' 
                                {...animate} 
                                transition={{delay: 1.5}} 
                                className={style.Ubication}
                                style={{marginTop: '10px'}}
                            >
                                {userData.TexoUbica && `${userData.TexoUbica} `}
                                {secondaryAddress.DirCol === '' ? '' : `${secondaryAddress.DirCol} `}

                                <span>
                                    <Image 
                                        src={'/images/icono-ubicacion.svg'}
                                        alt='icono de ubicación'
                                        width={150}
                                        height={150}
                                    />
                                </span>
                            </motion.a>
                        )}
                    </>
                )}
                
                {/* Rest of the component remains the same */}
                { userData.Mail && (
                    <motion.a href={`mailto: ${userData.Mail}`} {...animate} transition={{delay: 1.6}} className={style.Email}>
                        Envíame un correo

                        <span>
                            <Image 
                                src={'/images/icono-correo.svg'}
                                alt='icono de ubicación'
                                width={150}
                                height={150}
                            />
                        </span>
                    </motion.a>
                ) }

                { userData.Web && (
                    <motion.a href={`${userData.Web}`} target='_blank' {...animate} transition={{delay: 1.8}} className={style.Web}>
                        Visita mi página web

                        <span>
                            <Image 
                                src={'/images/icono-sitio-web.svg'}
                                alt='icono de ubicación'
                                width={150}
                                height={150}
                            />
                        </span>
                    </motion.a>
                ) }

                <motion.div {...animate} transition={{delay: 2}} style={{width: '95%'}}>
                    <Link
                        to="SocialSection"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className={style.Social}
                        style={{width: '100%', cursor: 'pointer'}}
                    >
                        Mis redes sociales
    
                        <span>
                            <Image 
                                src={'/images/icono-redes.svg'}
                                alt='icono de redes sociales'
                                width={150}
                                height={150}
                            />
                        </span>
                    </Link>
                </motion.div>

                { userData.Google &&(
                    <motion.div {...animate} transition={{delay: 2}} style={{width: '95%'}}>
                        <a
                            href={userData.Google}
                            target='_blank'
                            className={style.Google}
                            style={{width: '100%', cursor: 'pointer'}}
                        >
                            Opiniones de clientes, deja tu reseña.
        
                            <span>
                                <Image 
                                    src={'/images/boton-estrella.svg'}
                                    alt='icono de redes sociales'
                                    width={150}
                                    height={150}
                                />
                            </span>
                        </a>
                    </motion.div>
                )}

                <motion.button {...animate} transition={{delay: 2.2}} className={style.Share} onClick={()=>setShareProfile(true)}>
                    Comparte mi tarjeta
    
                    <span>
                        <Image 
                            src={'/images/icono-compartir.svg'}
                            alt='icono de redes sociales'
                            width={150}
                            height={150}
                        />
                    </span>
                </motion.button>

                {userData.BotonesAdicionales && userData.BotonesAdicionales.length > 0 && (
                    userData.BotonesAdicionales.map((boton, index) => (
                        <motion.a
                            key={index}
                            href={boton.ButtonUrl}
                            target='_blank'
                            {...animate}
                            transition={{ delay: 1.8 }}
                            className={style.Web}
                            style={{
                                backgroundColor: boton.ButtonColor1,
                                height: '50px',
                                display: 'flex',
                                alignItems: 'left',
                                padding: '0 0px',
                                borderRadius: '8px',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            <span style={{
                                flexGrow: 1,
                                marginLeft: '20px',
                                textAlign: 'left',
                                color: boton.ButtonColorTxt,
                                maxWidth: '100%',
                                background: 'transparent',
                                justifyContent: 'left'
                            }}>
                                {boton.ButtonTexto}
                            </span>

                            <div
                                style={{
                                    width: '55px',
                                    height: '100%',
                                    backgroundColor: boton.ButtonColor2,
                                    borderRadius: '0px 10px 10px 0px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = boton.ButtonColor1}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = boton.ButtonColor2}
                            >
                                <Image 
                                    src={boton.ButtonIcono}
                                    alt={`Icono de ${boton.ButtonNom}`}
                                    width={36}
                                    height={36}
                                />
                            </div>
                        </motion.a>
                    ))
                )}

                { tokenServer && (
                    <motion.button 
                        {...animate} 
                        transition={{delay: 2.4}} 
                        className={style.Save} 
                        disabled={tokenServer === userData.TokenId ? true : false}
                        onClick={()=>SaveUser()}
                    >
                        Guarda en mi tarjetero tarjet
        
                        <span>
                            <Image 
                                src={'/images/icono-t-tarjet.svg'}
                                alt='icono de redes sociales'
                                width={150}
                                height={150}
                            />
                        </span>
                    </motion.button>
                ) }

            </div>

            { shareProfile && <Social token={userData.TokenId} close={()=>setShareProfile(false)}/> }
            { success && <SaveSuccessfully /> }
        </Fragment>
    );
}

export default ButtonsSite;