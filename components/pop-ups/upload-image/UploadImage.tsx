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
    forceSquare?: boolean;  
}

const animate = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { delay: 1 }
}

const UploadImage = ({ token, imageType, serviceNumber, close, forceSquare = false }: Props) => {
    const cropperReference = useRef<ReactCropperElement>(null);
    const [insertCorrect, setInsertCorrect] = useState<boolean>(false);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [cropData, setCropData] = useState<any>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const onCrop = () => {
        const cropper = cropperReference.current?.cropper;
        if (cropper) {
            const data = cropper.getData(true); // Guarda el área actual recortada
            setCropData(data);
        }
    };

    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        maxSize: 5000000,
        accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const fileURL = URL.createObjectURL(acceptedFiles[0]);
                setImageSrc(fileURL);
                setCropData(null); // Reiniciar datos de recorte al cargar nueva imagen
            }
        }
    });

    const files = acceptedFiles.map((file, index) => (
        <Fragment key={index}>
            <div className={style.FileInfo}>{file.name} - {(file.size / 1024).toFixed(2)} KB</div>

            <div className={style.CropperContainer}>
                <Cropper
                    src={imageSrc || ''}
                    className={style.ImagePreview}
                    initialAspectRatio={forceSquare ? 1 : undefined}  // Modificado
                    aspectRatio={forceSquare ? 1 : undefined}         // Modificado
                    guides={true}
                    crop={onCrop}
                    ref={cropperReference}
                    viewMode={1}
                    dragMode={'move'}
                    minCropBoxWidth={100}
                    minCropBoxHeight={100}
                    autoCropArea={0.8}
                    movable={true}
                    zoomable={true}
                    rotatable={true}
                    scalable={true}
                    background={false}
                    responsive={true}
                    toggleDragModeOnDblclick={true}
                    ready={() => {
                        setImageLoaded(true);
                        if (cropData && cropperReference.current) {
                            cropperReference.current.cropper.setData(cropData);
                        }
                    }}
                />
            </div>
        </Fragment>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.name}>
            {file.name} - {(file.size / 1024).toFixed(2)} KB
            <ul>
                {errors.map(e => (
                    <li key={e.code}>Error: {e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const uploadImage = async () => {
        const cropper = cropperReference.current?.cropper;

        if (!cropper || !imageLoaded) {
            alert('Por favor, selecciona y recorta una imagen primero');
            return;
        }

        if (!cropData) {
            alert('No se detectó recorte. Por favor, ajusta el área a recortar.');
            return;
        }

        const canvas = cropper.getCroppedCanvas({
            width: cropData.width,
            height: cropData.height,
            fillColor: '#fff',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        });

        if (!canvas) {
            alert('Error al procesar la imagen recortada');
            return;
        }

        canvas.toBlob(async (blob) => {
            if (!blob) {
                alert('Error al convertir la imagen');
                return;
            }

            try {
                FileResizer.imageFileResizer(
                    blob,
                    500,
                    500,
                    "WEBP",
                    90,
                    0,
                    async (resizedBlob) => {
                        await UploadImageFirst(
                            resizedBlob,
                            token,
                            imageType,
                            serviceNumber
                        );
                        setInsertCorrect(true);
                        setTimeout(() => window.location.reload(), 2000);
                    },
                    "blob"
                );
            } catch (error) {
                console.error('Error al procesar la imagen:', error);
                alert('Error al procesar la imagen');
            }
        }, 'image/webp', 0.9);
    };

    return (
        <div className="pop">
            {!insertCorrect && (
                <motion.div className={`container ${style.UploadImage}`} {...animate}>
                    <h5>Cambia tu logotipo o imagen</h5>

                    <div className={style.Dropzone} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <span>
                            Arrastra y suelta tu imagen aquí, o haz clic para seleccionar imagen.
                            <br />(Formatos: .jpg, .png, .webp | Tamaño máximo: 5MB)
                        </span>
                    </div>

                    <aside className={style.PreviewSection}>
                        {files.length > 0 && <p>Vista previa y editor:</p>}
                        <ul>{files}</ul>
                        <ul className={style.Error}>{fileRejectionItems}</ul>
                    </aside>

                    <div className={style.ActionButtons}>
                        <button
                            className={`btn ${style.Save}`}
                            onClick={uploadImage}
                            disabled={files.length === 0}
                        >
                            Guardar imagen
                        </button>

                        <button className={style.CloseButton} onClick={close}>
                            Cerrar ventana
                        </button>
                    </div>
                </motion.div>
            )}

            {insertCorrect && (
                <motion.div className={`container ${style.Correct}`} {...animate}>
                    <h5>La imagen se subió correctamente</h5>
                    <BsCheckCircle />
                    <p>La página se recargará automáticamente...</p>
                </motion.div>
            )}
        </div>
    );
}

export default UploadImage;
