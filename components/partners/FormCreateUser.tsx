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

    // *Subir formulario 
    const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errorMessage = 'Uno de los campos se encuentra vacío, por favor intente nuevamente';

        if (!name || !paternal || !email || !password) {
            if (error.find(message => message === errorMessage)) {
                return;
            }

            setError([...error, errorMessage]);
            return; 

        }else{
            const updateError = error.filter(message => message != errorMessage);
            setError(updateError);
        }

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

        if (data.usuId) {
            setTimeout(()=>{
                setSuccess(true);

                setTimeout(()=>{
                    router.replace(`/perfil-partner/${uuid}`);
                }, 3500)
            }, 1000)
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
        }else{
            const updateError = error.filter(message => message != errorMessage);
            setError(updateError);
        }
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
                        maxLength={15}
                        value={name}
                        onChange={(e)=>setName(e.target.value.trim())}
                    />
                </div>

                <div className='two'>
                    <input 
                        type="text" 
                        placeholder='Apellido Paterno (15 caracteres)'
                        maxLength={15}
                        value={paternal}
                        onChange={(e)=>setPaternal(e.target.value.trim())}
                    />

                    <input 
                        type="text" 
                        placeholder='Apellido Materno (15 caracteres)'
                        maxLength={15}
                        value={maternal}
                        onChange={(e)=>setMaternal(e.target.value.trim())}
                    />
                </div>

                <input 
                    type="text" 
                    placeholder='Correo' 
                    maxLength={30}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value.trim())}
                />
                <input 
                    type="text" 
                    placeholder='Contraseña' 
                    maxLength={30}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value.trim())}
                    onBlur={onBlurPassword}
                />

                { error && (
                    <div className='error'>
                        {error.map((err)=>(
                            <p key={err}>{err}</p>
                        ))}
                        {/* <p>{error}</p> */}
                    </div>
                )}

                <button className='btn' type='submit' style={{marginTop: '16px'}}>
                    Registrar usuario
                </button>

            </form>
            
            { success && <NewUserPartner /> }
        </Fragment>
    );
}

export default FormCreateUser;