'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const FormPartners = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

    // *Password
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

    // *Subir formulario
    const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorMessage = 'Falta uno o más campos por llenar';
        
        if (email.length === 0 || password.length === 0) {
            const repeat = error.find(message => message === errorMessage);

            if (repeat) return;

            setError([...error, errorMessage]);
            return;
        }

        const updateError = error.filter(message => message != errorMessage);
        setError(updateError);

        const response = await fetch('https://souvenir-site.com/WebTarjet/APIPartner/LoginPartner', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "Cuenta" : email,
                "Password" : password
            })
        });

        const data = await response.json();

        if (!data.Acceso) {
            const errorMessage = 'Usuario o contraseña incorrectos';
            const repeat = error.find(message => message === errorMessage);

            if (repeat) return;

            setError([...error, errorMessage]);
            return;
        }

        const usuId = await data.PartnerUUID;
        const token = '0';

        await signIn('credentials', { usuId, token, callbackUrl: '/login-partners'});

    }

    return ( 
        <form onSubmit={SubmitForm}>
            <input type="text" placeholder="correo / teléfono" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <div>
                <input 
                    type={viewPassword ? 'text' : 'password'} 
                    placeholder="contraseña" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value.trim())}
                    onBlur={onBlurPassword}
                />
                <button type="button" onClick={()=>setViewPassword(!viewPassword)}>
                    { viewPassword  
                        ? <img src="/images/icono-ojo.svg" alt="icono ojo" />
                        : <img src="/images/icono-ojo-cerrado.svg" alt="icono ojo" />
                    }
                </button>
            </div>
            <Link href={'/contacto'}>
                ¿Olvidaste tu contraseña?
            </Link>

            { error && (
                error.map((message)=>(
                    <p key={message}>{message}</p>
                ))
            ) }

            <hr/>

            <button className="btn" type="submit">
                Iniciar sesión 
            </button>
        </form>
    );
}

export default FormPartners;