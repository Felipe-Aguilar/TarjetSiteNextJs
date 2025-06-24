'use client';

import { Fragment, useEffect, useState } from 'react';
import style from './form.module.scss';
import { ListPrefixInterface } from '@/interfaces/design-tarjet/listPrefix-interface';
import NewUserPartner from '../pop-ups/new-user-partner/NewUserPartner';
import { useRouter } from 'next/navigation';

interface Props {
    uuid: string
}

const FormCreateUser = ({uuid}: Props) => {
    const router = useRouter();

    const [prefixList, setPrefixList] = useState<ListPrefixInterface>();
    const [prefix, setPrefix] = useState<string>('Barbero');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(()=>{
        const getPrefixList = async () => {
            const response = await fetch('https://souvenir-site.com/WebTarjet/APICatalogos/ListaTitulos',{
                method: 'GET',
                mode: 'cors',
            });

            const data = await response.json();
            setPrefixList(data);
        }

        getPrefixList();
    },[]);

    const [name, setName] = useState<string>('');
    const [paternal, setPaternal] = useState<string>('');
    const [maternal, setMaternal] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string[]>([]);
    const [success, setSuccess] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');

    // Validar si el correo ya existe
    const checkEmailExists = async (email: string) => {
        try {
            const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/EnviarCodigoOTP?Nombre=&Email=' + email, {
                method: 'GET',
                mode: 'cors'
            });
            
            const data = await response.json();
            
            if (data.Mensaje && data.Mensaje.includes("ya se encuentra en nuestro sistema")) {
                setEmailError(data.Mensaje);
                setTimeout(() => {
                    setEmailError('');
                }, 5000);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Error al verificar correo:", err);
            return false;
        }
    };

    // *Subir formulario 
    const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError('');

        // Validar campos vacíos
        const emptyFieldMessage = 'Uno de los campos se encuentra vacío, por favor intente nuevamente';
        if (!name || !paternal || !email || !password) {
            if (!error.find(message => message === emptyFieldMessage)) {
                setError([...error, emptyFieldMessage]);
            }
            return;
        } else {
            setError(error.filter(message => message != emptyFieldMessage));
        }

        // Validar si el correo existe
        const emailExists = await checkEmailExists(email);
        if (emailExists) return;

        // Validar contraseña
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            const passwordMessage = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números (sin caracteres especiales).';
            if (!error.find(message => message === passwordMessage)) {
                setError([...error, passwordMessage]);
            }
            return;
        }

        // Enviar formulario si todo está correcto
        const response = await fetch('https://souvenir-site.com/WebTarjet/APIPartner/CrearCuenta', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "RegistroUsu": {
                    "Nombre": name,
                    "ApellidoPat": paternal,
                    "ApellidoMat": maternal,
                    "Codigo": "",
                    "Correo": email,
                    "Password": password,
                    "PartnerUUID": uuid,
                    "TipoAut": "",
                    "Titulo": prefix,
                }
            })
        });

        const data = await response.json();

        if (data.usuId && data.usuId !== "00000000-0000-0000-0000-000000000000") {
            setTimeout(()=>{
                setSuccess(true);
                setTimeout(()=>{
                    router.replace(`/perfil-partner/${uuid}`);
                }, 3500)
            }, 1000)
        } else if (data.Mensaje) {
            setEmailError(data.Mensaje);
        }
    }

    // *Analisar contraseña
    const onBlurPassword = () => {
        const errorMessage = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.';
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!regex.test(password)) {
            const repeat = error.find(message => message === errorMessage);
            if (repeat) return;
            setError([...error, errorMessage]);
        } else {
            setError(error.filter(message => message != errorMessage));
        }
    }

    // Validar email al perder foco
    const onBlurEmail = async () => {
        await checkEmailExists(email);
    }

    return ( 
        <Fragment>
            <form className={style.FormCreateUser} onSubmit={SubmitForm}>
                <div className={style.PrefixContainer}>
                    <div>
                        <span>Prefijo</span>
                        <select 
                            style={{borderRadius: '8px'}}
                            onChange={(e)=>setPrefix(e.target.value)}
                        >
                            {prefixList?.sdtTitulos.map((prefix)=>(
                                <option value={prefix.TituloPersonaId} key={prefix.TituloPersonaId}>{prefix.TituloPersonaDesc}</option>
                            ))}
                        </select>
                    </div>

                    <input 
                        type="text" 
                        placeholder='Empresa o tú Nombre (15 caracteres)'
                        maxLength={30}
                        value={name}
                        onChange={(e)=>setName(e.target.value.trim())}
                    />
                </div>

                <div className='two'>
                    <input 
                        type="text" 
                        placeholder='Apellido Paterno (30 caracteres)'
                        maxLength={30}
                        value={paternal}
                        onChange={(e)=>setPaternal(e.target.value.trim())}
                    />

                    <input 
                        type="text" 
                        placeholder='Apellido Materno(30 caracteres)'
                        maxLength={30}
                        value={maternal}
                        onChange={(e)=>setMaternal(e.target.value.trim())}
                    />
                </div>

                <input 
                    type="text" 
                    placeholder='Correo' 
                    maxLength={45}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value.trim())}
                    onBlur={onBlurEmail}
                />
                {emailError && (
                    <div className='error'>
                        <p>{emailError}</p>
                    </div>
                )}

                <div className={style.PasswordContainer}>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Contraseña' 
                        maxLength={45}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value.trim())}
                        onBlur={onBlurPassword}
                    />

                    <button 
                        type="button" 
                        className={style.TogglePassword} 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        )}
                    </button>

                </div>

                

                {error.length > 0 && (
                    <div className='error'>
                        {error.map((err)=>(
                            <p key={err}>{err}</p>
                        ))}
                    </div>
                )}

                <button className='btn' type='submit' style={{marginTop: '16px'}}>
                    Registrar usuario
                </button>
            </form>
            
            {success && <NewUserPartner />}
        </Fragment>
    );
}

export default FormCreateUser;