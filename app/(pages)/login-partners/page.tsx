import Image from 'next/image';
import style from './partners.module.scss';
import FormPartners from '@/components/login-partners/FormPartners';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export const metadata = {
    title: 'Login partners - Tarjet',
    description: 'Login partners - Tarjet',
};

const PageLoginPartners = async () => {

    const session = await getServerSession();

    if (session) {
        redirect(`/perfil-partner/${session.user?.name}`);
    }

    return ( 
        <div className="green">
            <div className="background">
                <div className="body">
                    <div className={`contain ${style.PartnersLogin}`}>
                        <Image 
                            src={'/images/login-ilustracion.png'}
                            alt='Ilustracion de login'
                            width={600}
                            height={600}
                        />
                        <h1>Diseñadores tarjet</h1>
                        <hr/>

                        <FormPartners />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageLoginPartners;