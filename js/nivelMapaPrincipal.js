function nivelMapaPrincipal(idnivel, rutaMapaJSON, xInicial, yInicial) {
	var that = this;
	this.mapaListo = false;
	this.mapa = null;
	this.Jugador = null;
	ajax.cargarArchivo(rutaMapaJSON, function(objetoJSON) {
		that.mapa = new Mapa(objetoJSON, idnivel);
		that.mapaListo = true;
		that.Jugador = new Jugador(new Coordenada(xInicial, yInicial), idnivel);
		console.log("mapa cargado por AJAX");
	});
}
	//control para no repetir acciones como luchar o entrar
	var lucharLocalizacion=true;
	var ePulsada=true;
nivelMapaPrincipal.prototype.actualizar = function(registroTemporal) {
	if (!this.mapaListo || this.mapa == null || this.Jugador == null) {
		return;
	}
	
	this.Jugador.actualizar(registroTemporal, this.mapa);
	this.mapa.actualizar(registroTemporal, this.Jugador.posicionEnMapaEnPixeles);

	let localizacionAtravesada = false;
	
	for(var i = 0; i < this.mapa.celdasLocalizaciones.length; i++) {
		let rActual = this.mapa.celdasLocalizaciones[i].celda;
		let nombre = this.mapa.celdasLocalizaciones[i].nombre;
		let rTemporal = new Celda(rActual.x + this.mapa.posicion.x,
		rActual.y + this.mapa.posicion.y, rActual.ancho, rActual.alto);
		let objetoEntradaLocalizacion = null;
		if(rTemporal.cruza(this.Jugador.celdaGeneral)) {
			localizacionAtravesada = true;
			objetoEntradaLocalizacion = registroLocalizaciones.obtenerLocalizacion(nombre);
			if(!popup.mostrar) {
				popup.ver(dimensiones.ancho / 2 - 150, dimensiones.alto / 2 - 100,
				300, nombre);
			}
			//Ejecutar la accion de luchar una vez x F pulsada
			if(!teclado.teclaPulsada(controlesTeclado.entrar)){
				ePulsada=true;
			}
			if(teclado.teclaPulsada(controlesTeclado.entrar) && ePulsada==true) {
				//Volver al mapa principal (es importante comprobar eso por el tema de los controles del jugador)
				if(nombre=="mapa principal"){
					maquinaNiveles.cambiarnivel(listadoNiveles.MAPAPRINCIPAL, objetoEntradaLocalizacion);
					ePulsada=false;
				}else{
				maquinaNiveles.cambiarnivel(listadoNiveles.NIVEL, objetoEntradaLocalizacion);
				console.log(objetoEntradaLocalizacion);
				ePulsada=false;
			}
			}
			//Ejecutar la accion de luchar una vez x F pulsada
			if(!teclado.teclaPulsada(controlesTeclado.luchar)){
				lucharLocalizacion=true;
			}
			//Luchar
			if(teclado.teclaPulsada(controlesTeclado.luchar) && lucharLocalizacion==true) {
				console.log(nombre);

				//bloquear la funccion hasta que se suelte la tecla
				lucharLocalizacion=false;		
			}
		}

		if(!localizacionAtravesada && popup.mostrar) {
			popup.ocultar();
			
		}
	}
}

nivelMapaPrincipal.prototype.dibujar = function() {
	if (!this.mapaListo) {
		return;
	}
	this.mapa.dibujar();
}