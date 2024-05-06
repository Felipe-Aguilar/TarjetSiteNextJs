import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import style from './perfil.module.scss';
import Link from 'next/link';
import SignOutSession from '@/components/login-partners/SignOutSession';

export const metadata = {
    title: 'Perfil partner - Tarjet',
    description: 'Perfil partner - Tarjet',
};

const options = [
    {name: 'Alta usuarios', pathname: 'alta-usuario', color: '#d2dfe5'},
    {name: 'Ver mis registros', pathname: 'mis-registros', color: '#c1e0c9'},
]

const PagePerfilPartner = async () => {

    const session = await getServerSession();

    if (!session) {
        redirect('/login-partners');
    }

    return ( 
        <div className="green">
            <div className="background">
                <div className="body">
                    <div className={`contain ${style.PerfilPartner}`}>
                        <h1>Perfil partner</h1>

                        <div className={style.Buttons}>
                            { options.map((option)=>(
                                <Link href={`${option.pathname}/${session.user?.name}`} key={option.name} className='btn' style={{background: option.color}}>
                                    {option.name}
                                </Link>
                            )) }

                            <SignOutSession />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PagePerfilPartner;