// ctrl + f5 - recargar limpiando la caché

var inicio = {
	iniciadores: [
		maquinaNiveles.iniciar(),
		teclado.iniciar(),
		mainLoop.repetir()
	],
	iniciarJuego: function() {
		inicio.encadenarInicios(inicio.iniciadores.shift());
	},
	encadenarInicios: function(iniciador) {
		if(iniciador) {
			iniciador(() => inicio.encadenarInicios(iniciadores.shift()));
		}
	}
};
$(document).on('DOMContentLoaded', function() { //iniciar juego al cargar todo el ocntenido del dom
	inicio.iniciarJuego();
}, false);

