import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ChristmasEffects from '@/components/ChristmasEffects';

import Image from 'next/image';
import style from './login.module.scss';
import Google from '@/components/login/Google';
import Apple from '@/components/login/Apple';
import FormLogin from '@/components/login/Form';
import Link from 'next/link';


export const metadata = {
    title: 'Login - Tarjet',
    description: 'Login - Tarjet, inicia sesión y construye tu propia tarjeta digital',
};

const Login = async () => {

    const session = await getServerSession();

    if (session) {
        redirect(`/${btoa(session!.user!.email!)}`);
    }

    return ( 
        <div className='green'>
            <ChristmasEffects />
            <div className="background">
                <div className="body">
                    <div className={`contain ${style.Login}`}>
                        <Image 
                            src={'/images/login-ilustracion.png'}
                            alt='Ilustración inicio de sesión'
                            width={500}
                            height={500}
                        />

                        <div className={style.Form}>
                            <FormLogin />
                        </div>

                        <span>ó inicia sesión con:</span>

                        <div className={style.LoginButtons}>
                            <Google />
                            <Apple />
                        </div>

                        <div className={style.SignUp}>
                            <Link href={'/registro'}>
                                Regístrate Gratis
                            </Link>

                            <span>Al iniciar sesión aceptas nuestras políticas de privacidad</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;