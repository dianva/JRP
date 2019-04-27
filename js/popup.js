var popup = {
    mostrar: false,
    ver: function(x, y, ancho, texto) {
        if(popup.mostrar) {
            return;
        }

        x = Math.floor(x);
        y = Math.floor(y);
        $("#popup").text(texto).css({
            "display":"block",
            "position":"absolute",
            "transform":'translate3d('+ x + 'px, ' + y + 'px, 0' + ')',
            "width":ancho+"px",
            "zIndex":"20",
            "backgroundColor":"black",
            "color":"white",
            "border":"3px solid white",
            "padding":"0.3em",
            "textAlign":"center"});
        popup.mostrar = true;
    },
    ocultar: function() {
        if(!popup.mostrar) {
            return;
        }
        $("#popup").text("").css({
            "display":"none",
        });
        popup.mostrar = false;
    }
};