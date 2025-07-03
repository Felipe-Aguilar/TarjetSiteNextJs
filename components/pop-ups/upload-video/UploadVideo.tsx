'use client';

import { useState, useRef } from 'react';
import { BsX, BsCloudUpload, BsCheckCircle } from 'react-icons/bs';
import { motion } from 'framer-motion';
import style from "./UploadVideo.module.scss";
import EditData from '@/app/api/editData';
import { UserDataResponse } from '@/interfaces/userData-interface';

interface Props {
    token: string;
    close: () => void;
    serviceNumber: string;
    userData: UserDataResponse;
}

const animate = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { delay: 1 }
}

const UploadVideo = ({ token, close, serviceNumber, userData }: Props) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState<string>('');
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validar que sea un video
            if (!file.type.startsWith('video/')) {
                setError('Por favor selecciona un archivo de video válido');
                return;
            }
            
            // Validar tamaño (max 50MB)
            if (file.size > 50 * 1024 * 1024) {
                setError('El archivo es demasiado grande. Máximo 50MB');
                return;
            }
            
            // Validar duración
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                if (video.duration > 60) {
                    setError('El video debe durar máximo 1 minuto');
                    URL.revokeObjectURL(video.src);
                    return;
                }
                URL.revokeObjectURL(video.src);
                setSelectedFile(file);
                setError('');
            };
            video.src = URL.createObjectURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            
            reader.onload = async () => {
                const fullBase64 = reader.result?.toString() || '';
                
                // Obtener el índice correcto del servicio
                const serviceIndex = parseInt(serviceNumber) - 1; // Convertir a índice base 0
                
                // Obtener el servicio existente
                const existingService = userData.Serv?.[serviceIndex] || {
                    ServNum: serviceNumber,
                    ServDescrip: '',
                    ServSubTitulo: '',
                    ServImg: '',
                    ServIcono: '',
                    ServSiteId: parseInt(serviceNumber) === 14 ? 3 : 2
                };

                // Crear el objeto actualizado
                const updatedService = {
                    ServNum: serviceNumber,
                    ServDescrip: existingService.ServDescrip, // Mantener la descripción existente
                    ServSubTitulo: existingService.ServSubTitulo, // Mantener el subtítulo existente
                    ServImg: fullBase64,
                    ServIcono: '',
                    ServSiteId: parseInt(serviceNumber) === 14 ? 3 : 2
                };

                // Crear SecondServices dinámicamente
                const secondServices = Array.from({length: 10}, (_, i) => {
                    const serviceIndex = i + 4; // Índice en userData.Serv (4-13)
                    const serviceNum = i + 5;   // Número de servicio (5-14)
                    const serviceKey = `service${i + 9}`; // Clave (service9-service18)
                    
                    return {
                        [serviceKey]: userData.Serv?.[serviceIndex] || {
                            ServNum: serviceNum.toString(),
                            ServDescrip: '',
                            ServSubTitulo: '',
                            ServImg: '',
                            ServIcono: '',
                            ServSiteId: serviceNum === 14 ? 3 : 2 // service18 es especial
                        }
                    };
                }).reduce((acc, curr) => ({...acc, ...curr}), {});

                // Crear el objeto de servicios completo
                const updatedServices = {
                    FirstServices: {
                        service1: userData.Serv?.[0]?.ServDescrip || '',
                        service2: userData.Serv?.[1]?.ServDescrip || '',
                        service3: userData.Serv?.[2]?.ServDescrip || '',
                        service4: userData.Serv?.[3]?.ServDescrip || '',
                        service5: userData.Serv?.[14]?.ServDescrip || '',
                        service6: userData.Serv?.[15]?.ServDescrip || '',
                        service7: userData.Serv?.[16]?.ServDescrip || '',
                        service8: userData.Serv?.[17]?.ServDescrip || '',
                    },
                    SecondServices: Array.from({length: 10}, (_, i) => {
                        const serviceIndex = i + 4; // Índice en userData.Serv (4-13)
                        const serviceNum = i + 5;   // Número de servicio (5-14)
                        const serviceKey = `service${i + 9}`; // Clave (service9-service18)
                        
                        return {
                            [serviceKey]: userData.Serv?.[serviceIndex] || {
                                ServNum: serviceNum.toString(),
                                ServDescrip: '',
                                ServSubTitulo: '',
                                ServImg: '',
                                ServIcono: '',
                                ServSiteId: serviceNum === 14 ? 3 : 2
                            }
                        };
                    }).reduce((acc, curr) => ({...acc, ...curr}), {})
                };

                // Actualizar solo el servicio modificado
                const serviceKey = `service${parseInt(serviceNumber) + 4}`;
                updatedServices.SecondServices[serviceKey as keyof typeof updatedServices.SecondServices] = updatedService;

                await EditData({
                    userData,
                    servicesForm: updatedServices
                });

                setUploadSuccess(true);
                setTimeout(() => {
                    close();
                    window.location.reload();
                }, 2000);
            };

            reader.onerror = () => {
                setError('Error al procesar el video');
                setIsUploading(false);
            };

        } catch (error) {
            console.error('Error al subir el video:', error);
            setError('Error al subir el video');
            setIsUploading(false);
        }
    };

    return (
        <div className={style.UploadVideoOverlay}>
            <div className={style.UploadVideoModal}>
                {!uploadSuccess ? (
                    <motion.div className={style.UploadVideoContent} {...animate}>
                        <div className={style.UploadVideoHeader}>
                            <h3>Subir Video</h3>
                            <button onClick={close} className={style.CloseButton}>
                                <BsX />
                            </button>
                        </div>

                        <div className={style.UploadVideoArea}>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileSelect}
                                id="video-upload"
                                className={style.HiddenInput}
                                disabled={isUploading}
                            />
                            <label htmlFor="video-upload" className={style.UploadLabel}>
                                <BsCloudUpload />
                                <span>Selecciona un video</span>
                                <small>Máximo 1 minuto y 50MB</small>
                            </label>
                        </div>

                        {selectedFile && (
                            <div className={style.VideoPreview}>
                                <video
                                    ref={videoRef}
                                    controls
                                    src={URL.createObjectURL(selectedFile)}
                                    className={style.VideoPlayer}
                                />
                                <div className={style.FileInfo}>
                                    <p><strong>Archivo:</strong> {selectedFile.name}</p>
                                    <p><strong>Tamaño:</strong> {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className={style.ErrorMessage}>
                                {error}
                            </div>
                        )}

                        <div className={style.UploadVideoActions}>
                            <button 
                                onClick={close} 
                                className={style.CancelButton}
                                disabled={isUploading}
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleUpload} 
                                className={style.UploadButton}
                                disabled={!selectedFile || isUploading}
                            >
                                {isUploading ? 'Subiendo...' : 'Subir Video'}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div className={style.SuccessMessage} {...animate}>
                        <h5>El video se subió correctamente</h5>
                        <BsCheckCircle />
                        <p>La página se recargará automáticamente...</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default UploadVideo;