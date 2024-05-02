import { BsCheckCircle } from 'react-icons/bs';
import { motion } from 'framer-motion';

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1},
    exit: {scale: 0}
}

const SaveSuccessfully = () => {
    return ( 
        <div className="pop">
            <motion.div className="container" {...animate}>
                <h5>Usuario Guardado en tu Tarjetero</h5>
                <BsCheckCircle 
                    style={{display: 'block', margin: 'auto', fontSize: '2rem', color: '#006d2e'}}
                />
                <p style={{marginTop: '20px', fontSize: '0.9rem'}}>Consulta tu tarjetero para ver tus tarjets guardadas</p>
            </motion.div>
        </div>
    );
}

export default SaveSuccessfully;