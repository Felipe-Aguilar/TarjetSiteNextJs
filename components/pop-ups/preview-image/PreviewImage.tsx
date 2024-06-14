import { ListTarjeta } from "@/interfaces/design-tarjet/imagesCollection-interface";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { UploadImageFirst } from "@/app/api/uploadImageService";
import { BsCheckCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";

import style from './preview.module.scss';
import Image from "next/image";

interface Props {
    token: string;
    premiumPreview: boolean;
    backgroundCard: ListTarjeta;
    data: {
        name: string;
        workStation: string;
        businessName: string;
        phone: string;
    },
    close: ()=> void;
}

interface Position {
    x: number;
    y: number;
}

type SetOffsetFunction = (offset: { x: number; y: number }) => void;

interface DragOffset {
    x: number;
    y: number;
}

type SetPositionFunction = (position: { x: number; y: number }) => void;

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1}
}

const PreviewImage = ({token, premiumPreview, backgroundCard, data, close} : Props) => {

    const image = useRef(null);
    const text1Reference = useRef(null);
    const text2Reference = useRef(null);
    const text3Reference = useRef(null);
    const text4Reference = useRef(null);

    const text1 = data.name;
    const text2 = data.workStation;
    const text3 = data.businessName;
    const text4 = data.phone;

    const [position1, setPosition1] = useState({x: 50, y: 50});
    const [dragOffset1, setDragOffset1] = useState({x: 50, y: 50});
    const [position2, setPosition2] = useState({ x: 50, y: 80});
    const [dragOffset2, setDragOffset2] = useState({x: 50, y: 50});

    const [position3, setPosition3] = useState({x: 50, y: 110});
    const [dragOffset3, setDragOffset3] = useState({x: 50, y: 50});
    const [position4, setPosition4] = useState({ x: 50, y: 140});
    const [dragOffset4, setDragOffset4] = useState({x: 50, y: 50});

    const [backgroundImage, setBackgroundImage] = useState<string>();

    useEffect(()=>{
        if (!premiumPreview) {
            fetch(`https://souvenir-site.com/WebTarjet/PublicTempStorage/FreeTarjets/${backgroundCard.TarjetaImagen}`)
            .then(data => data.blob())
            .then(image => {
                setBackgroundImage(URL.createObjectURL(image));
            })
        }else{
            fetch(`https://souvenir-site.com/WebTarjet/PublicTempStorage/PremiumTarjets/${backgroundCard.TarjetaImagen}`)
            .then(data => data.blob())
            .then(image => {
                setBackgroundImage(URL.createObjectURL(image));
            })
        }
    },[])

    const [dragging, setDragging] = useState<boolean>(false);

    function handleMouseDown(event: React.MouseEvent, setOffset: SetOffsetFunction, position: Position) {
        event.preventDefault()
        if (!dragging) {
            setDragging(true);
            const offsetX = event.clientX - position.x
            const offsetY = event.clientY - position.y
            setOffset({ x: offsetX, y: offsetY });
        }

    }
    function handleTouchStart(event: React.TouchEvent, setOffset: SetOffsetFunction, position: Position) {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            setDragging(true);
            const offsetX = touch.clientX - position.x;
            const offsetY = touch.clientY - position.y;
            setOffset({ x: offsetX, y: offsetY });
        }
    }
    function handleTouchMove(event: React.TouchEvent, setPosition: SetPositionFunction, dragOffset: DragOffset, texto: React.RefObject<HTMLDivElement>) {
        if (dragging && event.touches.length === 1 && image.current) {
            const touch = event.touches[0];
            const containerRect = (image.current as Element).getBoundingClientRect();
            const offsetX = touch.clientX - dragOffset.x;
            const offsetY = touch.clientY - dragOffset.y;

            const minX = 0
            const minY = 0
            const maxX = containerRect.right - texto.current!.clientWidth;
            const maxY = (image.current as Element).clientHeight - texto.current!.clientHeight

            const newX = Math.max(minX, Math.min(maxX, offsetX));
            const newY = Math.max(minY, Math.min(maxY, offsetY));
            setPosition({
                x: newX,
                y: newY
            });
        }
    }
    function handleMouseMove(event: React.MouseEvent, setPosition: SetPositionFunction, dragOffset: DragOffset, texto:React.RefObject<HTMLDivElement>) {
        if (dragging && image.current) {
            event.preventDefault()
            const containerRect = getComputedStyle(image.current);
            const offsetX = event.clientX - dragOffset.x;
            const offsetY = event.clientY - dragOffset.y;
            const minX = 0
            const minY = 0
            const maxX = parseInt(containerRect.width) - texto.current!.clientWidth
            const maxY = (image.current as Element).clientHeight - texto.current!.clientHeight;
            
            
            const newX = Math.max(minX, Math.min(maxX, offsetX));
            const newY = Math.max(minY, Math.min(maxY, offsetY));
            setPosition({ x: newX, y: newY });
        }
    }
    function handleMouseUp() {
        setDragging(false);
    }

    // *Guardar tarjeta.
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
    const route = useRouter();

    const SaveImage = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img');
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx!.drawImage(img, 0, 0);
            ctx!.fillStyle = "black";
            const width = parseInt(getComputedStyle(image!.current!).width)
            const scaledFontSize = (parseInt(getComputedStyle(text1Reference!.current!).fontSize) / width) * img.width


            ctx!.font = `45px Arial`;
            ctx!.fillStyle = `${backgroundCard.TarjetaColorFont}`;
            ctx!.fillText(text1, (position1.x / (image!.current! as Element).clientWidth ) * img.width, (position1.y / (image!.current! as Element).clientHeight) * img.height + scaledFontSize); // Ajusta la posición del texto según sea necesario


            ctx!.font = `35px Arial`;
            ctx!.fillStyle = `${backgroundCard.TarjetaColorFont}`;
            ctx!.fillText(text2, (position2.x / (image!.current! as Element).clientWidth ) * img.width, (position2.y / (image!.current! as Element).clientHeight) * img.height + scaledFontSize); // Ajusta la posición del texto según sea necesario

            ctx!.font = `41px Arial`;
            ctx!.fillStyle = `${backgroundCard.TarjetaColorFont}`;
            ctx!.fillText(text3, (position3.x / (image!.current! as Element).clientWidth ) * img.width, (position3.y / (image!.current! as Element).clientHeight) * img.height + scaledFontSize); // Ajusta la posición del texto según sea necesario

            ctx!.font = `35px Arial`;
            ctx!.fillStyle = `${backgroundCard.TarjetaColorFont}`;
            ctx!.fillText(text4, (position4.x / (image!.current! as Element).clientWidth ) * img.width, (position4.y / (image!.current! as Element).clientHeight) * img.height + scaledFontSize); // Ajusta la posición del texto según sea necesario


            canvas.toBlob((blob)=>{
                UploadImageFirst(blob, token, "TFRE");

                setTimeout(()=>{
                    setUploadSuccess(true);

                    setTimeout(()=>{
                        route.replace(`/disena-tarjet/${btoa(token)}`);
                        setUploadSuccess(false);
                        close();
                    }, 3000)

                },1500);
            })
        };

        img.src = backgroundImage!;
        
    }

    return ( 
        <div className="pop">
            { !uploadSuccess && (
                <motion.div className={`container ${style.Preview}`} {...animate} >
                    <h5>Previsualiza tu Tarjet</h5>

                    <p>
                        Desliza tu nombre y cargo en la posición que prefieras
                        <Image 
                            src={'/images/icono-movimiento.svg'}
                            alt="Icono de movimiento"
                            width={150}
                            height={150}
                        />
                    </p>

                    <div className={style.BackgroundImage} ref={image}>
                        <img 
                            src={ backgroundImage } 
                            alt="tarjeta de presentación" 
                        />
                        { data.name && (
                            <div 
                                className={`${style.Text} ${style.TextName}`} 
                                ref={text1Reference} 
                                style={{
                                    top: `${position1.y}px`, 
                                    left: `${position1.x}px`, 
                                    color: backgroundCard.TarjetaColorFont
                                }}
                                onMouseMove={e => handleMouseMove(e, setPosition1, dragOffset1, text1Reference)}
                                onMouseUp={handleMouseUp}
                                onTouchMove={e => handleTouchMove(e, setPosition1, dragOffset1, text1Reference)}
                                onTouchEnd={handleMouseUp}
                                onMouseDown={e => handleMouseDown(e, setDragOffset1, position1)}
                                onTouchStart={e => handleTouchStart(e, setDragOffset1, position1)}
                            >
                                {data.name}
                            </div>
                        )}

                        { data.workStation && (
                            <div 
                                className={style.Text} 
                                ref={ data.name ? text2Reference : text1Reference}
                                style={{
                                    top: `${position2.y}px`, 
                                    left: `${position2.x}px`, 
                                    color: backgroundCard.TarjetaColorFont
                                }}
                                onMouseMove={e => handleMouseMove(e, setPosition2, dragOffset2, data.name ? text2Reference : text1Reference)}
                                onMouseUp={handleMouseUp}
                                onTouchMove={e => handleTouchMove(e, setPosition2, dragOffset2, data.name ? text2Reference : text1Reference)}
                                onTouchEnd={handleMouseUp}
                                onMouseDown={e => handleMouseDown(e, setDragOffset2, position2)}
                                onTouchStart={e => handleTouchStart(e, setDragOffset2, position2)}
                            >
                                {data.workStation}
                            </div>
                        )}

                        { data.businessName && (
                            <div 
                                className={`${style.Text} ${style.TextBusiness}`} 
                                ref={(data.name || data.workStation) ? text3Reference : text1Reference}
                                style={{
                                    top: `${position3.y}px`, 
                                    left: `${position3.x}px`, 
                                    color: backgroundCard.TarjetaColorFont
                                }}
                                onMouseMove={e => handleMouseMove(e, setPosition3, dragOffset3, (data.name || data.workStation) ? text3Reference : text1Reference)}
                                onMouseUp={handleMouseUp}
                                onTouchMove={e => handleTouchMove(e, setPosition3, dragOffset3, (data.name || data.workStation) ? text3Reference : text1Reference)}
                                onTouchEnd={handleMouseUp}
                                onMouseDown={e => handleMouseDown(e, setDragOffset3, position3)}
                                onTouchStart={e => handleTouchStart(e, setDragOffset3, position3)}
                            >
                                {data.businessName}
                            </div>
                        )}

                        { data.phone && (
                            <div 
                                className={style.Text} 
                                ref={(data.name || data.workStation || data.businessName) ? text4Reference : text1Reference}
                                style={{
                                    top: `${position4.y}px`, 
                                    left: `${position4.x}px`, 
                                    color: backgroundCard.TarjetaColorFont
                                }}
                                onMouseMove={e => handleMouseMove(e, setPosition4, dragOffset4, (data.name || data.workStation || data.businessName) ? text4Reference : text1Reference)}
                                onMouseUp={handleMouseUp}
                                onTouchMove={e => handleTouchMove(e, setPosition4, dragOffset4, (data.name || data.workStation || data.businessName) ? text4Reference : text1Reference)}
                                onTouchEnd={handleMouseUp}
                                onMouseDown={e => handleMouseDown(e, setDragOffset4, position4)}
                                onTouchStart={e => handleTouchStart(e, setDragOffset4, position4)}
                            >
                                {data.phone}
                            </div>
                        )}
                    </div>

                    <button className={`btn ${style.SaveButton}`} onClick={SaveImage}>
                        Guardar Tarjeta
                    </button>

                    <button className="close" onClick={close}>
                        cerrar ventana (x)
                    </button>
                </motion.div>
            )}

            { uploadSuccess && (
                <motion.div className={`container ${style.SuccessPop}`} {...animate}>
                    <h5>Tu tarjeta se actualizó con éxito</h5>
                    <BsCheckCircle />
                </motion.div>
            )}
        </div>
    );
}

export default PreviewImage;