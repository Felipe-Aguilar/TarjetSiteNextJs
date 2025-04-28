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
    const [skipVerification, setSkipVerification] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const registerUser = async () => {
        setLoading(true);
        
        try {
            // Llamada directa para registrar al usuario sin verificación
            const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/RegistroUsuario', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "RegistroUsu": {
                        "Nombre": "",
                        "ApellidoPat": "",
                        "ApellidoMat": "",
                        "Correo": email,
                        "Password": password
                    }
                })
            });

            const data = await response.json();

            if (data.Token) {
                setSuccess(true);
                setTimeout(() => {
                    signIn('credentials', { email, password, callbackUrl: '/registro' });
                }, 3000);
            } else {
                setError(data.message || 'Error al registrar el usuario');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const handleSkipVerification = () => {
        setSkipVerification(true);
        registerUser();
    };

    return (
        <div className="pop">
            <AnimatePresence>
                {!success && (
                    <motion.div className={`container ${style.OTP}`} {...animate}>
                        <h5>Opciones de verificación</h5>

                        <div className={style.options}>
                            <div className={style.option}>
                                <h6>Verificación por correo</h6>
                                <OTPInput
                                    value={code}
                                    onChange={(otp: string) => setCode(otp)}
                                    numInputs={6}
                                    renderInput={(props) => <input {...props} />}
                                />
                                <button
                                    className="btn"
                                    disabled={code.length < 6 || loading}
                                    onClick={registerUser}
                                >
                                    {loading ? 'Verificando...' : 'Verificar código'}
                                </button>
                            </div>

                            <div className={style.divider}>o</div>

                            <div className={style.option}>
                                <h6>Continuar sin verificación</h6>
                                <p>Puedes verificar tu correo más tarde</p>
                                <button
                                    className="btn secondary"
                                    onClick={handleSkipVerification}
                                    disabled={loading}
                                >
                                    {loading ? 'Procesando...' : 'Saltar verificación'}
                                </button>
                            </div>
                        </div>

                        {error &&
                            <p className="error">
                                {error}
                            </p>
                        }

                        <button className="close" onClick={close}>
                            cerrar ventana (x)
                        </button>
                    </motion.div>
                )}

                {success && (
                    <motion.div className={`container ${style.Success}`} {...animate}>
                        <img src="/images/registro-exitoso.png" alt="Ilustración de registro exitoso" />
                        <h5>Registro completado</h5>
                        <p>{skipVerification ? 'Puedes verificar tu correo más tarde' : 'Cuenta verificada con éxito'}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default OtpCode;