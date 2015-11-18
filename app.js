app = require('express.io')()
app.http().io()
ModuleJeu = require('./Jeu.js')
Jeu = new ModuleJeu();

plBff = []; // buffer de joueurs à rajouter au jeu
dirBff = []; //buffer de joeur + direction

//donner la page html au joueur
// Send the client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html')
})

//accepterJoueurs
app.io.route('ready', function(req){//ajouter un joeur au buffer et sauvegarder son socket
	plBff.push(req.data);
	req.io.emit('connected')//envoie les donnee au les joueur
    //sauvegarder req.io, c'est le socket pour contacter CE joueur.
})

app.io.route('change-direction', function(req){
    //ajoute le nom du joeur avec sa direction dans dirBff
})

/*while(true){ //boucle du jeu, donne les commande au jeux et contacte les joeurs
    while(plBff.length>0){ //ajoute les joueur
        Jeu.addJoueur(plBff.pop());
    }

    if(Jeu.joueurs.length>1 && !Jeu.active){ //si on a plus d'un joueur et le jeu n'est pas actif
        Jeu.start(); //on démmarre le jeu
    }
    if(Jeu.active){
        while(plBff.length>0){ //change les direction des joeurs
            Jeu.changeDirection(dirBff.pop());
        }

        Jeu.next();
        var morts = Jeu.collision(); //morts recupere un tableau de joeur mort a contacter
        //...
        app.broadcast('update', Jeu.state());
        if(Jeu.end()){
            var win = jeu.winner(); //on sauvegarde le gagnant qu'on contactera si il y en a un
            //...
            Jeu.reset();//on prépare le jeux pour la prochaine partis
        }
    }
}*/

app.listen(7076)