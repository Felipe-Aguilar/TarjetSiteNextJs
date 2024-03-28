'use client';

import style from './aviso.module.scss';
import { BsChevronDown } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';


export const metadata = {
    title: 'Aviso de privacidad - Tarjet',
    description: 'Aviso de privacidad ',
};

const Aviso = () => {

    const [open, setOpen] = useState<boolean>();
    const [open2, setOpen2] = useState<boolean>();
    const [open3, setOpen3] = useState<boolean>();
    const [open4, setOpen4] = useState<boolean>();
    const [open5, setOpen5] = useState<boolean>();
    const [open6, setOpen6] = useState<boolean>();

    const variants = {
        open: { height: 'auto'},
        closed: { height: 0 },
    };

    return ( 
        <div className="body">
            <div className={`container ${style.Aviso}`}>
                <h1>Aviso de privacidad</h1>

                <div className={style.container}>
                    <button onClick={()=>setOpen(!open)}>
                        1. ¿Qué es Tarjet?

                        <motion.div animate={open ? {rotate: 180} : {rotate: 0}}>
                            <BsChevronDown />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        { open && (
                            <motion.div 
                                className={style.Text} 
                                initial="closed"
                                animate="open"
                                transition={{duration: 0.6}}
                                exit= "closed"
                                variants={variants}
                            >
                                <p>
                                    Tarjet, “Tu tarjeta de presentación virtual”, con domicilio en Avenida Industria Militar No. 1055, Colonia Lomas de Sotelo, Miguel Hidalgo Ciudad de México, C.P. 11200, está comprometido con la protección de sus datos personales, al ser responsable de su uso, manejo y confidencialidad mediante la continua revisión de nuestros procesos de protección de datos de manera física como electrónica. 
                                </p>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                    <button onClick={()=>setOpen2(!open2)}>
                        2. Datos personales

                        <motion.div animate={open2 ? {rotate: 180} : {rotate: 0}}>
                            <BsChevronDown />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        { open2 && (
                            <motion.div 
                                className={style.Text} 
                                initial="closed"
                                animate="open"
                                transition={{duration: 0.6}}
                                exit= "closed"
                                variants={variants}
                            >
                                <p>
                                    <b>¿Para que fines recabamos y utilizamos sus datos personales?</b>
                                </p>
                                <ul>
                                    <li>Los datos personales que le son recabados serán utilizados para Generar su tarjeta de presentación virtual y mostrarlos a las personas que consulten su información, misma información será ingresada por usted, mediante nuestros formularios.</li>
                                    <li>Sus datos personales serán utilizados para las finalidades necesarias para el servicio y/o producto que solicitó.</li>
                                </ul>
                                <p>
                                    De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio y/o producto solicitado y/o contratado, pero que nos permite brindarle una mejor atención: 
                                </p>
                                <ul>
                                    <li> Informarle de nuevos productos y actualizaciones de Tarjet.</li>
                                    <li>Evaluar la calidad de servicio.</li>
                                </ul>
                                <p>
                                    En caso de que no desee que sus datos personales sean tratados para estos fines adicionales, desde este momento usted lo puede manifestar a través de los siguientes medios: 
                                </p>
                                <ul>
                                    <li>De manera personal en nuestras sucursales</li>
                                    <li>Vía Whatsapp</li>
                                    <li>Vía Correo Electrónico</li>
                                </ul>
                                <p>
                                    La negativa para el uso de sus datos personales para estas finalidades adicionales no podrá ser motivo para que le sean negados los servicios y/o productos que solicita y/o contrata con nosotros. 
                                </p>
                                <p>
                                    <b> ¿Qué datos personales utilizaremos para estos fines y de dónde los obtendremos? </b>
                                </p>
                                <p>
                                    Para las finalidades señaladas en el presente Aviso de Privacidad, podemos recabar sus datos personales de distintas formas: cuando usted nos lo proporciona directamente o cuando obtenemos información a través de otras fuentes que están permitidas por la Ley.
                                </p>
                                <p>
                                    Datos personales que recabamos de forma directa o de fuentes permitidas por la Ley
                                </p>
                                <p>
                                    Algunos de los datos personales que recabamos de forma directa o por otras fuentes permitidas por la Ley son: 
                                    Nombre completo,Dirección / Domicilio.Empresa. Razón Social. Teléfono. Correo Electrónico.
                                </p>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                    <button onClick={()=>setOpen3(!open3)}>
                        3. ¿Cómo puede acceder o cancelar sus datos personales, u oponerse a su uso?

                        <motion.div animate={open3 ? {rotate: 180} : {rotate: 0}}>
                            <BsChevronDown />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        { open3 && (
                            <motion.div 
                                className={style.Text} 
                                initial="closed"
                                animate="open"
                                transition={{duration: 0.6}}
                                exit= "closed"
                                variants={variants}
                            >
                                <p>
                                    La protección de datos personales es un derecho humano que le da a los individuos el poder de controlar la información que comparten con terceros, así como el derecho a que ésta se utilice de forma adecuada, para permitir el ejercicio de otros derechos y evitar daños a su Titular. La Constitución Política de los Estados Unidos Mexicanos, en su artículo 16, en el párrafo II, reconoce el derecho a la protección de sus datos personales como una garantía individual, al señalar que “...Toda persona tiene derecho a la protección de sus datos personales, al acceso, rectificación y cancelación de los mismos, así como a manifestar su oposición en los términos que fije la Ley, la cual establecerá los supuestos de excepción a los principios que rijan el tratamiento de datos, por razones de seguridad nacional, disposiciones de orden público, seguridad y salud públicas o para proteger los derechos de terceros...” En todo momento usted podrá limitar el uso o divulgación de sus datos personales mediante el ejercicio de los derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) que la Ley prevé mediante la presentación de su solicitud por escrito en cualquiera de nuestras Sucursales o en nuestra oficina de Corporativo en la Unidad de Transparencia, cuyo domicilio es Avenida Industria Militar No. 1055, Colonia Lomas de Sotelo, C.P. 11200, Miguel Hidalgo, Ciudad de México, o al correo electrónico <a href='mailto: unidad_transparencia@banjercito.com.mx'>unidad_transparencia@banjercito.com.mx</a>
                                </p>
                                <p>
                                    Derechos ARCO
                                </p>
                                <p>
                                    Todos los Titulares de los datos personales tienen el derecho de Acceder, Rectificar y Cancelar su información personal que esté en posesión de terceros, así como Oponerse a su uso. A ello se le conoce como derechos ARCO. Por lo anterior, se hace de su conocimiento nuestra política de Privacidad y de cómo salvaguardamos la integridad, Privacidad y protección de sus datos personales, en apego a la Ley Federal de Transparencia y Acceso a la Información Pública Gubernamental publicada en el Diario Oficial de la Federación el 14 de julio de 2014.
                                </p>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                    <button onClick={()=>setOpen4(!open4)}>
                        4. ¿Qué es el Aviso de Privacidad?

                        <motion.div animate={open4 ? {rotate: 180} : {rotate: 0}}>
                            <BsChevronDown />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        { open4 && (
                            <motion.div 
                                className={style.Text} 
                                initial="closed"
                                animate="open"
                                transition={{duration: 0.6}}
                                exit= "closed"
                                variants={variants}
                            >
                                <p>
                                    Es el documento físico, electrónico o en cualquier otro formato (como puede ser visual o sonoro) generados por esta Institución que es puesto a disposición del Titular, previo al tratamiento de sus datos personales, de conformidad con lo que establece la Ley.
                                </p>
                                <p>
                                    <b>
                                        ¿Para qué sirve el Aviso de Privacidad?
                                    </b>
                                </p>
                                <p>
                                    El Aviso de Privacidad tiene como propósito principal hacer del conocimiento del Titular de los datos personales que su información personal será recabada y utilizada para ciertos fines, y las características del tratamiento al que serán sometidos sus datos personales. Lo anterior, con el fin legítimo de que el Titular tome sus decisiones informado con relación a sus datos personales y controle el uso de su información personal.
                                </p>
                                <p>
                                    <b>
                                        ¿Qué son los datos personales?
                                    </b>
                                </p>
                                <p>
                                    Los datos personales son cualquier información que refiere a su persona física que pueda ser identificada a través de los mismos, los cuales se pueden expresar en forma numérica, alfabética, gráfica, fotográfica, acústica o de cualquier otro tipo, como por ejemplo: nombre, apellidos, CURP, estado civil, lugar y fecha de nacimiento, domicilio, número telefónico, correo electrónico, grado de estudios, sueldo, entre otros. Dentro de los datos personales hay una categoría que se denomina “datos personales sensibles”, que requiere especial protección, ya que refieren a una información que pueda revelar aspectos íntimos de una persona o dar lugar a discriminación, como el estado de salud, información genética, creencias religiosas, filosóficas y morales, afiliación sindical, opiniones políticas origen racial o étnico y preferencia sexual, por mencionar algunos.
                                </p>
                                <p>
                                    <b>
                                        ¿A quién pertenecen los datos personales?
                                    </b>
                                </p>
                                <p>
                                    Los dueños de los datos personales son las personas a las que corresponden o refieran esos datos. Su información personal le pertenece, y usted es el Titular y quien decide sobre ella.
                                </p>
                                <p>
                                    <b>
                                        ¿Porqué es importante que se protejan sus datos personales?
                                    </b>
                                </p>
                                <p>
                                    Su información personal es valiosa, por lo que debe cuidarla como lo haría con cualquier otro bien con valor e importancia para Usted. En particular, la protección de los datos personales se hace necesaria en la sociedad, donde el uso de las Tecnologías de la Información (TI) permite comunicar, compartir y utilizar datos personales en cuestión de segundos, de manera masiva y constante, casi ilimitada, y sin mayores complicaciones. Por ello, es importante que tenga presente que los datos personales dicen quienes somos; qué cosas nos gustan; cuáles son nuestras capacidades, habilidades o deficiencias; con quién nos relacionamos; cuáles son nuestras preferencias; además, revelan información financiera sobre nuestro patrimonio, es decir, dicen todo sobre nuestra persona.
                                </p>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                    <button onClick={()=>setOpen5(!open5)}>
                        5. Revocación del consentimiento de sus datos personales

                        <motion.div animate={open5 ? {rotate: 180} : {rotate: 0}}>
                            <BsChevronDown />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        { open5 && (
                            <motion.div 
                                className={style.Text} 
                                initial="closed"
                                animate="open"
                                transition={{duration: 0.6}}
                                exit= "closed"
                                variants={variants}
                            >
                                <p>
                                    Puede revocar o retirar su consentimiento para el tratamiento de sus datos personales para todas sus finalidades que haya consentido (revocación total) o sólo para alguna de ellas (revocación parcial), eso lo decide usted, según sus propios intereses. Ahora bien es importante que tenga en cuenta que la revocación total implica terminar relación que tenga con el responsable del manejo de su información personal, pues esa persona, empresa, negocio u organización ya no podrá usar sus datos personales para ninguna finalidad. No olvide que al momento de presentar su solicitud de revocación de consentimiento, en los términos establecidos por la Ley y que nosotros le demos a conocer a través de nuestro Aviso de Privacidad, deberá indicar si la revocación es respecto a la totalidad de sus finalidades para las cuales se usan sus datos personales, o si solamente es para algunas de ellas. También es importante que tenga en cuenta que puede solicitar al responsable del manejo de sus datos personales que le confirme que dio fin de uso de su información personal, en caso que haya procedido su solicitud de revocación del consentimiento. Es importante que tome en cuenta que la revocación de su consentimiento no procederá en aquellos casos en los que el tratamiento de su información personal sea necesario para el cumplimiento de una obligación legal.
                                </p>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                    <button onClick={()=>setOpen6(!open6)}>
                        6. Modificaciones del Aviso de Privacidad

                        <motion.div animate={open6 ? {rotate: 180} : {rotate: 0}}>
                            <BsChevronDown />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        { open6 && (
                            <motion.div 
                                className={style.Text} 
                                initial="closed"
                                animate="open"
                                transition={{duration: 0.6}}
                                exit= "closed"
                                variants={variants}
                            >
                                <p>
                                    Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente Aviso de Privacidad, para la atención de novedades legislativas, políticas internas o nuevos requerimientos para la prestación u ofrecimiento de nuestros servicios o productos.
                                </p>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Aviso;