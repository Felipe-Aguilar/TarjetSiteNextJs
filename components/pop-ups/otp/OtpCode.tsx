'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import OTPInput from "react-otp-input";
import style from './otp.module.scss';

interface Props {
    email: string;
    password: string;
    close: () => void;
}

const animate = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { delay: 1 },
    exit: { scale: 0 }
}

const OtpCode = ({ email, password, close }: Props) => {
    const [code, setCode] = useState('');
    const [codeSend, setCodeSend] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [emailError, setEmailError] = useState<string>('');

    useEffect(() => {
        const codeEmail = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/EnviarCodigoOTP?Nombre=&Email=${email}`, {
                    method: 'GET',
                    mode: 'cors'
                });
                
                const data = await response.json();
                
                if (data.Mensaje && data.Mensaje.includes("ya se encuentra en nuestro sistema")) {
                    setEmailError(data.Mensaje);
                }
            } catch (err) {
                console.error("Error al enviar código OTP:", err);
                setError('Ocurrió un error al enviar el código. Por favor intente nuevamente.');
            } finally {
                setLoading(false);
            }
        }

        codeEmail();
    }, [email]);

    const checkCode = async () => {
        if (emailError) return;

        try {
            const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ValidarCodigoOTP', {
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
                setTimeout(() => {
                    setSuccess(true);
                    setTimeout(() => {
                        signIn('credentials', { email, password, callbackUrl: '/registro' });
                    }, 3000);
                }, 3500);
            } else {
                setError('Código no válido, segúrese de ingresar el código exacto que le fue proporcionado. Si está teniendo dificultades, no dude en solicitar un nuevo código');
            }
        } catch (err) {
            console.error("Error al validar código:", err);
            setError('Ocurrió un error al validar el código. Por favor intente nuevamente.');
        }
    }

    const handleResendCode = async () => {
        setError('');
        setEmailError('');
        setLoading(true);
        try {
            const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/EnviarCodigoOTP?Nombre=&Email=${email}`, {
                method: 'GET',
                mode: 'cors'
            });
            
            const data = await response.json();
            
            if (data.Mensaje && data.Mensaje.includes("ya se encuentra en nuestro sistema")) {
                setEmailError(data.Mensaje);
            } else {
                setCode('');
                setError('');
            }
        } catch (err) {
            console.error("Error al reenviar código:", err);
            setError('Ocurrió un error al reenviar el código. Por favor intente nuevamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="pop">
            <AnimatePresence>
                {loading ? (
                    <motion.div className={`container ${style.Loading}`} {...animate}>
                        <p>Verificando tu correo electrónico...</p>
                    </motion.div>
                ) : emailError ? (
                    <motion.div className={`container ${style.Error}`} {...animate}>
                        <h5>Correo ya registrado</h5>
                        <p>{emailError}</p>
                        <div className={style.Buttons}>
                            <button className="btn" onClick={() => {
                                setEmailError('');
                                close();
                                signIn('credentials', { email, password, callbackUrl: '/login' });
                            }}>
                                Iniciar sesión
                            </button>
                            <button className="btn secondary" onClick={close}>
                                Cerrar
                            </button>
                        </div>
                    </motion.div>
                ) : !codeSend ? (
                    <motion.div className={`container ${style.OTP}`} {...animate}>
                        <h5>Verifica tu correo</h5>

                        <OTPInput
                            value={code}
                            onChange={(otp: string) => setCode(otp)}
                            numInputs={6}
                            renderInput={(props) => <input {...props} />}
                        />

                        <p>
                            Hemos generado un código para usted y lo hemos enviado a su dirección de correo electrónico. 
                            Por favor, revise su bandeja de entrada. Si no encuentra el correo en la bandeja principal, 
                            le recomendamos verificar la carpeta de correo no deseado.
                        </p>

                        <p>¿No te llegó el código? <span onClick={handleResendCode}>Enviar nuevamente</span></p>

                        {error && (
                            <p className="error">
                                {error}
                            </p>
                        )}

                        <button
                            className="btn"
                            disabled={code.length < 6}
                            onClick={checkCode}
                        >
                            Verificar código
                        </button>

                        <button className="close" onClick={close}>
                            cerrar ventana (x)
                        </button>
                    </motion.div>
                ) : success ? (
                    <motion.div className={`container ${style.Success}`} {...animate}>
                        <img src="/images/registro-exitoso.png" alt="Ilustración de registro exitoso" />
                        <h5>Código proporcionado válido</h5>
                        <p>Perfil creado con éxito</p>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export default OtpCode;