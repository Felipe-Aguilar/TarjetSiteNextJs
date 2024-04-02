import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import style from './mytarjet.module.scss';
import userData from '@/api/userData';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/mytarjet/Card';

const MyTarjet = async () => {

    const session = await getServerSession();

    if (!session) {
        redirect('/login');
    }

    const data = await userData(session.user!.name!);

    return ( 
        <div className="green">
            <div className="background">
                <div className={`body ${style.MyTarjet}`}>
                    <div className="contain">
                        <div className={style.Head}>
                            <Image 
                                src={'/images/portada.webp'}
                                alt='Portada de tarjetero'
                                width={1200}
                                height={1200}
                            />

                            <Link href={`/mi-perfil/${btoa(data.TokenId)}`}>
                                <Image 
                                    src={'/images/icono-mi-perfil.svg'}
                                    alt='Icono mi perfil'
                                    width={150}
                                    height={150}
                                />
                                Mi perfil
                            </Link>
                        </div>

                        <div className={style.Title}>
                            <h1>Hola {data.Nom}</h1>
                            <h2>Bienvenido a tu <span>Tarjetero Tarjet</span></h2>
                        </div>

                        {(data.RegistroTarjet && data.ImgTarFrente) && (
                            <div className={style.Card}>
                                <Card image={data.ImgTarFrente} token={data.TokenId}/>
                            </div>
                        )}

                        {data.RegistroTarjet ? (
                            <div className={style.ButtonsShare}>
                                <Link href={'/directorio-tarjet'}>
                                    <Image 
                                        src={'/images/btn-directorio.svg'}
                                        alt='icono botón directorio'
                                        width={150}
                                        height={150}
                                    />

                                    Directorio
                                </Link>

                                <Link href={`/mi-perfil/${btoa(data.TokenId)}`}>
                                    <Image 
                                        src={'/images/btn-crea.svg'}
                                        alt='icono botón crea tu tarjet'
                                        width={150}
                                        height={150}
                                    />

                                    Crea tarjet
                                </Link>
                            </div>
                        ) : (
                            <div>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyTarjet;