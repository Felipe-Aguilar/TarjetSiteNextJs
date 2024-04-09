import { Fragment, useState } from "react";
import { UserDataResponse } from '../../interfaces/userData-interface';
import { BsCaretDownFill, BsTelephoneFill, BsWhatsapp } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

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
    const [showUbication, setShowUbication] = useState(userData.VerUbicacion);
    const [email, setEmail] = useState(userData.Mail);
    const [website, setWebsite] = useState(userData.Web);

    return ( 
        <Fragment>
            <button className="title" type="button" onClick={()=>setOpen(!open)}>
                Datos de contacto
                <BsCaretDownFill />
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
                                value={whatsApp}
                                onChange={(e)=>setWhatsApp(e.target.value)}
                            />
                        </div>

                        <div className="input-contact">
                            <div>
                                <BsTelephoneFill />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Teléfono fijo ó de contacto"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                            />
                        </div>

                        <div className="input-checkbox">
                            <input 
                                type="checkbox" 
                                id="ubication"
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
                                onChange={(e)=>setEmail(e.target.value)}
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
                                onChange={(e)=>setWebsite(e.target.value)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </Fragment>
    );
}

export default ContactData;