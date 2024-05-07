import Link from 'next/link';
import style from './alta.module.scss';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import FormCreateUser from '@/components/partners/FormCreateUser';


export const metadata = {
    title: 'Alta usuario - Tarjet',
    description: 'Alta usuario - Tarjet',
};

const PageAltaUser = async () => {

    const session = await getServerSession();

    if (!session) {
        redirect('/login-partners');
    }

    if (session.user?.email !== '0') {
        redirect('/login');
    }

    return ( 
        <div className='green'>
            <div className="background">
                <div className="body">
                    <div className={`contain ${style.AltaUser}`}>
                        <h1>Bienvenido</h1>
                        <h2>Dar de alta usuario tarjet</h2>

                        <FormCreateUser uuid={session.user?.name!}/>

                        <Link href={`/perfil-partner/${session.user?.name}`}>
                            Regresar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageAltaUser;