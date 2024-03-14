'use client';

import AppleLogin from 'react-apple-login';
import Image from 'next/image';

const Apple = () => {
    return ( 
        <AppleLogin 
            clientId="site.tarjet.client"
            redirectURI="https://tarjet.site"
            state='origin:web'
            scope = "name email"
            responseType={"code"} 
            responseMode={"query"}  
            // callback={HandleAppleLogin}
            // onError={(error) => console.error(error)}
            // usePopup={true}
            render={(props) => (
                <button >
                    <Image 
                        src={'/images/icono-apple.svg'}
                        alt='icono apple'
                        width={200}
                        height={200}
                    />
                    Apple
                </button>
            )}
        />
    );
}

export default Apple;