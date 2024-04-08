import { AnimatePresence, motion } from "framer-motion";
import { BsCheckCircle, BsExclamationTriangle } from "react-icons/bs";

import style from './eliminate.module.scss';
import { useState } from "react";

interface Props {
    idUserEliminate: string,
    uuId: string
    close: () => void;
}

const EliminateUser = ({idUserEliminate, uuId, close}:Props) => {

    const animate = {
        initial: {scale: 0},
        animate: {scale: 1},
        transition: {delay: 1},
        exit: {scale: 0}
    }

    const [confirm, setConfirm] = useState<boolean>(false);

    const Eliminate = async () => {
        await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/BajaTarjet',{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "TarjetGIdUsuario": uuId,
                "TarjetGIdTarjet": idUserEliminate,
            })
        });

        setConfirm(true);
    }

    return ( 
        <div className="pop">
            <AnimatePresence>
                { !confirm && (
                    <motion.div className="container" {...animate}>
                        <BsExclamationTriangle className={style.SVG}/>
                        <h5>¿Deseas quitar a este usuario de tu tarjetero?</h5>

                        <button className="btn" onClick={()=>Eliminate()}>
                            Quitar
                        </button>

                        <button className={`close ${style.Close}`} onClick={close}>
                            cerrar ventana (x)
                        </button>
                    </motion.div>
                )}

                { confirm && (
                    <motion.div className="container" {...animate}>
                        <h5>Se quitó el usuario de su tarjetero correctamente</h5>
                        <BsCheckCircle className={style.SVG}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default EliminateUser;