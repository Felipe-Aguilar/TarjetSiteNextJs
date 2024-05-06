import { motion } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1}
}

const NewUserPartner = () => {
    return ( 
        <div className="pop">
            <motion.div {...animate} className="container">
                <h5>Usuario registrado con éxito, ahora puedes entrar a su perfil para configurar su Tarjet y Tarjet Site</h5>
                <BsCheckCircle style={{fontSize: '2rem', display: 'block', margin: 'auto', color: '#006d2e'}}/>
            </motion.div>
        </div>
    );
}

export default NewUserPartner;