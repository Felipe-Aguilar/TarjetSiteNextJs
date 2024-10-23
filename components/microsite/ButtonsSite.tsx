import { UserDataResponse } from '@/interfaces/userData-interface';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-scroll';
import { useRouter } from 'next/navigation';

import style from './site.module.scss';
import Image from 'next/image';
import FileSaver from 'file-saver';
import Social from '../pop-ups/social/Social';
import SaveSuccessfully from '../pop-ups/save-successfully/SaveSuccessfully';

interface Props {
    userData: UserDataResponse;
    tokenServer: string | null | undefined;
    uuidServer: string | null | undefined;
}

const animate = {
    initial :{ opacity:0 , y: -20 },
    whileInView:{ y:0, opacity: 1 },
    viewport: { once:true }
}

const ButtonsSite = ({userData, tokenServer, uuidServer} :Props) => {

    
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
                        className={style.WhatsApp}
                    >
                        Envíame un WhatsApp
    
                        <span>
                            <BsWhatsapp />
                        </span>
                    </motion.a>
                ) }

                { userData.VerUbicacion === 1 && (
                    <motion.a href={`https://www.google.com/maps?q=${userData.MapsGeoloc}`} target='_blank' {...animate} transition={{delay: 1.4}} className={style.Ubication}>
                        {userData.TexoUbica && `${userData.TexoUbica} `}
                        {userData.Colonia}

                        <span>
                            <Image 
                                src={'/images/icono-ubicacion.svg'}
                                alt='icono de ubicación'
                                width={150}
                                height={150}
                            />
                        </span>
                    </motion.a>
                ) }
                
                { userData.Mail && (
                    <motion.a href={`mailto: ${userData.Mail}`} {...animate} transition={{delay: 1.6}} className={style.Email}>
                        {userData.Mail}

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
                        {userData.Web}

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
        height: '50px', // Altura del botón
        display: 'flex', // Alinear elementos en el mismo nivel
       // justifyContent: 'space-between', // Separar texto e icono
       alignItems: 'left', // Centrar verticalmente
        padding: '0 0px', // Añadir espacio interno
        //justifyItems: 'left',
        //width: '100%', // Ancho total
        borderRadius: '8px', // Bordes redondeados
        transition: 'background-color 0.3s ease', // Transición suave al pasar el mouse
      }}
      
    >
      <span style={{
        flexGrow: 1,
        marginLeft: '20px', // Separación del lado izquierdo
        textAlign: 'left', // Alineado a la izquierda
        color: boton.ButtonColorTxt, // Texto en color blanco
        maxWidth: '100%',
        background: 'transparent',
        justifyContent: 'left'

      }}>
        {boton.ButtonTexto}
      </span>

      {/* Contenedor del icono con color de fondo y tamaño fijo */}
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
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = boton.ButtonColor1} // Cambia el color al pasar el mouse
onMouseLeave={(e) => e.currentTarget.style.backgroundColor = boton.ButtonColor2} // Vuelve al color original
      >
        <Image 
          src={boton.ButtonIcono}
          alt={`Icono de ${boton.ButtonNom}`}
          width={36}
          height={36} // Tamaño de 36x36 para el icono
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