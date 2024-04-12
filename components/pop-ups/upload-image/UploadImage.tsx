'use client';

import { Fragment, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Cropper, ReactCropperElement } from "react-cropper";
import { UploadImageFirst } from "@/app/api/uploadImageService";
import { BsCheckCircle } from "react-icons/bs";

import FileResizer from "react-image-file-resizer";
import style from './upload.module.scss';
import "cropperjs/dist/cropper.css";

interface Props {
    token: string;
    imageType: string;
    serviceNumber?: string;
    close: ()=>void;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1}
}


const UploadImage = ({token, imageType, serviceNumber, close} : Props) => {

    // *Recortar imagen
    const cropperReference = useRef<ReactCropperElement>(null);
    const onCrop = () => { 
        const cropper = cropperReference.current?.cropper; 
    }
    
    // *Dropzone
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        maxSize: 5000000,
        accept: {'image/jpeg': [], 'image/png': [], 'image/webp': []}
    })

    const files = acceptedFiles.map((file,index)=>(
        <Fragment key={index}>
            <li>{file.name} - {file.size} bytes</li>

            <Cropper 
                src={URL.createObjectURL(file)}
                className={style.ImagePreview}
                initialAspectRatio={1/1}
                aspectRatio={1}
                guides={true}
                crop={onCrop}
                ref={cropperReference}
                viewMode={2}
                dragMode={'none'}
                minCropBoxWidth={500}
            />
        </Fragment>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.name}>
            {file.name} - {file.size} bytes

            <ul>
                { errors.map(e => (
                    <li key={e.code}>Error: el tipo de archivo debe ser image/jpeg, image/png ó hay más de 1 archivo seleccionado</li>
                ))}
            </ul>
        </li>
    ));

    // *Subir imagen
    const uploadImage = async () => {
        
        const cropper = cropperReference.current?.cropper;

        const image = cropper?.getCroppedCanvas();

        if (image) {
            image.toBlob((img)=>{
                FileResizer.imageFileResizer(img!, 500, 500, "WEBP", 98, 0, (blob) => {
                    UploadImageFirst(blob, token, imageType, serviceNumber);

                    setTimeout(()=>{
                        setInsertCorrect(true);

                        setTimeout(()=>{
                            window.location.reload();
                        },3000)
                    }, 2000)
                    
                }, "blob")
            });
        }
    }

    const [insertCorrect, setInsertCorrect] = useState<boolean>(false);

    return ( 
        <div className="pop">
            { !insertCorrect && (
                <motion.div className={`container ${style.UploadImage}`} {...animate}>
                    <h5>Cambia tu logotipo o imagen</h5>

                    <div className={style.Dropzone} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <span>
                            Arrastra y suelta tu imagen aquí, o haz clic para seleccionar imagen.
                            (solo se permite subir un archivo con extension .jpg ó .png y un tamaño máximo de 5MB)
                        </span>
                    </div>

                    <p>Imagen</p>
                    <ul>{ files }</ul>
                    <ul className={style.Error}>{ fileRejectionItems }</ul>

                    <button 
                        className={`btn ${style.Save}`} 
                        onClick={()=>uploadImage()}
                        disabled={files.length > 0 ? false : true}
                    >
                        Guardar imagen
                    </button>

                    <button className="close" onClick={close}>
                        cerrar ventana (x)
                    </button>
                </motion.div>
            )}

            { insertCorrect && (
                <motion.div className={`container ${style.Correct}`} {...animate}>
                    <h5>La imagen se subió correctamente</h5>
                    <BsCheckCircle />
                </motion.div>
            )}
        </div>
    );
}

export default UploadImage;