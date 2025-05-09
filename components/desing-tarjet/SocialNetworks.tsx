import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsCaretDownFill, BsQuestionCircle } from "react-icons/bs";
import { UserDataResponse } from "@/interfaces/userData-interface";
import { FaFacebookF, FaGoogle, FaInstagram, FaLinkedinIn, FaTelegramPlane, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import InfoFacebook from "../pop-ups/info-facebook/InfoFacebook";
import EditData from "@/app/api/editData";
import PopupSwitch from "../pop-ups/Popupswitch/PopupSwitch";

interface Props {
    userData: UserDataResponse;
}

const animate = {
    initial: {opacity: 0, height: 0},
    animate: {opacity: 1, height: 'auto'},
    exit: {opacity: 0, height: 0},
}

const SocialNetworks = ( {userData}: Props ) => {

    const [open, setOpen] = useState<boolean>(false);

    const [facebook, setFacebook] = useState<string>(userData.Facebook);
    const [instagram, setInstagram] = useState<string>(userData.Instagram);
    const [tiktok, setTiktok] = useState<string>(userData.Tiktok);
    const [twitter, setTwitter] = useState<string>(userData.Twitter);
    const [youtube, setYoutube] = useState<string>(userData.Youtube);
    const [linkedin, setLinkedin] = useState<string>(userData.Linkedin);
    const [telegram, setTelegram] = useState<string>(userData.Telegram);
    // const [google, setGoogle] = useState<string>(userData.google);

    const [openInfo, setOpenInfo] = useState<boolean>(false);

    const onSubmitData = async () => {
        const socialForm = {
            "Facebook": facebook,
            "Instagram": instagram,
            "Tiktok": tiktok,
            "Twitter": twitter,
            "Youtube": youtube,
            "Telegram": telegram,
            "Linkedin": linkedin,
        }

        await EditData({userData, socialForm});
    }

    return ( 
        <Fragment>
            <button className="title" type="button" onClick={()=>setOpen(!open)}>
                Redes Sociales

                <motion.div animate={open ? {rotate: 180} : {rotate: 0}}>
                    <BsCaretDownFill />
                </motion.div>
            </button>

            <AnimatePresence>
                { open && (
                    <motion.div {...animate} className="contact">
                        <div className="input-contact">
                            <div>
                                <FaFacebookF />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Url Facebook"
                                value={facebook}
                                onChange={(e)=>setFacebook(e.target.value.trim())}
                                style={{borderRadius: 0}}
                                onBlur={onSubmitData}
                            />

                            <button onClick={()=>setOpenInfo(true)} type="button">
                                <BsQuestionCircle style={{color: '#000', fontSize: '1rem'}}/>
                            </button>
                        </div>

                        <div className="input-contact">
                            <div>
                                <FaInstagram />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Url Instagram"
                                value={instagram}
                                onChange={(e)=>setInstagram(e.target.value.trim())}
                                onBlur={onSubmitData}
                            />
                        </div>

                        <div className="input-contact">
                            <div>
                                <FaTiktok />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Url Tiktok"
                                value={tiktok}
                                onChange={(e)=>setTiktok(e.target.value.trim())}
                                onBlur={onSubmitData}
                            />
                        </div>

                        <div className="input-contact">
                            <div>
                                <FaXTwitter />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Url Twitter"
                                value={twitter}
                                onChange={(e)=>setTwitter(e.target.value.trim())}
                                onBlur={onSubmitData}
                            />
                        </div>

                        <div className="input-contact">
                            <div>
                                <FaYoutube />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Url Youtube"
                                value={youtube}
                                onChange={(e)=>setYoutube(e.target.value.trim())}
                                onBlur={onSubmitData}
                            />
                        </div>

                        <div className="input-contact">
                            <div>
                                <FaLinkedinIn />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Url Linkedin"
                                value={linkedin}
                                onChange={(e)=>setLinkedin(e.target.value.trim())}
                                onBlur={onSubmitData}
                            />
                        </div>

                        <div className="input-contact">
                            <div>
                                <FaTelegramPlane />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Url Telegram"
                                value={telegram}
                                onChange={(e)=>setTelegram(e.target.value.trim())}
                                onBlur={onSubmitData}
                            />
                        </div>

                        <div className="input-contact">
                            <div>
                                <FaGoogle  />
                            </div>

                            <input 
                                type="text" 
                                placeholder="Url Google"
                                // value={telegram}
                                // onChange={(e)=>setTelegram(e.target.value.trim())}
                                // onBlur={onSubmitData}
                            />
                        </div>

                        <PopupSwitch uuid={userData.UUID} />
                    </motion.div>
                )}
            </AnimatePresence>

            { openInfo && (
                <InfoFacebook close={()=>setOpenInfo(false)}/>
            )}
        </Fragment>
    );
}

export default SocialNetworks;