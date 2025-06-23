'use client';

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import OtpCode from "../pop-ups/otp/OtpCode";
import style from '../pop-ups/otp/otp.module.scss';

const FormLogin = () => {

    const pathname = usePathname();
    const [view, setView] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

    // * Email
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        return "El correo electrónico es requerido";
    }
    
    if (!emailRegex.test(email)) {
        return "Introduce una dirección de correo válida (ejemplo: usuario@dominio.com)";
    }
    
    return "";
    };

    const onBlurEmail = () => {
    setEmailError(validateEmail(email));
    };

    // * Password
    const [password, setPassword] = useState<string>('');
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const validatePassword = (pass: string) => {
    const errors: string[] = [];
    
    if (pass.length < 8) {
        errors.push("La contraseña debe tener al menos 8 caracteres");
    }
    
    if (!/[A-Za-z]/.test(pass)) {
        errors.push("Debe incluir al menos una letra");
    }
    
    if (!/\d/.test(pass)) {
        errors.push("Debe incluir al menos un número");
    }
    
    if (/[^A-Za-z\d]/.test(pass)) {
        errors.push("Solo se permiten letras y números (sin caracteres especiales)");
    }
    
    setPasswordErrors(errors);
    return errors.length === 0;
    };

    const onBlurPassword = () => {
    validatePassword(password);
    };

    // * Submit formulario
    const [notSubmit, setNotSubmit] = useState<string>('');
    
    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (error.length > 0 || !email || !password) {
            setNotSubmit('Falta uno o más campos por llenar');
            return; 
        }

        const response = await fetch("https://souvenir-site.com/WebTarjet/APIUsuDtos/Login", {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify({
                "Cuenta": email,
                "Password": password
            }),
        });

        const data = await response.json();

        if (!data.Acceso) {
            setNotSubmit('Correo o contraseña incorrectos');
            return;
        }

        setNotSubmit('');
        const usuId = await data.usuId;
        const token = await data.Token;

        console.log(data, usuId, token);

        await signIn('credentials', { usuId, token, callbackUrl: '/login'});
    }

    // * Registrar Usuario
    const [otpSend, setOtpSend] = useState<boolean>(false);

    const registerUser = async () => {
        if (error.length > 0 || !email || !password) {
            setNotSubmit('Falta uno o más campos por llenar');
            return;
        }

        setNotSubmit('');
        setOtpSend(true);
    }

    return ( 
        <>
            {otpSend && 
                <OtpCode email={email} password={password} close={() => setOtpSend(false)}/>
            }

            { pathname == '/login' && <h1>Inicia Sesión en Tarjet</h1> }
            { pathname == '/registro' && <h1>Regístrate en Tarjet</h1> }
            

            <form onSubmit={onSubmitForm}>
                <input 
                    type="email" 
                    placeholder="correo / teléfono"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value.trim())}
                    onBlur={onBlurEmail}
                />

                <div>
                    <input 
                        type={view ? 'text' : 'password'} 
                        placeholder="contraseña"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value.trim())}
                        onBlur={onBlurPassword}
                    />

                    <button type="button" onClick={()=>setView(!view)}>
                        {view ? <img src="/images/icono-ojo-cerrado.svg" alt="icono" /> 
                        : <img src="/images/icono-ojo.svg" alt="icono" />}
                    </button>
                </div>

                {emailError && (
                    <div className="input-error">
                        <span className="error-icon">⚠</span>
                        {emailError}
                    </div>
                )}

                {passwordErrors.length > 0 && (
                    <div className={style.passworderrors}>
                        <h4>Requisitos de contraseña:</h4>
                        <ul>
                        {passwordErrors.map((error, index) => (
                            <li key={index} className={password.length === 0 ? 'neutral' : 'error'}>
                            {error}
                            </li>
                        ))}
                        </ul>
                    </div>
                )}

                <button className="link" style={{display: 'block'}}>
                    ¿Olvidaste tu contraseña?
                </button>

                { error &&
                    <div className="error">
                        { error.map((e)=>(
                            <p key={e}>{e}</p>
                        ))}
                    </div>
                }

                { notSubmit &&
                    <div className="error">
                        <p>{notSubmit}</p>
                    </div>
                }

                <div style={{justifyContent: 'end'}}>
                    {pathname == '/login' && (
                        <button 
                            className="btn"
                            type="submit"
                            style={{margin: '0'}}
                        >
                            Iniciar sesión
                        </button>
                    )}
                    {pathname == '/registro' && (
                        <button 
                            className="btn" 
                            style={{background: '#f58634'}}
                            type="button"
                            onClick={registerUser}
                        >
                            Registrar
                        </button>
                    )}
                </div>

            </form>
        </>
    );
}

export default FormLogin;