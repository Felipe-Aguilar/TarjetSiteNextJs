export interface ImagesCollectionInterface {
    ListTarjetas: ListTarjeta[];
}

export interface ListTarjeta {
    TarjetaId:        string;
    ColeccionId:      string;
    ColeccionDesc:    ColeccionDesc;
    TarjetaPremium:   number;
    TarjetaImagen:    string;
    TarjetaTxtX:      string;
    TarjetaTxtY:      string;
    TarjetaColorFont: string;
    TarjetaImgX:      string;
    TarjetaImgY:      string;
    TarjetaConImg:    number;
    TarjetaSizeImgW:  string;
    TarjetaSizeImgH:  string;
}

export enum ColeccionDesc {
    Clasica = "CLASICA",
    Formal = "FORMAL",
}
