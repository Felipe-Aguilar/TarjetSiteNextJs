'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import style from './otp.module.scss';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface Props {
    email:string;
    password: string;
    close: () => void;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1},
    exit: {scale: 0}
}


const OtpCode = ( { email, password, close }:Props ) => {

    const router = useRouter();
    
    useEffect(()=>{

        const codeEmail = async () => {
            await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/EnviarCodigoOTP?Nombre=&Email=${email}`, {
                method: 'GET',
                mode: 'cors'
            });
        }

        codeEmail();

    },[]);
    
    const [code, setCode] = useState('');
    const [codeSend, setCodeSend] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const checkCode = async () => {

        const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ValidarCodigoOTP',{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "RegistroUsu": {
                    "Nombre": "",
                    "ApellidoPat": "",
                    "ApellidoMat": "",
                    "Codigo": code,
                    "Correo": email,
                    "Password": password
                }
            })
        });

        const data = await response.json();

        if (data.Token) {
            setCodeSend(true);

            setTimeout(()=>{
                setSuccess(true);

                setTimeout(()=>{
                    signIn('credentials', { email, password, callbackUrl: '/registro'});
                },3000);
            },3500)
        }

        setError('Código no válido, segúrese de ingresar el código exacto que le fue proporcionado. Si está teniendo dificultades, no dude en solicitar un nuevo código');
    }

    return ( 
        <div className="pop">
            <AnimatePresence>
                { !codeSend && (
                    <motion.div className={`container ${style.OTP}`} {...animate}>
                        <h5>Verifica tu correo</h5>

                        <OTPInput
                            value={code}
                            onChange={(otp:string)=>setCode(otp)}
                            numInputs={6}
                            renderInput={(props) => <input {...props} />}
                        />

                        <p>
                            Hemos generado un código para usted y lo hemos enviado a su dirección de correo electrónico. Por favor, revise su bandeja de entrada. Si no encuentra el correo en la bandeja principal, le recomendamos verificar la carpeta de correo no deseado.
                        </p>

                        <p>¿No te llegó el código? <span>Enviar nuevamente</span></p>

                        {error &&
                            <p className="error">
                                {error}
                            </p>
                        }

                        <button 
                            className="btn" 
                            disabled={code.length < 6 ? true : false}
                            onClick={checkCode}
                        >
                            Verificar código
                        </button>

                        <button className="close" onClick={close}>
                            cerrar ventana (x)
                        </button>
                    </motion.div>
                )}

                { success && (
                    <motion.div className={`container ${style.Success}`} {...animate}>
                        <img src="/images/registro-exitoso.png" alt="Ilustración de registro exitoso" />
                        <h5>Código proporcionado válido</h5>
                        <p>Perfil creado con éxito</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default OtpCode;