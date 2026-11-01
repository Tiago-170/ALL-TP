# TP - Serveur API REST Pokédex

## 1. Présentation du projet

Ce projet consiste en la réalisation d'un serveur backend d'API REST en Node.js avec le framework Express.
L'objectif est de proposer une API qui renvoie des données au format JSON sur les pokemons


## 2. Arborescence du projet

```
BACKEND
├── DATA
│ ├── items.json
│ ├── moves.json
│ ├── pokedex.json
│ └── types.json
├── FILES
│ ├── images
│ ├── sprites
│ └── thumbnails
├── .gitignore
├── index.js
└── README.md
```

## 3. Prérequis et installation

Node.js

Installation des modules express
```
npm install express
```

## 4. Utilisation
Le serveur démarre et écoute sur le port local 5001.
Pour lancer le serveur :
```
node --watch index.js
```
## 5. Endpoints

```
/api/v1/pokemons

/api/v1/pokemons/random

/api/v1/pokemons/:id

/api/v1/pokemons/:name
```
