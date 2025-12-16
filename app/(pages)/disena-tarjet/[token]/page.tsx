import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import ChristmasEffects from '@/components/ChristmasEffects';

import style from './disena.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import userData from '@/app/api/userData';
import HomeDesign from '@/components/desing-tarjet/HomeDesign';

export const metadata = {
    title: 'Diseña tu tarjet - Tarjet',
    description: 'Diseña tu tarjet - Tarjet',
};

const DisenaTarjet = async () => {

    const session = await getServerSession();

    if (!session) {
        redirect('/login');
    }

    if (session.user?.email === '0') {
        redirect('/login-partners');
    }

    const data = await userData(session.user?.name!);

    return ( 
        <div className='green'>
            <ChristmasEffects />
            <div className="background">
                <div className={`body ${style.DesignTarjet}`}>
                    <div className="contain">
                        <div className={style.Head}>
                            <Image 
                                src={'/images/ilustracion-disena.png'}
                                alt='Ilustración diseña tu tarjet'
                                width={500}
                                height={500}
                                unoptimized
                            />

                            <h1>Gracias por pertenecer a esta gran comunidad</h1>

                            <p>La información de esta sección te ayudará a establecer relaciones comerciales con otros usuarios tarjet en nuestro directorio empresarial</p>

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

                        <HomeDesign uuid={session.user?.name!}/>

                        <Link href={`/mi-perfil/${btoa(data.TokenId)}`} className={style.BtnReturn}>
                            guardar y regresar a perfil (x)
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DisenaTarjet;