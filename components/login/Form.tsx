'use client';

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OtpCode from "../pop-ups/OtpCode";

const FormLogin = () => {

    const router = useRouter();

    const [view, setView] = useState<boolean>(false);
    const [accept, setAccept] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);


    // * Comprueba si la sesión ya está iniciada.
    useEffect(()=>{
        const storageData = localStorage.getItem('SessionData');
        const data = storageData ? JSON.parse(storageData) : null;

        if (data) redirect(`/mi-perfil/${btoa(data.Token)}`);
    },[]);

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

        if (error.length > 0) {
            setNotSubmit('Falta uno o más campos por llenar');
            return; 
        }

        const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/Login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                "Cuenta": email,
                "Password": password,
            })
        });

        const data = await response.json();

        if (!data.Acceso) {
            setNotSubmit('Correo o contraseña incorrectos');
            return;
        }

        setNotSubmit('');
        localStorage.setItem('SessionData', JSON.stringify(data));
        router.push(`/${btoa(data.Token)}`);
    }

    // * Registrar Usuario
    const [otpSend, setOtpSend] = useState<boolean>(false);

    const registerUser = async () => {
        if (error.length > 0) {
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

            <form onSubmit={onSubmitForm}>
                <input 
                    type="email" 
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value.trim())}
                    onBlur={onBlurEmail}
                />

                <div>
                    <input 
                        type={view ? 'text' : 'password'} 
                        placeholder="Escribe tu contraseña"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value.trim())}
                        onBlur={onBlurPassword}
                    />

                    <button type="button" onClick={()=>setView(!view)}>
                        {view ? <img src="/images/icono-ojo-cerrado.svg" alt="icono" /> 
                        : <img src="/images/icono-ojo.svg" alt="icono" />}
                    </button>
                </div>

                <button className="link">
                    ¿Olvidaste tu contraseña?
                </button>

                { error &&
                    <div className="error">
                        { error.map((e)=>(
                            <p key={e}>{e}</p>
                        ))}
                    </div>
                }

                <hr style={{borderColor: '#000', marginBottom: '16px'}}/>

                <div className="check">
                    <input 
                        type="checkbox" 
                        id="accept" 
                        checked={accept} 
                        onChange={(e)=>setAccept(e.target.checked)}
                    />

                    <label htmlFor="accept">
                        Acepto las condiciones de uso y la <Link href={'/aviso-de-privacidad'}>política de privacidad</Link>
                    </label>
                </div>

                { notSubmit &&
                    <div className="error">
                        <p>{notSubmit}</p>
                    </div>
                }

                <div className="twoButtons">

                    <div>
                        <button 
                            className="btn" 
                            style={{background: '#fdc40a'}}
                            disabled={!accept}
                            type="button"
                            onClick={registerUser}
                        >
                            Registrar
                        </button>
                    </div>

                    <div style={{ borderLeft: '1px solid #000'}}>
                        <button 
                            className="btn"
                            disabled={!accept}
                            type="submit"
                        >
                            Iniciar sesión
                        </button>
                    </div>

                </div>
            </form>
        </>
    );
}

export default FormLogin;