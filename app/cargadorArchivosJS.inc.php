<?php
$fuentesJavascript = array(
	"js/audio.js",
	"js/dimensiones.js",
	"js/nivelPantallaTitulo.js",
	"js/popup.js",
	"js/Celda.js",
	"js/RegistroLocalizacionEntrada.js",
	"js/registroLocalizaciones.js",
	"js/Localizacion.js",
	"js/Jugador.js",
	"js/Sprite.js",
	"js/PaletaSprites.js",
	"js/listadoNiveles.js",
	"js/ajax.js",
	"js/nivelMapaPrincipal.js",
	"js/maquinaNiveles.js",
	"js/Coordenada.js",
	"js/Mapa.js",
	"js/controlesTeclado.js",
	"js/teclado.js",	
	"js/mainLoop.js",
	"js/inicio.js"
);
//actualizar sin ctrl+f5
$fecha = new DateTime();
foreach($fuentesJavascript as $fuente) {
	echo '<script src="' . $fuente . '?' . $fecha -> getTimestamp() . '"></script>';
	echo nl2br("\n");
}