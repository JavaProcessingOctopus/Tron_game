function Coordonnee(x, y) {
	this.x = x;
	this.y = y;
		
	this.copy = function () {
		return new Coordonnee(this.x, this.y);
	};
	
	this.equals = function (Coordonnee) {
		return this.x === Coordonnee.x && this.y === Coordonnee.y;
	};
}

module.export = Coordonnee;
