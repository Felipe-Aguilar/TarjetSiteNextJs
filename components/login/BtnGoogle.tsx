import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BtnGoogle = () => {

    const route = useRouter();

    const login = useGoogleLogin({
        onSuccess: tokenResponse => Register(tokenResponse)
    })

    const Register = async (tokenResponse :any) => {

        const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ValidarCodigoOTP',{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "RegistroUsu": {
                    "Nombre": "",
                    "ApellidoPat": "",
                    "ApellidoMat": "",
                    "Codigo": tokenResponse.access_token,
                    "Correo": "",
                    "Password": "",
                    "TipoAut": "G"
                }
            })
        });

        const data = await response.json();

        if (data.Token) {
            localStorage.setItem('SessionData', JSON.stringify(data));
            route.push(`/${btoa(data.Token)}`);

            return;
        }

        const responseLogin = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/Login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "Cuenta": "",
                "Password": tokenResponse.access_token,
                "tipoLogin": "G"
            })
        });

        const dataLogin = await responseLogin.json();

        if (dataLogin.Token) {
            localStorage.setItem('SessionData', JSON.stringify(dataLogin));

            route.push(`/${btoa(dataLogin.Token)}`);
        }

    }

    return ( 
        <button 
            onClick={()=>login()}
        >
            <Image 
                src={'/images/icono-google.svg'}
                alt='icono google'
                width={200}
                height={200}
            />
            Google
        </button>
    );
}

export default BtnGoogle;