function Jugador(posicionInicialEnPixeles, nivelJuego) {
	this.nivelJuego = nivelJuego;

	this.ancho = 48;
	this.alto = 48;

	this.rutaHojaSprites = "img/personajes48.png";
	this.personaje = 3; //elegir personaje

	this.origenXSprite = 0;
	this.origenYSprite = this.alto * this.personaje;

	this.velocidadMovimiento = 3;

	this.velocidadX = 0;
	this.velocidadY = 0;

	this.subiendo = false;
	this.saltoBloqueado = false;
	this.saltoYInicial = 0;
	this.framesAereosMaximos = 12;
	this.framesAereos = this.framesAereosMaximos;

	this.velocidadTerminal = 10;
	this.velocidadCaida = 0;

	//modo escalera

	this.enMovimiento = false;
	this.framesAnimacion = 0;

	//truncar los deciamales / eliminar y poner el jugador en el centro
	var centroX = Math.trunc(dimensiones.ancho / 2 - this.ancho / 2);
	var centroY = Math.trunc(dimensiones.alto / 2 - this.alto / 2);
	this.posicionCentrada = new Coordenada(centroX, centroY);
	this.celdaGeneral = new Celda(centroX, centroY, this.ancho, this.alto);

	this.limiteArriba = new Celda(centroX + this.ancho / 3, centroY, this.ancho / 3, 1);
	this.limiteAbajo = new Celda(centroX + this.ancho / 3, centroY + this.alto - 1, this.ancho / 3, 1);
	this.limiteIzquierda = new Celda(centroX, centroY + this.alto / 3, 1, this.alto / 3);
	this.limiteDerecha = new Celda(centroX + this.ancho - 1, centroY + this.alto / 3, 1, this.alto / 3);

	this.colisionArriba = false;
	this.colisionAbajo = false;
	this.colisionIzquierda = false;
	this.colisionDerecha = false;

	//convertir positivos en negativos y viceversa
	posicionInicialEnPixeles.x *= -1;
	posicionInicialEnPixeles.y *= -1;

	this.posicionEnMapaEnPixeles = new Coordenada(this.posicionCentrada.x + posicionInicialEnPixeles.x,
		this.posicionCentrada.y + posicionInicialEnPixeles.y);

	this.aplicarEstilos();
}

Jugador.prototype.aplicarEstilos = function() {
	$("#jugador").css({"position":"absolute",
	"left":this.posicionCentrada.x + "px",
	"top": this.posicionCentrada.y + "px",
	"width":this.ancho + "px",
	"height":this.alto + "px",
	"zIndex":11,
	"background":"url('" + this.rutaHojaSprites + "')",
	"backgroundPosition":"-" + this.origenXSprite + "px -" + this.origenYSprite + "px",
	});
}

Jugador.prototype.comprobarColisiones = function(mapa) {
	this.colisionArriba = false;
	this.colisionAbajo = false;
	this.colisionIzquierda = false;
	this.colisionDerecha = false;
	
	if (!this.limiteArriba.cruza(mapa.limiteMapa)) {
		this.colisionArriba = true;
	}
	if (!this.limiteAbajo.cruza(mapa.limiteMapa)) {
		this.colisionAbajo = true;
	}
	if (!this.limiteIzquierda.cruza(mapa.limiteMapa)) {
		this.colisionIzquierda = true;
	}
	if (!this.limiteDerecha.cruza(mapa.limiteMapa)) {
		this.colisionDerecha = true;
	}
	
	for (var i = 0; i < mapa.celdasColisiones.length; i++) {
		var traduccionTemporalColision = new Celda(
			mapa.celdasColisiones[i].x + mapa.posicion.x,
			mapa.celdasColisiones[i].y + mapa.posicion.y,
			mapa.celdasColisiones[i].ancho,
			mapa.celdasColisiones[i].alto
		);
		
		if(this.limiteArriba.cruza(traduccionTemporalColision)) {
			this.colisionArriba = true;
		}
		if(this.limiteAbajo.cruza(traduccionTemporalColision)) {
			this.colisionAbajo = true;
		}
		if(this.limiteIzquierda.cruza(traduccionTemporalColision)) {
			this.colisionIzquierda = true;
		}
		if(this.limiteDerecha.cruza(traduccionTemporalColision)) {
			this.colisionDerecha = true;
		}
	}
}

Jugador.prototype.moverEnMapaPrincipal = function() {
	this.velocidadX = 0;
	this.velocidadY = 0;

	if(!this.colisionArriba && teclado.teclaPulsada(controlesTeclado.arriba)) {
		this.velocidadY += this.velocidadMovimiento;
	}
	if(!this.colisionAbajo && teclado.teclaPulsada(controlesTeclado.abajo)) {
		this.velocidadY -= this.velocidadMovimiento;
	}
	if(!this.colisionIzquierda && teclado.teclaPulsada(controlesTeclado.izquierda)) {
		this.velocidadX += this.velocidadMovimiento;
	}
	if(!this.colisionDerecha && teclado.teclaPulsada(controlesTeclado.derecha)) {
		this.velocidadX -= this.velocidadMovimiento;
	}

	this.posicionEnMapaEnPixeles.x += this.velocidadX;
	this.posicionEnMapaEnPixeles.y += this.velocidadY;
}

Jugador.prototype.moverEnNivel = function() {
	this.velocidadX = 0;
	this.velocidadY = 0;

	if(this.saltoBloqueado && this.colisionAbajo && !teclado.teclaPulsada(controlesTeclado.saltar)) {
		this.saltoBloqueado = false;
		this.velocidadCaida = 0;
		console.log();
	}

	if(!this.saltoBloqueado && teclado.teclaPulsada(controlesTeclado.saltar)) {
		this.subiendo = true;
		this.saltoBloqueado = true;
	}

	if (!this.colisionArriba && this.subiendo) {
		this.framesAereos--;

		//salto
		this.velocidadY = 1 * this.velocidadMovimiento + this.framesAereos;
		
		if(this.framesAereos <= 0) {
			this.subiendo = false;
			this.framesAereos = this.framesAereosMaximos;
		}
	}

	if (!this.colisionAbajo && !this.subiendo) {
		this.velocidadY = Math.round(-this.velocidadCaida);
		console.log(this.velocidadY);
		if(this.velocidadCaida < this.velocidadTerminal) {
			this.velocidadCaida += 0.2;
		}
	}
	//velocidad de movimiento
	if(!this.colisionIzquierda && teclado.teclaPulsada(controlesTeclado.izquierda)) {
		this.velocidadX = 1.5 * this.velocidadMovimiento;
	}

	if(!this.colisionDerecha && teclado.teclaPulsada(controlesTeclado.derecha)) {
		this.velocidadX = -1.5* this.velocidadMovimiento;
	}

	this.posicionEnMapaEnPixeles.x += this.velocidadX;
	this.posicionEnMapaEnPixeles.y += this.velocidadY;
}

Jugador.prototype.dirigir = function() {
	if(this.velocidadX < 0) { //izquierda
		this.origenXSprite = this.ancho * 3;
	}
	if(this.velocidadX > 0) { //derecha
		this.origenXSprite = this.ancho * 3;
	}
	//si estamos en el mapa principal habilitaremos abajo y arriba
	if(this.nivelJuego == listadoNiveles.MAPAPRINCIPAL){
	if(this.velocidadY < 0) { //abajo
		this.origenXSprite = 0;
	}
	if(this.velocidadY > 0) { //arriba
		this.origenXSprite = this.ancho * 6;
	}
	if(this.velocidadX < 0  || this.velocidadY < 0 || this.velocidadY > 0) { //izquierda
		document.getElementById("jugador").style.transform = "scaleX(1)";
	}
} //fin controles mapamundo
	if(this.velocidadX > 0) { //derecha
		document.getElementById("jugador").style.transform = "scaleX(-1)";
	}
	
	if(this.nivelJuego == listadoNiveles.NIVEL){
		if(this.velocidadX < 0 ) { //izquierda
			document.getElementById("jugador").style.transform = "scaleX(1)";
		}
	}
}
	document.getElementById("jugador").style.backgroundPosition = "-" + this.origenXSprite + "px -" + this.origenYSprite + "px";


Jugador.prototype.animar = function() {
	if(this.velocidadX == 0 && this.velocidadY == 0) {
		this.framesAnimacion = 0;
		return;
	}

	this.framesAnimacion++;
	
	let paso1 = 10;
	let paso2 = 20;
	let origenXSpriteTemporal = this.origenXSprite;

	if(this.framesAnimacion > 0 && this.framesAnimacion < paso1) {
		origenXSpriteTemporal += this.ancho;
	}
	if(this.framesAnimacion >= paso1 && this.framesAnimacion < paso2) {
		origenXSpriteTemporal += this.ancho * 2;
	}
	if(this.framesAnimacion == paso2) {
		this.framesAnimacion = 0;
	}

	document.getElementById("jugador").style.backgroundPosition = "-" + origenXSpriteTemporal + "px -" + this.origenYSprite + "px";
}
///////////////////////////////
//Animar en nivel
//////////////////////////////
Jugador.prototype.animarEnNivel = function() {
	if(this.velocidadX == 0 && this.velocidadY == 0) {
		this.framesAnimacion = 0;
		return;
	}
	//si no podemos saltar omitimos las animaciones
	if (this.saltoBloqueado){
		return;
	}
	this.framesAnimacion++;
	
	let paso1 = 10;
	let paso2 = 20;
	let origenXSpriteTemporal = this.origenXSprite;

	if(this.framesAnimacion > 0 && this.framesAnimacion < paso1) {
		origenXSpriteTemporal += this.ancho;
	}
	if(this.framesAnimacion >= paso1 && this.framesAnimacion < paso2) {
		origenXSpriteTemporal += this.ancho * 2;
	}
	if(this.framesAnimacion == paso2) {
		this.framesAnimacion = 0;
	}

	document.getElementById("jugador").style.backgroundPosition = "-" + origenXSpriteTemporal + "px -" + this.origenYSprite + "px";
}
Jugador.prototype.actualizar = function(registroTemporal, mapa) {
	if(this.nivelJuego == listadoNiveles.MAPAPRINCIPAL) {
		this.comprobarColisiones(mapa);
		this.moverEnMapaPrincipal();
		this.dirigir();
		this.animar();
	}

	if(this.nivelJuego == listadoNiveles.NIVEL) {
		this.comprobarColisiones(mapa);
		this.moverEnNivel();
		this.dirigir();
		this.animar();
	}
}