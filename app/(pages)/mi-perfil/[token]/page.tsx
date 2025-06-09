import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import userData from "@/app/api/userData";
import style from './perfil.module.scss';
import Image from "next/image";
import Link from "next/link";
import ButtonsPerfil from "@/components/perfil/ButtonsPerfil";


export const metadata = {
    title: 'Mi perfil - Tarjet',
    description: 'Mi perfil - Tarjet',
};

const MiPerfil = async () => {

    const session = await getServerSession();

    if (!session) {
        redirect('/login');
    }

    if (session.user?.email === '0') {
        redirect('/login-partners');
    }

    const data = await userData(session.user!.name!);

    const fecha = new Date(data.RegistroFecha);
    const fechaformatted = fecha.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    return ( 
        <div className="green">
            <div className="background">
                <div className="body">
                    <div className={`contain ${style.Perfil}`}>
                        <div className={style.HeaderUser}>
                            <div className={style.Image}>
                                <Image 
                                    src={data?.ImgFoto
                                        ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/ImgPerf/${data.ImgFoto}?timestamp=${Date.now()}`
                                        : '/images/perfil-temporal.webp'
                                    }
                                    alt="Imagen de perfil"
                                    width={500}
                                    height={500}
                                    unoptimized
                                />
                            </div>
                            <div className={style.Info}>
                                <h1>Bienvenido a tu perfil</h1>
                                <h2>{`${data?.Nom} ${data?.AppP} ${data?.AppM}`}</h2>
                            </div>
                        </div>

                        <div className={style.Buttons}>
                            <Link href={`/disena-tarjet/${btoa(data.TokenId)}`} className={style.first}>
                                Cambiar foto
                            </Link>

                            <Link href={`/disena-tarjet/${btoa(data.TokenId)}`} className={style.second}>
                                Editar nombre de usuario
                            </Link>
                        </div>

                        <p>Miembro desde: {fechaformatted}</p>
                        

                        <hr/>

                        <ButtonsPerfil token={data.TokenId} uuid={data.UUID}/>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiPerfil;