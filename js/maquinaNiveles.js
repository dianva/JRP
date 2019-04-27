var maquinaNiveles = {
	nivelActual: null,
	iniciar: function() {
		maquinaNiveles.cambiarnivel(listadoNiveles.PANTALLA_TITULO);
	},
	cambiarnivel: function(nuevonivel, objetoEntradaLocalizacion) {
		switch(nuevonivel) {
			case listadoNiveles.MAPAPRINCIPAL:
				maquinaNiveles.nivelActual = new nivelMapaPrincipal(listadoNiveles.MAPAPRINCIPAL, "mapas/bosque48.json", 500, 500);
				break;
			case listadoNiveles.NIVEL:
				maquinaNiveles.nivelActual = new nivelMapaPrincipal(listadoNiveles.NIVEL, objetoEntradaLocalizacion.rutaMapa,
					objetoEntradaLocalizacion.coordenadaXInicial, objetoEntradaLocalizacion.coordenadaYInicial);
				//reproducir audio del nivel
				break;
			case listadoNiveles.PANTALLA_TITULO:
				console.log("iniciando pantalla");
				maquinaNiveles.nivelActual = new nivelPantallaTitulo();
				break;
		}
	},
	actualizar: function(registroTemporal) {
		maquinaNiveles.nivelActual.actualizar(registroTemporal);
	},
	dibujar: function() {
		maquinaNiveles.nivelActual.dibujar();
	}
}