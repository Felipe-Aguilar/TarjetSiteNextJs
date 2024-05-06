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
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    // *Subir formulario 
    const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !paternal || !maternal || !email || !password) {
            setError('Uno de los campos se encuentra vacío, por favor intente nuevamente');
            return; 
        }

        setError('');
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
                                <option value={prefix.TituloPersonaDesc} key={prefix.TituloPersonaId}>{prefix.TituloPersonaDesc}</option>
                            ))}
                        </select>
                    </div>

                    <input 
                        type="text" 
                        placeholder='Empresa o tú Nombre (10 caracteres)'
                        maxLength={10}
                        value={name}
                        onChange={(e)=>setName(e.target.value.trim())}
                    />
                </div>

                <div className='two'>
                    <input 
                        type="text" 
                        placeholder='Apellido Paterno (10 caracteres)'
                        maxLength={10}
                        value={paternal}
                        onChange={(e)=>setPaternal(e.target.value.trim())}
                    />

                    <input 
                        type="text" 
                        placeholder='Apellido Materno (10 caracteres)'
                        maxLength={10}
                        value={maternal}
                        onChange={(e)=>setMaternal(e.target.value.trim())}
                    />
                </div>

                <input 
                    type="text" 
                    placeholder='Correo' 
                    maxLength={25}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value.trim())}
                />
                <input 
                    type="text" 
                    placeholder='Contraseña' 
                    maxLength={30}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value.trim())}
                />

                { error && (
                    <div className='error'>
                        <p>{error}</p>
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