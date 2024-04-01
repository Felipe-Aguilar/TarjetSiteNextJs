'use client';

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import OtpCode from "../pop-ups/OtpCode";

const FormLogin = () => {

    const pathname = usePathname();
    const [view, setView] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

    // * Email
    const [email, setEmail] = useState<string>('');

    const onBlurEmail = () => {
        const errorMessage = 'Introduce una dirección de correo válida';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            const repeat = error.find(message => message === errorMessage);

            if (repeat) return;

            setError([...error, errorMessage]);
        }else{
            const updateError = error.filter(message => message != errorMessage);
            setError(updateError);
        }
    }

    // * Password
    const [password, setPassword] = useState<string>('');

    const onBlurPassword = () => {
        const errorMessage = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.';
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!regex.test(password)) {
            const repeat = error.find(message => message === errorMessage);

            if (repeat) return;

            setError([...error, errorMessage]);
        }else{
            const updateError = error.filter(message => message != errorMessage);
            setError(updateError);
        }
    }

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