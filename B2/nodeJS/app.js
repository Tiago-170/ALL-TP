// Importer le module http
// Il contient toutes les méthodes necessaires
// pour la création d'un serveur ainsi que des requêtes HTTP
const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Création du serveur
const server = http.createServer(
    // Fonction anonyme qui "récupère" de la méthode http.createServer
    // les paramètres req: REQUEST et res: RESPONSE
    function(req, res) 
    {   
        const page = url.parse(req.url).pathname;
        console.log("Page: " + page);
        const params = querystring.parse(url.parse(req.url).query);
        if(page == "/etape1") {
            res.writeHead(200, {"Content-Type": "text/plain"});
        }
        else {
            res.writeHead(404, {"Content-Type": "text/plain"});
        }

        if("name" in params && params.name == "Tiago") {
            res.end("Bonjour " + params.name + " !");
        }else {
            res.end("Tu n'est pas le bien venue " + params.name);
        }
    }
);
// Démarrage du serveur sur le port 8085
server.listen(8085);