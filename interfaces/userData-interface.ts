import Google from '@/components/login/Google';
export interface UserDataResponse {
    UUID:             string;
    TokenId:          string;
    EmpleadoId:       string;
    Nom:              string;
    AppP:             string;
    AppM:             string;
    Cargo:            string;
    Tipo:             string;
    Titulo:           string;
    TituloDes:        string;
    NomNegocio:       string;
    Lev1Id:           string;
    Lev1Desc:         string;
    Lev2Id:           string;
    Lev2Desc:         string;
    Lev3Id:           string;
    Lev3Desc:         string;
    Activid:          string;
    ImgTarFrente:     string;
    ImgTarReverso:    string;
    PublicPriva:      number;
    Telefono1:        string;
    Tel1WP:           number;
    Telefono2:        string;
    Tel2WP:           number;
    Telefono3:        string;
    Tel3WP:           number;
    Telefono4:        string;
    Tel4WP:           number;
    VerUbicacion:     number;
    PermitirCalif:    number;
    PermitirComments: number;
    TexoUbica:        string;
    Calle:            string;
    NumExt:           string;
    CodP:             string;
    Colonia:          string;
    Municip:          string;
    Estado:           string;
    MapsGeoloc:       string;
    Activo:           number;
    RangoLocal:       string;
    ImgHeader:        string;
    Mail:             string;
    Web:              string;
    IconoComents:     string;
    Google:           string;
    Facebook:         string;
    Instagram:        string;
    Youtube:          string;
    Tiktok:           string;
    Pinterest:        string;
    Twitter:          string;
    Telegram:         string;
    Linkedin:         string;
    TituloServ:       string;
    SubTituloServ:    string;
    ColorBton1:       string;
    ColorBton2:       string;
    ImgFoto:          string;
    ImgLogo:          string;
    RegistroTarjet:   boolean;
    RegistroFecha:    Date;
    Alias:            string;
    Premium:          boolean;
    Orden:            number;
    Serv:             Serv[];
    BotonesAdicionales: BotonesAdicionales[];
    SiteGoogle?:    string;
    ListRedesSociales?: RedSocial[];
    ListDirecciones?: Direccion[];
}

export interface RedSocial {
    RedSocialId: string;  // Ejemplo: "INSTA", "GOOG", etc.
    RedSocialDesc: string; // Ejemplo: "Instagram", "Google", etc.
    RedSocialUrl: string; // URL de la red social
}

export interface Direccion {
    DirId: string;
    DirCalle: string;
    DirNumExt: string;
    DirCodP: string;
    DirCol: string;
    DirMunicip: string;
    DirEstado: string;
    DirMapsGeoloc: string;
}

export interface Serv {
    ServNum:       string;
    ServDescrip:   string;
    ServSubTitulo: string;
    ServImg:       string;
    ServIcono:     string;
    ServSiteId:    number;
}

export interface BotonesAdicionales {
    ButtonId: number;
    ButtonNom: string;
    ButtonTexto: string;
    ButtonUrl: string;
    ButtonColor1: string;
    ButtonColor2: string;
    ButtonIcono: string;
    ButtonColorTxt: string;
}