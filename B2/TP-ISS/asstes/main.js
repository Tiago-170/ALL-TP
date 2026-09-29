class Iss {
    // Envoie une requete à l'API et retourne les données de l'ISS
    async findIssPosition() {
        //url de l'API
        const url = "http://api.open-notify.org/iss-now.json";
        try {
            // envoie la requete
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            
            // retourne les données
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error.message);
        }
    }

    // traite les données et place le marqueur
    async addMarker(map, issIcon) {
        const issDatas = await this.findIssPosition();
        const issPosition = issDatas.iss_position;
        var marker = L.marker([issPosition.latitude, issPosition.longitude], {icon: issIcon}).addTo(map);
    }
}

// objet de la classe ISS
const IssObject = new Iss();

// recupére la position de l'ISS
const positionIssDebut = (await IssObject.findIssPosition()).iss_position;

// place l'utilisateur sur l'ISS
var map = L.map('map').setView([positionIssDebut.latitude, positionIssDebut.longitude], 4);

// affiche la carte
L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
    maxZoom: 10,
    minZoom: 4,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// icon
var issIcon = L.icon({
    iconUrl: './assets/img/iss.svg',

    iconSize:     [164, 164], // taille de l'icon
    iconAnchor:   [32, 32] // point de fixation de l'icon
});

// place le premier marqueur
IssObject.addMarker(map, issIcon);

// crée un interval qui place un point toutes les 20 secondes
setInterval(() => IssObject.addMarker(map, issIcon), 20000); //20 sec