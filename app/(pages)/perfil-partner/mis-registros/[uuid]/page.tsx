import { getServerSession } from 'next-auth';
import style from './registros.module.scss';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const usuarios = [
    {id: 1, nombre: 'Felipe', negocio: 'TekRobot', fecha: '06-12-2023', correo: 'correo@co.com', password: '1234AA'},
    {id: 2, nombre: 'Felipe', negocio: 'TekRobot', fecha: '06-12-2023', correo: 'correo@co.com', password: '1234AA'},
    {id: 3, nombre: 'Felipe', negocio: 'TekRobot', fecha: '06-12-2023', correo: 'correo@co.com', password: '1234AA'},
    {id: 4, nombre: 'Felipe', negocio: 'TekRobot', fecha: '06-12-2023', correo: 'correo@co.com', password: '1234AA'},
]

const PageRegistros = async () => {

    const session = await getServerSession();

    if (!session) {
        redirect('/login-partners');
    }

    if (session.user?.email !== '0') {
        redirect('/login');
    }

    return ( 
        <div className="green">
            <div className="background">
                <div className="body">
                    <div className={style.RegistrosUsers}>
                        <h1>Registro de mis usuarios</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>Num</th>
                                    <th>Nombre</th>
                                    <th>Negocio</th>
                                    <th>Premium desde</th>
                                    <th>Correo</th>
                                    <th>Contraseña</th>
                                </tr>
                            </thead>
                            <tbody>
                                { usuarios.map((usuario)=>(
                                    <tr key={usuario.id} style={usuario.id % 2 == 0 ? {background: '#f3f3f3'} : {background: '#fff'}}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.negocio}</td>
                                        <td>{usuario.fecha}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.password}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>

                        <Link href={`/perfil-partner/${session.user?.name}`}>
                            Regresar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageRegistros;