'use client';

import Link from "next/link";
import { useState } from "react";

const FormLogin = () => {

    const [view, setView] = useState<boolean>(false);
    const [accept, setAccept] = useState<boolean>(false);
    const [error, setError] = useState<Set<string>>(new Set());

    // * Email
    const [email, setEmail] = useState<string>('');

    const onBlurEmail = () => {
        const errorMessage = 'Introduce una dirección de correo válida';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            if (!error.has(errorMessage)) {
                // const updateError = new Set([...error, errorMessage]);
                // setError(updateError);
            }
        }else{
            // const updateError = error.filter(message => message != 'Introduce una dirección de correo válida');
            // setError(updateError);
        }
    }


    return ( 
        <form>
            <input 
                type="email" 
                placeholder="Correo electrónico"
                value={email}
                onChange={(e)=>setEmail(e.target.value.trim())}
                onBlur={onBlurEmail}
            />

            <div>
                <input type={view ? 'text' : 'password'} placeholder="Escribe tu contraseña"/>

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
                    {/* { error.map((e)=>(
                        <p key={e}>{e}</p>
                    ))} */}
                </div>
            }

            <hr style={{borderColor: '#000', marginBottom: '16px'}}/>

            <div className="check" style={{width: '50%', margin: 'auto'}}>
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

            <div style={{display: 'flex', justifyContent: 'center'}}>

                <div style={{width: '35%'}}>
                    <button 
                        className="btn" 
                        style={{background: '#fdc40a'}}
                        disabled={!accept}
                    >
                        Registrar
                    </button>
                </div>

                <div style={{width: '35%', borderLeft: '1px solid #000'}}>
                    <button 
                        className="btn"
                        disabled={!accept}
                    >
                        Iniciar sesión
                    </button>
                </div>

            </div>
        </form>
    );
}

export default FormLogin;