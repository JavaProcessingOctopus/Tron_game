app = require('express.io')()
app.http().io()
ModuleJeu = require('./Jeu.js');

tabJoueur = []; // buffer de joueurs ? rajouter au jeu
tabDirection = []; //buffer de joeur + direction

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
	var objet = {};
	objet.nom = req.data;
	objet.socket = req.io;
	tabJoueur.push(objet);
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
	console.log("direction changed");
	req.io.broadcast(tabDirection);
})

function live(){ //boucle du jeu, donne les commande au jeux et contacte les joeurs
    while(tabJoueur.length>0){ //ajoute les joueur
    	var Joueur = tabJoueur.pop();
    	var nomJoueur = Jeu.addJoueur(Joueur.nom);
        var objet = {};
        objet.nom = nomJoueur;
        objet.direction = null;
        tabDirection.push(objet);
        Joueur.socket.emit('connected', nomJoueur);
        Joueur.socket.emit('update', Jeu.curState());
        //ajouter a direction avec nom
    }
    
    if(Jeu.joueurs.length>1 && !Jeu.active){ //si on a plus d'un joueur et le jeu n'est pas actif
        Jeu.start(); //on d?mmarre le jeu
    }

    if(Jeu.active){

        //changer direction
        for(var i = 0; i<tabDirection.length; i++) {
            Jeu.changeDirection(tabDirection[i].nom, tabDirection[i].direction);
        }

        Jeu.next();
        var morts = Jeu.collision(); //morts recupere un tableau de joeur mort a contacter
        app.io.broadcast('lost', morts);
        
        app.io.broadcast('update', Jeu.newState());
        if(Jeu.end()){
            var win = jeu.winner(); //on sauvegarde le gagnant qu'on contactera si il y en a un
            if(win !== null) app.io.broadcast('win', win);
            Jeu.reset();//on pr?pare le jeux pour la prochaine partis
        }
    }
    setTimeout(live, 500);
}


app.listen(7076)