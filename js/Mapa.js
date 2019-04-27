function Mapa(objetoJSON, nivelJuego) { //añadir id nivel
	this.nivelJuego = nivelJuego;
	this.posicion = new Coordenada(0,0);
	this.posicionActualizada = new Coordenada(0,0);

	let rutaCompletaImagenFondo = objetoJSON.tilesets[0].image;
	let rutaImagenFondo = rutaCompletaImagenFondo.split("/");
	let nombreImagenFondo = rutaImagenFondo[rutaImagenFondo.length - 1];
	let nombreMapa = nombreImagenFondo.split(".");

	if (this.nivelJuego == listadoNiveles.MAPAPRINCIPAL) {
		this.rutaImagenMapa = "img/" + nombreMapa[0] + ".mapa.png";
	}
	if (this.nivelJuego == listadoNiveles.NIVEL) {
		this.rutaImagenMapa = "img/" + nombreMapa[0] + ".nivel.png";
	}

	this.anchoMedidoEnTiles = parseInt(objetoJSON.width);
	this.altoMedidoEnTiles = parseInt(objetoJSON.height);
	this.anchoDeLosTiles = parseInt(objetoJSON.tilewidth);
	this.altoDeLosTiles = parseInt(objetoJSON.tileheight);

	this.celdasColisiones = [];
	this.celdasLocalizaciones = [];
	//celdas escaleras

	this.iniciarCapas(objetoJSON.layers);

	this.iniciarElementosMapa();

	this.limiteMapa = new Celda(this.posicion.x,
		this.posicion.y,
		this.anchoMedidoEnTiles * this.anchoDeLosTiles,
		this.altoMedidoEnTiles * this.altoDeLosTiles, "colision");
}

Mapa.prototype.iniciarCapas = function(datosCapas) {
	for (i = 0; i < datosCapas.length; i++) {
		if (datosCapas[i].name == "colisiones") {
			console.log("capa colisiones");
			for (c = 0; c < datosCapas[i].objects.length; c++) {
				this.celdasColisiones.push(new Celda(
					datosCapas[i].objects[c].x, datosCapas[i].objects[c].y,
					datosCapas[i].objects[c].width, datosCapas[i].objects[c].height, "colision"
				));
			}
		}
		if (datosCapas[i].name == "localizaciones") {
			for (l = 0; l < datosCapas[i].objects.length; l++) {
				this.celdasLocalizaciones.push(new Localizacion(new Celda(
					datosCapas[i].objects[l].x, datosCapas[i].objects[l].y,
					datosCapas[i].objects[l].width, datosCapas[i].objects[l].height, "localizacion"
				), datosCapas[i].objects[l].name));
			}
		}
		//bloque if capas de escaleras
	}
}

Mapa.prototype.iniciarElementosMapa = function() {
	$("#mapa").css({"position":"absolute",
	"width":(this.anchoMedidoEnTiles * this.anchoDeLosTiles)+"px", //ancho mapa
	"height":(this.altoMedidoEnTiles * this.altoDeLosTiles) + "px", //alto mapa
	"background":"url('" + this.rutaImagenMapa + "')" //foto del mapa
	});
	$("body").css({"overflow":"hidden","backgroundColor":"black"});
}
//detectar la posicion actual y mover al jugador
Mapa.prototype.actualizar = function(registroTemporal, posicionJugador) {
	this.posicion.x = posicionJugador.x;
	this.posicion.y = posicionJugador.y;
	this.limiteMapa.x = this.posicion.x;
	this.limiteMapa.y = this.posicion.y;
}
//Mover la imagen de fondo (dando la sensacion de que el personaje se desplaza por el mapa)
Mapa.prototype.dibujar = function() {
	$("#mapa").css({"transform": 'translate3d(' + this.posicion.x + 'px, ' + this.posicion.y + 'px, 0' + ')'});
		/*
		for (rc = 0; rc < this.celdasColisiones.length; rc++) {
			this.celdasColisiones[rc].mover(this.posicion.x, this.posicion.y);
		}
		
		for (rl = 0; rl < this.celdasLocalizaciones.length; rl++) {
			this.celdasLocalizaciones[rl].celda.mover(this.posicion.x, this.posicion.y);
		}
		*/
}