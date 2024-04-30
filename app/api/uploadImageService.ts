
const UploadImageFirst = async (blob:any, token:string, type:string, serviceNumber?:string) => {

    const response = await fetch('https://souvenir-site.com/WebTarjet/APIImagen/gxobject',{
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: blob
    });

    const data = await response.json();

    await UploadImageSecond(token, type, data.object_id, serviceNumber);
}

const UploadImageSecond = async (token:string, type:string, image: any, serviceNumber?:string) => {

    await fetch('https://souvenir-site.com/WebTarjet/APIImagen/ServiceUpload',{
        method: 'POST',
        body: JSON.stringify({
            "UsuToken": token,
            "ImageFileImage": image,
            "TipoImagen": type,
            "ServId": serviceNumber === undefined ? '0' : `${serviceNumber}`
        })
    });

}

export { UploadImageFirst }