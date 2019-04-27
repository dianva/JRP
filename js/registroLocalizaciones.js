var registroLocalizaciones = {
    obtenerLocalizacion: function(nombreLocalizacion) {
        let localizaciones = new Array();
        localizaciones.push(new RegistroLocalizacionEntrada("sad hill", "niveles/villa48.json", "img/villa48.nivel.png", 0, 630));
        //localizaciones.push(new RegistroLocalizacionEntrada("casa en ruinas", "mapas/bosque48.json", "img/mapa48.mapa.png", 500, 500));
        for(var i = 0; i < localizaciones.length; i++) {
            if(nombreLocalizacion == localizaciones[i].nombre) {
                return localizaciones[i];
            }
        }
    }
};