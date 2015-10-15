function trace(nomJoueur, coordonee) {
    this.nomJoueur = nomJoueur;
    this.coordonee = coordonee;
}

function coordonee(x, y) {
    this.x = x;
    this.y = y;
    this.copy = function() {
        return new coordonee(this.x, this.y);
    };
}