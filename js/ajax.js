var ajax = {
	cargarArchivo: function(ruta, datos) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState == XMLHttpRequest.DONE) { //si la request ha acabado
				if (request.status == 200) { //si la request ha tenido exito
					datos(JSON.parse(request.responseText)); //cargamos el json
				} else if (request.status == 400) {//si la request ha fallado 
					console.log("error");
				} else {//otro tipo de error
					console.log("error inesperado");
				}
			}
		};
		request.open("GET", ruta, true);
		request.send();
	}
}