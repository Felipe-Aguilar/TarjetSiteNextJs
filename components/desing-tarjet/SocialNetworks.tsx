import { Fragment, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsCaretDownFill, BsQuestionCircle } from "react-icons/bs";
import { UserDataResponse } from "@/interfaces/userData-interface";
import { FaFacebookF, FaGoogle, FaInstagram, FaLinkedinIn, FaTelegramPlane, FaTiktok, FaYoutube, FaSpotify, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


import InfoFacebook from "../pop-ups/info-facebook/InfoFacebook";
import EditData from "@/app/api/editData";
import PopupSwitch from "../pop-ups/Popupswitch/PopupSwitch";

interface Props {
    userData: UserDataResponse;
}

interface SiteDataResponse {
    SDTSite: {
        SiteGoogle: string;
    }
}

const animate = {
    initial: {opacity: 0, height: 0},
    animate: {opacity: 1, height: 'auto'},
    exit: {opacity: 0, height: 0},
}

const SocialNetworks = ({ userData }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openInfo, setOpenInfo] = useState<boolean>(false);
    
    // Estados individuales para cada red social
    const [google, setGoogle] = useState<string>('');
    const [facebook, setFacebook] = useState<string>('');
    const [instagram, setInstagram] = useState<string>('');
    const [tiktok, setTiktok] = useState<string>('');
    const [twitter, setTwitter] = useState<string>('');
    const [youtube, setYoutube] = useState<string>('');
    const [linkedin, setLinkedin] = useState<string>('');
    const [telegram, setTelegram] = useState<string>('');
    const [spotify, setSpotify] = useState<string>('');
    const [whatsappGroup, setWhatsappGroup] = useState<string>('');

    // Estado para el arreglo completo de redes sociales
    const [socialNetworks, setSocialNetworks] = useState<Array<{
        RedSocialId: string;
        RedSocialDesc: string;
        RedSocialUrl: string;
    }>>([]);

    // Inicialización de estados
    useEffect(() => {
        // Primero cargamos desde ListRedesSociales si existe
        if (userData.ListRedesSociales && userData.ListRedesSociales.length > 0) {
            const networks = userData.ListRedesSociales;
            setSocialNetworks(networks);
            
            // Actualizar estados individuales
            networks.forEach(net => {
                switch(net.RedSocialId) {
                    case 'INSTA': setInstagram(net.RedSocialUrl); break;
                    case 'GOOG': setGoogle(net.RedSocialUrl); break;
                    case 'FACEB': setFacebook(net.RedSocialUrl); break;
                    case 'TIKT': setTiktok(net.RedSocialUrl); break;
                    case 'TWIT': setTwitter(net.RedSocialUrl); break;
                    case 'YOUT': setYoutube(net.RedSocialUrl); break;
                    case 'LINK': setLinkedin(net.RedSocialUrl); break;
                    case 'TELE': setTelegram(net.RedSocialUrl); break;
                    case 'SPOT': setSpotify(net.RedSocialUrl); break;
                    case 'WAPP': setWhatsappGroup(net.RedSocialUrl); break;
                }
            });
        } else {
            // Si no hay ListRedesSociales, inicializar con valores por defecto
            const defaultNetworks = [
                { RedSocialId: 'INSTA', RedSocialDesc: 'Instagram', RedSocialUrl: userData.Instagram || '' },
                { RedSocialId: 'GOOG', RedSocialDesc: 'Google', RedSocialUrl: (userData as any).SiteGoogle || userData.Google || '' },
                { RedSocialId: 'FACEB', RedSocialDesc: 'FaceBook', RedSocialUrl: userData.Facebook || '' },
                { RedSocialId: 'TIKT', RedSocialDesc: 'TikTok', RedSocialUrl: userData.Tiktok || '' },
                { RedSocialId: 'TWIT', RedSocialDesc: 'Twitter', RedSocialUrl: userData.Twitter || '' },
                { RedSocialId: 'YOUT', RedSocialDesc: 'YouTube', RedSocialUrl: userData.Youtube || '' },
                { RedSocialId: 'LINK', RedSocialDesc: 'LinkedIn', RedSocialUrl: userData.Linkedin || '' },
                { RedSocialId: 'TELE', RedSocialDesc: 'Telegram', RedSocialUrl: userData.Telegram || '' },
                { RedSocialId: 'SPOT', RedSocialDesc: 'Spotify', RedSocialUrl: '' },
                { RedSocialId: 'WAPP', RedSocialDesc: 'WhatsApp Group', RedSocialUrl: '' },
            ];
            
            setSocialNetworks(defaultNetworks);
            
            // Actualizar estados individuales desde el default
            setGoogle(defaultNetworks.find(n => n.RedSocialId === 'GOOG')?.RedSocialUrl || '');
            setFacebook(defaultNetworks.find(n => n.RedSocialId === 'FACEB')?.RedSocialUrl || '');
            setInstagram(defaultNetworks.find(n => n.RedSocialId === 'INSTA')?.RedSocialUrl || '');
            setTiktok(defaultNetworks.find(n => n.RedSocialId === 'TIKT')?.RedSocialUrl || '');
            setTwitter(defaultNetworks.find(n => n.RedSocialId === 'TWIT')?.RedSocialUrl || '');
            setYoutube(defaultNetworks.find(n => n.RedSocialId === 'YOUT')?.RedSocialUrl || '');
            setLinkedin(defaultNetworks.find(n => n.RedSocialId === 'LINK')?.RedSocialUrl || '');
            setTelegram(defaultNetworks.find(n => n.RedSocialId === 'TELE')?.RedSocialUrl || '');
        }

        // Obtener datos adicionales del sitio si es necesario
        const fetchSiteData = async () => {
            try {
                const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaMiSite?Siteusuid=${userData.UUID}`);
                const data: SiteDataResponse = await response.json();
                
                if (data.SDTSite.SiteGoogle) {
                    setGoogle(data.SDTSite.SiteGoogle);
                }
            } catch (error) {
                console.error("Error fetching site data:", error);
            }
        };

        fetchSiteData();
    }, [userData.UUID]);

    // Función para enviar datos al backend
    const onSubmitData = async () => {
        // Reconstruir el arreglo con los valores actuales (incluyendo vacíos)
        const updatedSocialNetworks = [
            { RedSocialId: 'INSTA', RedSocialDesc: 'Instagram', RedSocialUrl: instagram ?? ' ' },
            { RedSocialId: 'GOOG', RedSocialDesc: 'Google', RedSocialUrl: google ?? ' ' },
            { RedSocialId: 'FACEB', RedSocialDesc: 'FaceBook', RedSocialUrl: facebook ?? ' ' },
            { RedSocialId: 'TIKTO', RedSocialDesc: 'TikTok', RedSocialUrl: tiktok ?? ' ' },
            { RedSocialId: 'TWIT', RedSocialDesc: 'Twitter', RedSocialUrl: twitter ?? ' ' },
            { RedSocialId: 'YOUT', RedSocialDesc: 'YouTube', RedSocialUrl: youtube ?? ' ' },
            { RedSocialId: 'LINK', RedSocialDesc: 'LinkedIn', RedSocialUrl: linkedin ?? ' ' },
            { RedSocialId: 'TELE', RedSocialDesc: 'Telegram', RedSocialUrl: telegram ?? ' ' },
            { RedSocialId: 'SPOT', RedSocialDesc: 'Spotify', RedSocialUrl: spotify ?? '' },
            { RedSocialId: 'WHAT', RedSocialDesc: 'WhatsApp Group', RedSocialUrl: whatsappGroup ?? '' },
        ].filter(net => net.RedSocialUrl);

        // Preparar el objeto para enviar
        const socialForm = {
            "Google": google,
            "Facebook": facebook,
            "Instagram": instagram,
            "Tiktok": tiktok,
            "Twitter": twitter,
            "Youtube": youtube,
            "Telegram": telegram,
            "Linkedin": linkedin,
            "ListRedesSociales": updatedSocialNetworks // Envía todas las redes, incluso vacías
        };
        console.log("socialForm enviado a EditData:", socialForm);
        try {
            // Enviar datos al backend
            await EditData({ userData, socialForm });
            
            // Actualizar el estado local solo después de confirmar el envío
            setSocialNetworks(updatedSocialNetworks);
            
            console.log("Redes sociales actualizadas correctamente");
        } catch (error) {
            console.error("Error al actualizar redes sociales:", error);
        }
    };

    return ( 
        <Fragment>
            <button className="title" type="button" onClick={() => setOpen(!open)}>
                Redes Sociales
                <motion.div animate={open ? {rotate: 180} : {rotate: 0}}>
                    <BsCaretDownFill />
                </motion.div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div {...animate} className="contact">
                        {/* Facebook */}
                        <div className="input-contact">
                            <div><FaFacebookF /></div>
                            <input 
                                type="text" 
                                placeholder="Url Facebook"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                style={{borderRadius: 0}}
                                onBlur={onSubmitData}
                            />
                            <button onClick={() => setOpenInfo(true)} type="button">
                                <BsQuestionCircle style={{color: '#000', fontSize: '1rem'}}/>
                            </button>
                        </div>

                        {/* Instagram */}
                        <div className="input-contact">
                            <div><FaInstagram /></div>
                            <input 
                                type="text" 
                                placeholder="Url Instagram"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                onBlur={onSubmitData}
                            />
                        </div>

                        {/* TikTok */}
                        <div className="input-contact">
                            <div><FaTiktok /></div>
                            <input 
                                type="text" 
                                placeholder="Url TikTok"
                                value={tiktok}
                                onChange={(e) => setTiktok(e.target.value)}
                                onBlur={onSubmitData}
                            />
                        </div>

                        {/* Twitter/X */}
                        <div className="input-contact">
                            <div><FaXTwitter /></div>
                            <input 
                                type="text" 
                                placeholder="Url Twitter/X"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                onBlur={onSubmitData}
                            />
                        </div>

                        {/* YouTube */}
                        <div className="input-contact">
                            <div><FaYoutube /></div>
                            <input 
                                type="text" 
                                placeholder="Url YouTube"
                                value={youtube}
                                onChange={(e) => setYoutube(e.target.value)}
                                onBlur={onSubmitData}
                            />
                        </div>

                        {/* LinkedIn */}
                        <div className="input-contact">
                            <div><FaLinkedinIn /></div>
                            <input 
                                type="text" 
                                placeholder="Url LinkedIn"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                onBlur={onSubmitData}
                            />
                        </div>

                        {/* Telegram */}
                        <div className="input-contact">
                            <div><FaTelegramPlane /></div>
                            <input 
                                type="text" 
                                placeholder="Url Telegram"
                                value={telegram}
                                onChange={(e) => setTelegram(e.target.value)}
                                onBlur={onSubmitData}
                            />
                        </div>

                        {/* Google */}
                        <div className="input-contact">
                            <div><FaGoogle /></div>
                            <input 
                                type="text" 
                                placeholder="Url Google"
                                value={google}
                                onChange={(e) => setGoogle(e.target.value)}
                                onBlur={onSubmitData}
                            />
                        </div>

                        {/* Spotify (nuevo) */}
                        <div className="input-contact">
                            <div><FaSpotify /></div>
                            <input 
                                type="text" 
                                placeholder="Url Spotify"
                                value={spotify}
                                onChange={(e) => setSpotify(e.target.value)}
                                onBlur={onSubmitData}
                            />
                        </div>

                        {/* WhatsApp Group (nuevo) */}
                        <div className="input-contact">
                            <div><FaWhatsapp /></div>
                            <input 
                                type="text" 
                                placeholder="Url Grupo WhatsApp"
                                value={whatsappGroup}
                                onChange={(e) => setWhatsappGroup(e.target.value)}
                                onBlur={onSubmitData}
                            />
                        </div>

                        <PopupSwitch userData={userData} />
                    </motion.div>
                )}
            </AnimatePresence>

            {openInfo && <InfoFacebook close={() => setOpenInfo(false)} />}
        </Fragment>
    );
}

export default SocialNetworks;