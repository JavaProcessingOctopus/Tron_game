module.exports = {
    function (nom, direction, coordonee) {
    Coordonnee = require("Coordonnee.js");
    
    this.nom = nom;
    this.direction = direction || null;
    this.position = coordonnee || {};
    this.trace = [];
    
    this.changeDirection = function (direction){
        if(direction == "right" || direction == "left"){
			if(this.direction == "up" || this.direction == "down"){
				this.direction = direction;
			}	
		}else if(direction == "up" || direction =="down"){
			 if(this.direction == "right" || this.direction == "left"){
				this.direction = direction;
			}
		 }
        return this
    };
    this.avancer = function () {
        if(this.direction == "right"){
            this.position.y++; 
        }else if(this.direction == "left"){
            this.position.y--;    
        }else if(this.direction == "up"){ 
            this.position.x++;
        }else if(this.direction == "down"){ 
            this.position.x--;
        }
        return this;
    };
}}