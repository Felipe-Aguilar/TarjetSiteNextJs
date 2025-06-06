import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import style from './mytarjet.module.scss';
import userData from '@/app/api/userData';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/mytarjet/Card';
import ButtonsShare from '@/components/mytarjet/ButtonsShare';
import MyTarjetSearch from '@/components/mytarjet/MyTarjetSearch';
import { useParams, useSearchParams } from 'next/navigation'; // Para componentes client-side
import ToggleableAnalyticsChart from '@/components/analytics/ToggleableAnalyticsChart';
// O para server components:


export const metadata = {
    title: 'Mi tarjetero - Tarjet',
    description: 'Mi tarjetero tarjet',
};

const MyTarjet = async ({ params }: { params: { token: string } }) => {
    const urlToken = params.token;
    const session = await getServerSession();
    console.log(params)

    if (!session) {
        redirect('/login');
    }

    if (session.user?.email === '0') {
        redirect('/login-partners');
    }

    const data = await userData(session.user!.name!);

    const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaTarjetero/?Usutarjetid=${data.UUID}`, {
        method: 'GET',
        mode: 'cors'
    });

    const responseTarjets = await response.json();

    const dataTarjets = await responseTarjets.SDTTarjetsG;

    return ( 
        <div className="greenWhite">
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

                        {(!data.RegistroTarjet || !data.ImgTarFrente) ? (
                            <div className={style.Links}>
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
                            <div className={style.ButtonsShare}>
                                <ButtonsShare token={data.TokenId}/>
                            </div>
                        )}
                        
                        <ToggleableAnalyticsChart token={urlToken} />

                        <div className={style.TarjetTitle}>
                            <h3>Tu tarjetero</h3>
                            <p>Actualmente tienes <span>{dataTarjets.length}</span> Tarjets</p>
                        </div>

                        <MyTarjetSearch uuId={data.UUID}/>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyTarjet;