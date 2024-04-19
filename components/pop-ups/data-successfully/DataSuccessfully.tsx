import { BsCheckCircle } from "react-icons/bs";
import { motion } from "framer-motion";

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1},
    exit: {scale: 0}
}

const DataSuccessfully = () => {
    return ( 
        <div className="pop">
            <motion.div className={`container`} {...animate}>
                <h5>Tus datos se actualizaron correctamente</h5>
                <BsCheckCircle 
                    style={{display: 'block', margin: 'auto', fontSize: '2rem', color: '#006d2e'}}
                />
            </motion.div>
        </div>
    );
}

export default DataSuccessfully;