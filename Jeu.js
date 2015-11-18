Jouuer = require('./joueur.js')
module.exports = 
	
	function() {
		this.joueurs = [];
		this.remplissage = [];
	    this.active = false;
	    //this.HAUTEUR
	    //this.LARGEUR
		
		this.start = function(){	//
			this.active = true;
		};
		
		this.addJoueur = function(joueur){	 //ajoute le nouveau joeur a this.joueurs et donne une coordonnee libre a joueur
			this.joueurs.push(joueur);
			joueur.position = coorLibre();
		};
		
		this.coorLibre = function(){	//renvois une coordonnée libre
			//fetching default starting points
			
			//chercher un espace libre a partir d'une coordonnée prédefinis ( || aléatoire?)
		};
		
		this.changeDirections = function(nameAndDirection){};

		this.next = function(){	 //fais avancer tous les joueur et met a jour les trace
			for(i = 0; i < joueurs.length(); i++) {
				jo = joueurs[i]
				remplissage.push(new Trace(jo.nom, jo.position.copy()))
				jo.avancer();
			}
		};
		
		this.state = function(){}; //renvois le fichier JSON a donner au client
		
		this.collision = function(){	//renvois les joueurs qui on fait une collision
			res = [];
			for(i=0; i<remplissage.length(); i++){
				for(j=0; i<joueurs.length(); i++){
					if(remplissage[i].position.equals(joueurs[j].position)){
						res.push(joueurs[j]);
						//retirer j de joueurs?
					}
				}
			}
			return res;
		};
		
		this.end = function(){	//renvois true si il y a 1 joueur ou moins
			return ( joueurs.length < 2 );
		};
		
		this.winner = function(){	//renvois le gagnant
			if(joueurs.length === 1){
				return joueurs[0].nom;
			}
			return null;
		};
	    
	    this.reset = function(){
	    	this.active = false;
	    	//vide variable
	    };
	}
	
