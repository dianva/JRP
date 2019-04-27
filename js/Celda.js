function Celda(x, y, ancho, alto, tipo) {
	this.x = x;
	this.y = y;
	this.ancho = ancho;
	this.alto = alto;
	this.idHTML = tipo + "x" + x + "y" + y;
	this.html = '<div id="' + this.idHTML + '"></div>';
}

Celda.prototype.cruza = function(celda) {
	return (this.x < celda.x + celda.ancho &&
		this.x + this.ancho > celda.x &&
		this.y < celda.y + celda.alto &&
		this.alto + this.y > celda.y) ? true : false;
}

