var Coordonnee = require("./Coordonnee.js");
var Joueur = require('./Joueur.js');

var joueurs = [];
var canvas = [];
var active = false;
var HAUTEUR = 40;
var LARGEUR = 70;
		
var start = function () {	//
	active = true;
};
		
var coorLibre = function () {
    if (typeof(canvas[2][2]) !== 'undefined') { //exemple de test pour une coordonnée prefférer de dépard
        return new Coordonnee(2, 2);
    }
    
    //parcous de tout le canvas
    for (i = 0;  i < LARGEUR-1; i++) {
        for (j = 0; j < HAUTEUR; j++) {
            if (typeof(canvas[i][j]) !== 'undefined') { //exemple de test pour une coordonnée prefférer de dépard
                return new Coordonnee(i, j);
            }
        }
    }
};
    
var defaultDirection = function (coordonnee) { //determine la bonne direction a donner initialement au joueur
    var direction = null;
            
    if (coordonnee.x < HAUTEUR / 2) { //en haut
        if (coordonnee.y < LARGEUR / 2) { //en haut a gauche
            direction = "right";
        } else { //en haut a droite
            direction = "down";
        }
    } else { //en bas
        if (coordonnee.y < LARGEUR / 2) { //en bas a gauche
            direction = "up";
        } else { //en bas a droite
            direction = "left";
        }
    }
            
    return direction;
};

var prendreCoor = function (coordonnee) { //ajoute une marque a canvas a la coordonne
    canvas[coordonnee.x][coordonnee.y] = true;
};

var checkName = function (joueur) { //vérifie si un nom est libre et renvois un nom libre si il est pris
    var joueur = joueur;
    for (i = 0; i < joueurs.length; i++) {
        if (joueurs[i] === joueur) {
            var lastCar = joueur.charAt(joueur.length - 1);
            if (!isNaN(lastCar)) {
                lastCar++;
                joueur = joueur.slice(0, joueur.length - 1).concat(lastCar);//put lastCar++ at joueur.charAt(joueur.length - 1)
            } else {
                joueur = joueur.concat(1);    //put 1 at the end of joueur
            }
        }
    }
    return joueur;
};

var addJoueur = function (joueur) {	 //ajoute le nouveau joeur a this.joueurs, donne une coordonnee libre a joueur, et renvois le nom de joueur car il peut etre changer si le nom donner est déja pris
    var joueur = checkName(joueur);
    var jo = new Joueur(joueur);
    jo.position = coorLibre();
    prendreCoor(jo.position);
    jo.direction = defaultDirection(jo.position);
    joueurs.push(jo);
    return joueur;
};
		
var changeDirections = function (name, direction) {
    var nom = nom;
    var direction = direction;  // a initialiser en fonction de data recu
            
    for (i = 0; i < joueurs.length; i++) {
        if (joueurs[i].nom === nom) {
            joueurs[i].nom.changeDirection(direction);
            break;
        }
    }
};

var next = function () {	 //fais avancer tous les joueur et met a jour les trace
    for (i = 0; i < joueurs.length(); i++) {
        joueurs[i].avancer();
        canvas[joueurs[i].position.x][joueurs[i].position.y] =  true;
    }
};
		
var curState = function () { //renvois le fichier JSON a donner au client
    var table = [];
    for (i = 0; i < joueurs.length; i++) {
        var object = {};
        object.nom = joueurs[i].nom;
        object.trace = joueurs[i].trace;
        table.push(object);
    }
            
    return JSON.stringify(table);
};

var newState = function () { //renvois le fichier JSON a donner au client
    var table = [];
    for (i = 0; i < joueurs.length; i++) {
        var object = {};
        object.nom = joueurs[i].nom;
        object.trace = joueurs[i].position;
        table.push(object);
    }
            
    return JSON.stringify(table);
};

var outOfCanvas = function (coordonnee) {
    return coordonnee.x > LARGEUR || coordonnee.x < 0 || coordonnee.y > HAUTEUR || coordonnee.y < 0;
};
    
var collision = function () {	//renvois les joueurs qui on fait une collision
    var res = [];
    var found = false;
    for (i = 0; i < joueurs.length; i++) { //On vérifie pour chaque joueur qu'il n'y a pas de collision
        if (outOfCanvas(joueurs[i].position)) {
            res.push(joueurs[i].name);
            continue;
        }
        for (j = 0; j < joueurs.length; j++) { //En parcourant tous les joueurs
            for (k = 0; k < joueurs[j].trace.length; k++) { //et en inspéctant toutes les coordonnée ou il on été.
                if (joueurs[i].position.equals(joueurs[j].trace[k])) {
                    res.push(joueurs[i].name);
                    found = true;
                    break;
                }
            }
            if (found) {
                found = false;
                break;
            }
        }
    }
	return res;
};
		
var end = function () {	//renvois true si il y a 1 joueur ou moins
    return (joueurs.length < 2);
};
		
var winner = function () {	//renvois le gagnant
    if (joueurs.length === 1) {
        return joueurs[0].nom;
    }
    return null;
};
	    
var reset = function () {
    active = false;
    joueurs = [];
    canvas = [];
    //vide variable
};

module.exports.start = start;
module.exports.active = active;
module.exports.addJoueur = addJoueur;
module.exports.changeDirection = changeDirections;
module.exports.next = next;
module.exports.curState = curState;
module.exports.newState = newState;
module.exports.collision = collision;
module.exports.end = end;
module.exports.winner = winner;
module.exports.reset = reset;