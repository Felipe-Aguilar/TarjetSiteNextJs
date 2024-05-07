import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import style from './microsite.module.scss';
import userData from '@/app/api/userData';
import Image from 'next/image';
import Link from 'next/link';
import EditServices from '@/components/design-microsite/EditServices';

export const metadata = {
    title: 'Diseña tu micro sitio - Tarjet',
    description: 'Diseña tu micro sitio - Tarjet',
};

const MicroSitePage = async () => {

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
            <div className="background">
                <div className={`body ${style.MicroSite}`}>
                    <div className="contain">
                        <div className={style.Head}>
                            <Image 
                                src={'/images/ilustracion-micrositio.png'}
                                alt='Ilustración de micrositio'
                                width={1000}
                                height={1000}
                            />
                            <h1>Tu Micro Sitio Web</h1>
                            <p>Un espacio para describir tus servicios con imágenes ilustrativas.</p>
                            <Link href={`/mi-perfil/${btoa(data.TokenId)}`}>
                                <Image 
                                    src={'/images/icono-mi-perfil.svg'}
                                    alt='icono mi perfil'
                                    width={150}
                                    height={150}
                                />
                                Mi perfil
                            </Link>
                        </div>

                        <div className={style.Design}>
                            <h2>Escribe / edita tus servicios</h2>
                        </div>

                        <hr/>

                        <EditServices userData={data}/>

                        <Link href={`/mi-perfil/${btoa(data.TokenId)}`} className={style.BtnReturn}>
                            guardar y regresar a perfil (x)
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MicroSitePage;