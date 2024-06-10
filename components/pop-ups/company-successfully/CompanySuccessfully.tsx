import { motion } from "framer-motion";
import { BsBuildingCheck } from "react-icons/bs";

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1},
    exit: {scale: 0}
}

const CompanySuccessfully = () => {
    return ( 
        <div className="pop">
            <motion.div {...animate} className="container" style={{flexDirection: 'column'}}>
                <BsBuildingCheck style={{display: 'block', margin: 'auto', marginBottom: '10px', color: '#006d2e', fontSize: '2rem'}}/>
                <h5>Tu perfil pertenece ahora a Empresa</h5>
            </motion.div>
        </div>
    );
}

export default CompanySuccessfully;