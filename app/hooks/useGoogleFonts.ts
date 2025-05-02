// hooks/useGoogleFonts.ts
import { useEffect } from 'react';

const useGoogleFonts = (fontFamily: string) => {
  useEffect(() => {
    // Cargar todas las fuentes con los pesos necesarios
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Forzar la carga de las fuentes y actualizar estilos
    const loadFonts = async () => {
      await document.fonts.load(`16px ${fontFamily}`);
      await document.fonts.load(`700 16px ${fontFamily}`);
      
      const nameElements = document.querySelectorAll('.TextName');
      const otherElements = document.querySelectorAll('.Text:not(.TextName)');
      
      nameElements.forEach(el => {
        (el as HTMLElement).style.fontFamily = `${fontFamily}, sans-serif`;
        (el as HTMLElement).style.fontWeight = '700';
      });
      
      otherElements.forEach(el => {
        (el as HTMLElement).style.fontFamily = `${fontFamily}, sans-serif`;
        (el as HTMLElement).style.fontWeight = '400';
      });
    };

    loadFonts();

    return () => {
      document.head.removeChild(link);
    };
  }, [fontFamily]);
};

export default useGoogleFonts;