import Image from 'next/image';
import style from './login.module.scss';
import Google from '@/components/login/Google';
import Apple from '@/components/login/Apple';
import FormLogin from '@/components/login/Form';

const Login = () => {
    return ( 
        <div className='green'>
            <div className="background">
                <div className="body">
                    <div className={`contain ${style.Login}`}>
                        <Image 
                            src={'/images/login-ilustracion.png'}
                            alt='Ilustración inicio de sesión'
                            width={500}
                            height={500}
                        />

                        <h1>Listo para conectar con personas y negocios.</h1>

                        <h2>CREA TU CUENTA TARJET ó <br /> INICIA SESIÓN</h2>

                        <p>
                            Elige la opción de tu agrado <br/>
                            <span>continuar con...</span>
                        </p>

                        <div className={style.LoginButtons}>
                            <Google />
                            <Apple />
                        </div>

                        <hr/>

                        <div className={style.Form}>
                            <FormLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;