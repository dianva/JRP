////////////////////////////////////
//mainLoop - bucle principal
////////////////////////////////////
//aps - ver las actualizaciones por segundo
//fps - ver frames por segundo
var mainLoop = {
	ejecucion: null, //guarda el id de la ejecucion actual
	ultimoRegistro: 0,
	aps: 0,
	fps: 0,
	repetir: function(registroTemporal) {
		mainLoop.ejecucion = window.requestAnimationFrame(mainLoop.repetir);
		mainLoop.actualizar(registroTemporal);
		mainLoop.dibujar();	

		if(registroTemporal - mainLoop.ultimoRegistro > 999) { //1 segundo = 1000 milisegundos
			mainLoop.ultimoRegistro = registroTemporal;
			console.log("APS: " + mainLoop.aps + " | FPS: " + mainLoop.fps); //mostrar los fps y aps por segundo
			mainLoop.aps = 0; //reiniciar aps
			mainLoop.fps = 0; //reiniciar fps
		}
	},
	detener: function() {
	},
	actualizar: function(registroTemporal) {
		maquinaNiveles.actualizar(registroTemporal);
		mainLoop.aps++;
	},
	dibujar: function(registroTemporal) {
		maquinaNiveles.dibujar();
		mainLoop.fps++;
	}
};