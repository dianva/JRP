var audio = {
    musica: null,
    pista1: "audio/Soliloquy.mp3", 
    reproducir: function(rutaPista) {
        if(audio.musica != null) {
            audio.musica.pause();
            audio.musica.src = "Soliloquy.mp3";
        }
        audio.musica = new Audio(rutaPista);
        audio.musica.play();
        
    }
    
};
