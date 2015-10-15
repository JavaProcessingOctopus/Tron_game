function Session_jeu(joueurs) {
    this.remplissage;
    this.joueurs = joueurs || [];
    
    this.addJoueur = function (joueur) { //Waring: initializer joueur avant de les ajouter a joueurs
        for (i = 0; i < joueurs.length; i++) {
            if (joueurs[i] === null) {
                joueurs[i] = joueur;
                break;
            }
        }
    };
    
    this.start = function () {
        //donner leur position et direction a tout les joueurs
        for (i = 0; i joueurs.length; i++) {
            var x, y;
            joueurs[i].position = new coordonee(x, y); //TODO decider position et orientation pour chaque joeur
            joueurs[i].direction;
        }
        
        //boucle du jeux
        while (joueurs.length > 1) {
            for (i = 0; i joueurs.length; i++) {
                //avancer
                precCoor = njoueurs[i].position.copy();
                joueurs[i].avancer();
                //mettre a jour trace
                this.remplissage.push(new trace(joueurs[i].nom, precCoor))
            }
            //tester collision
            this.testCollision();
        }
    };
    
    this.testCollision = function() {
        for (i = 0; i joueurs.length; i++) {
            pos = joueurs[i].position;
            for(j = 0; j<jouers.lenght; j++){
                if((pos === joueurs[j].position) && !(j === i)) {
                    if (j>i) j--; //corrige la postion j pour la deuxieme coupe
                    //TODO annoncer au jouer[i] qu'il a perdu
                    joeurs.splice(i, 1); //retire le joueur perdant des joeurs
                    //TODO annoncer au jouer[i] qu'il a perdu
                    joeurs.splice(j, 1); //retire le joueur perdant des joeurs
                }
            
            }
            if (remplissage.includes(pos)) {
                //TODO annoncer au jouer[i] qu'il a perdu
                joeurs.splice(i, 1); //retire le joueur perdant des joeurs
            }
        }
    };
} 
