'use client';

import { signOut } from 'next-auth/react';

const SignOutSession = () => {
    return ( 
        <button className='btn' onClick={()=>signOut({callbackUrl: '/login-partners'})}>
            Cerrar sesión
        </button>
    );
}

export default SignOutSession;