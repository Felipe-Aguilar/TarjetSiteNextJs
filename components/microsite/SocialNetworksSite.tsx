import { UserDataResponse } from '@/interfaces/userData-interface';

import defaultStyle from './site.module.scss';
import winterStyle from '../themes/winter.module.scss'
import darkStyle from '../themes/dark.module.scss';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaSpotify, FaTelegramPlane, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaXTwitter  } from "react-icons/fa6";
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface Props {
    userData: UserDataResponse;
    tokenServer: string | undefined | null;
    tema: string;
}

const SocialNetworsSite = ({userData, tokenServer, tema} :Props) => {
    // Función para obtener la URL de una red social por su ID
    const getSocialUrl = (socialId: string) => {
        return userData.ListRedesSociales?.find(red => red.RedSocialId === socialId)?.RedSocialUrl || '';
    };

    // URLs de las redes sociales
    const instagramUrl = getSocialUrl('INSTA').trim()   || '';
    const facebookUrl = getSocialUrl('FACEB').trim()  || ''; 
    const tiktokUrl = getSocialUrl('TIKTO').trim()  || '';
    const twitterUrl = getSocialUrl('TWIT').trim()  || '';
    const youtubeUrl = getSocialUrl('YOUT').trim()  || '';
    const linkedinUrl = getSocialUrl('LINK').trim()  || '';
    const telegramUrl = getSocialUrl('TELE').trim()  || '';
    const spotifyUrl = getSocialUrl('SPOT').trim() || '';
    const whatsappUrl = getSocialUrl('WHAT').trim() ;

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
        <div className={style.Social} id='SocialSection'>
            { userData && (
                <Fragment>
                    <h4>Mis redes sociales</h4>

                    <div className={style.SocialButtons}>
                        {/* Facebook */}
                        <a href={facebookUrl} className={`${style.Facebook} ${!facebookUrl ? style.Disabled : ''}`} target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        
                        <a href={instagramUrl} className={`${style.Instagram} ${!instagramUrl ? style.Disabled : ''}`} target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>

                        {/* Tiktok */}
                        <a href={tiktokUrl} className={`${style.Tiktok} ${!tiktokUrl ? style.Disabled : ''}`} target="_blank" rel="noopener noreferrer">
                            <FaTiktok />
                            <FaTiktok className={style.Blue}/>
                            <FaTiktok className={style.Red}/>
                        </a>

                        {/* Twitter/X */}
                        <a href={twitterUrl} className={`${style.Twitter} ${!twitterUrl ? style.Disabled : ''}`} target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>

                        {/* Youtube */}
                        <a href={youtubeUrl} className={`${style.Youtube} ${!youtubeUrl ? style.Disabled : ''}`} target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                        </a>

                        {/* Linkedin */}
                        <a href={linkedinUrl} className={`${style.Linkedin} ${!linkedinUrl ? style.Disabled : ''}`} target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn />
                        </a>

                        {/* Telegram */}
                        <a href={telegramUrl} className={`${style.Telegram} ${!telegramUrl ? style.Disabled : ''}`} target="_blank" rel="noopener noreferrer">
                            <FaTelegramPlane />
                        </a>

                        {/* Spotify */}
                        <a href={spotifyUrl} className={`${style.Spotify} ${!spotifyUrl ? style.Disabled : ''}`} target="_blank" rel="noopener noreferrer">
                            <FaSpotify />
                        </a>

                        {/* Whatsapp */}
                        <a href={whatsappUrl} className={`${style.Whatsapp} ${!whatsappUrl ? style.Disabled : ''}`} target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp />
                        </a>
                    </div>

                    <hr/>
                    <div className={style.Username}>
                        <h5>Gracias por visitar mi Tarjeta</h5>
                        <p>Usuario: {userData.Alias}</p>
                    </div>
                    
                    { !tokenServer && userData.Tipo !== 'EMP' && userData.Tipo !== 'COL' && (
                        <Fragment>
                            <div className={style.Info}>
                                <Image 
                                    src={'/images/logo.svg'}
                                    alt='logo tarjet'
                                    width={100}
                                    height={100}
                                    priority={false}
                                />
                                <p>Conectamos personas con tu negocio</p>
                                <h6>
                                    Te agradó esta tarjeta digital <br/>
                                    <span>Tú también puedes tener la tuya</span>
                                </h6>
                                <Link href="/st/ZWQ1MDhmYjgw">
                                    Solicita gratuitamente tu tarjeta digital Tarjet
                                </Link>
                                <h6>
                                    Actualízate <br/>
                                    <span>Genera un impacto positivo con tu tarjeta Física tarjet</span>
                                </h6>
                                <Image 
                                    src={'/images/tarjeta-fisica.webp'}
                                    alt='Tarjeta física tarjet'
                                    width={200}
                                    height={200}
                                    priority={false}
                                    className={style.Card}
                                />
                                <a href="/st/ZWQ1MDhmYjgw" className={style.Orange}>
                                    Compra tu tarjeta física Tarjet con NFC <br/>
                                    <span>Es personalizada</span>
                                </a>
                                <h6>
                                    <span>Hagamos Networking</span> <br/>
                            
                                    En nuestro directorio puedes ser encontrado fácilmente por personas que buscan lo que haces
                                </h6>
                                <Link href="/login" className={style.Violet}>
                                    Regístrate gratuitamente <span>y accede a tu tarjetero digital tarjet</span>
                                </Link>
                            </div>

                            <Link href={'/directorio-tarjet'} className={style.LinkFooter}>
                                Te invitamos a conocernos, visita nuestro sitio oficial
                            </Link>
                        </Fragment>
                    )

                    }


                </Fragment>
            )}
        </div>
    );
}

export default SocialNetworsSite;