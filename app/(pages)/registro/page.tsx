import Image from 'next/image';
import style from '../login/login.module.scss';
import FormLogin from '@/components/login/Form';
import Google from '@/components/login/Google';
import Apple from '@/components/login/Apple';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const SignUp = async () => {

    const session = await getServerSession();

    if (session) {
        redirect(`/mi-perfil/${btoa(session!.user!.email!)}`);
    }

    return ( 
        <div className="green">
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

                        <span>ó regístrate con:</span>

                        <div className={style.LoginButtons}>
                            <Google />
                            <Apple />
                        </div>

                        <div className={style.SignUp}>
                            <span>Al iniciar sesión aceptas nuestras políticas de privacidad</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;