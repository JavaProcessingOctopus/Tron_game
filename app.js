app = require('express.io')()
app.http().io()
ModuleJeu = require('./Jeu.js');

tableauJoueurs = []; // buffer de joueurs ? rajouter au jeu
tableauDirection = []; //buffer de joeur + direction

//donner la page html au joueur
// Send the client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html')
})

app.get('/css/style.css', function(req, res) {
    res.sendfile(__dirname + '/css/style.css')
})
app.get('/css/reset.css', function(req, res) {
    res.sendfile(__dirname + '/css/style.css')
})
app.get('/js/jquery.js', function(req, res) {
    res.sendfile(__dirname + '/js/jquery.js')
})

app.get('/js/myscript.js', function(req, res) {
    res.sendfile(__dirname + '/js/myscript.js')
})

//accepterJoueurs
app.io.route('ready', function(req){//ajouter un joeur au buffer et sauvegarder son socket
	tableauJoueurs.push(req.data);
	req.io.emit('connected')//envoie les donnee au les joueur
	 var donee = req.io;
	req.io.emit("add");
    //sauvegarder req.io, c'est le socket pour contacter CE joueur.
    console.log("player "+req.data+" is ready")
})

app.io.route('change-direction', function(req){
    //ajoute le nom du joeur avec sa direction dans tableauDirection
	var i = 0;
	var nom = req.data.nom;
	var direction = req.data.direction;
	var objet = {nom,direction};
	while (tabDirection[i].nom!==req.data.nom){ // on suppose que le tableau contient tout les joueurs à tout moment
		i++;
	}
	tabDirection[i]=objet;
	console.log("direction changed")
	req.io.broadcast(tabDirection)
})

function live(){ //boucle du jeu, donne les commande au jeux et contacte les joeurs
  	while(true){ //boucle du jeu, donne les commande au jeux et contacte les joeurs
		while(tabJoueur.length>0){ //ajoute les joueurs
			Jeu.addJoueur(tabJoueur.pop());
		}

		if(Jeu.joueurs.length>1 && !Jeu.active){ //si on a plus d'un joueur et le jeu n'est pas actif
			Jeu.start(); //on demarre le jeu
		}
		if(Jeu.active){
			while(tabJoueur.length>0){ //change les directions des joueurs
				Jeu.changeDirection(tabDirection.pop());
			}

			Jeu.next();
			var morts = Jeu.collision(); //morts recupere un tableau de joueur mort a contacter
			var j;
			/*for (var i = 0; i<morts.length; i++){
				j = 0;
				while (tabJoueur[j]!==tabJoueur[i]){
					j++;
				}
				tabJoueur.splice(j, 1);
			}*/
			app.broadcast('update', Jeu.state());
			if(Jeu.end()){
				var win = jeu.winner(); //on sauvegarde le gagnant qu'on contactera si il y en a un
				if (win !== null){
					req.io.emit('talk', {
						message: 'vous avez gagné !'
					})
				}
				Jeu.reset();//on prepare le jeux pour la prochaine partis
			}
		}
	}
    setTimeout(live, 500);
}

console.log("starting server")

app.listen(7076)