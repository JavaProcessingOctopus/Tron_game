function Joueur(nom) {
    this.nom = nom;
    this.direction = null;
    this.position = null;
    
    this.changeDirection = function (direction) {
        this.direction = direction;
        return this
    };
    this.avancer = function () {
        if(this.direction == "right"){
            this.position.x++; 
        }else if(this.direction == "left"){
            this.position.x--;    
        }else if(this.direction == "up"){ 
            this.position.y--;
        }else if(this.direction == "down"){ 
            this.position.y++;
        }
        return this;
    };
}

