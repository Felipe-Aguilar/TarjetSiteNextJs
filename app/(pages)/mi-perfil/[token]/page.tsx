
import userData from "@/api/userData";
import style from './perfil.module.scss';
import Image from "next/image";
import Link from "next/link";
import ButtonsPerfil from "@/components/perfil/ButtonsPerfil";

const MiPerfil = async () => {

    // TODO: Implementar autenticación de ruta y redireccionamiento.

    const data = await userData();

    return ( 
        <div className="green">
            <div className="background">
                <div className="body">
                    <div className={`contain ${style.Perfil}`}>
                        <div className={style.HeaderUser}>
                            <div className={style.Image}>
                                <Image 
                                    src={data?.ImgFoto
                                        ? `https://tarjet.site/imagenes/perfil-imagenes/${data.ImgFoto}`
                                        : '/images/perfil-temporal.webp'
                                    }
                                    alt="Imagen de perfil"
                                    width={500}
                                    height={500}
                                />
                            </div>
                            <div className={style.Info}>
                                <h1>Bienvenido a tu perfil</h1>
                                <h2>{`${data?.Nom} ${data?.AppP} ${data?.AppM}`}</h2>
                            </div>
                        </div>

                        <div className={style.Buttons}>
                            <Link href={`disena-tu-tarjet/${btoa(data.TokenId)}`} className={style.first}>
                                Cambiar foto
                            </Link>

                            <Link href={`disena-tu-tarjet/${btoa(data.TokenId)}`} className={style.second}>
                                Editar nombre de usuario
                            </Link>
                        </div>

                        <p>Miembro desde: {data.RegistroFecha}</p>

                        <hr/>

                        <ButtonsPerfil />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiPerfil;