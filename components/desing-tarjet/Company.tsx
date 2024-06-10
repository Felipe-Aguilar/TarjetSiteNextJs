import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import style from './company.module.scss';
import CompanySuccessfully from "../pop-ups/company-successfully/CompanySuccessfully";

interface Props {
    uuid: string;
    tken: string;
    businessName: string;
}

const animate = {
    initial: {opacity: 0, height: 0},
    animate: {opacity: 1, height: 'auto'},
    exit: {opacity: 0, height: 0},
}

const Company = ({uuid, tken, businessName} : Props) => {

    const [token, setToken] = useState<string>(businessName ?? '');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [access, setAccess] = useState<boolean>(false);
    const route = useRouter();
    
    const CompanySubmit = async () => {
        const response = await fetch('https://souvenir-site.com/WebTarjet/APIEmpresas/vincularEmpresa', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "usuId": uuid,
                "Token": token,
                "Password": password
            })
        });

        const data = await response.json();

        if (!data.Acceso) {
            setError('Acceso no autorizado, favor de validar la información de la Empresa');
        }else{
            setError('');
            setAccess(true);

            setTimeout(()=>{
                route.replace(`/disena-tarjet/${btoa(tken)}`);
                setAccess(false);
            }, 3000)
        }
    }

    return ( 
        <AnimatePresence>
            <motion.div {...animate} className={style.Company}>
                <input 
                    type="text" 
                    placeholder="Token" 
                    value={token} 
                    onChange={(e)=>setToken(e.target.value.trim())}
                    disabled={businessName ? true : false}
                />
                <input 
                    type="text" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value.trim())}
                    disabled={businessName ? true : false}
                />

                <button className="btn" type="button" onClick={CompanySubmit}>Enviar</button>

                {error && <p>{error}</p>}
            </motion.div>

            {access && <CompanySuccessfully /> }
        </AnimatePresence>
    );
}

export default Company;