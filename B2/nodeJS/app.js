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
        if(page == "/etape1" && req.headers['authorization'] == 'test') {
            res.writeHead(200, {"Content-Type": "text/plain"});

            if("name" in params && params.name == "Tiago") {
                res.end("Bonjour " + params.name + " !");
            }
            else {
                res.end("Tu n'est pas le bien venue " + params.name);
            }
        }
        else if(page == "/bearer-token" && req.headers['authorization'] == 'Bearer test') {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("Bearer");
        }
        else if(page == "/basic-auth" && req.headers['authorization'] == `Basic ${btoa(unescape(encodeURIComponent('test:test')))}`) {
            
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("basic");
        }
        else if(page == "/api-key" && req.headers['api-key'] == 'test') {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("API key");
        }
        else {
            res.writeHead(401, {"Content-Type": "text/plain"});
            res.end("erreur 401 : vous n'avez pas les permissions");
        }

    }
);
// Démarrage du serveur sur le port 8085
server.listen(8085);
console.log(`Basic ${btoa(unescape(encodeURIComponent('test:test')))}`)
