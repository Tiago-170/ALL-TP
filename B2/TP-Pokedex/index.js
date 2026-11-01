const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const PORT = 5001;
const fileNames = ['pokedex', 'items', 'moves', 'types'];

function readJson(filePath, res, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Cannot read dataset file' });
      return;
    }

    try {
      callback(JSON.parse(data));
    } catch (parseErr) {
      console.error('Invalid JSON file:', parseErr);
      res.status(500).json({ error: 'Dataset file is invalid JSON' });
    }
  });
}

function findAll(filePath, res) {
  readJson(filePath, res, (dataset) => {
      res.json(dataset);
    });
}


function findOneByRandom(pokedexPath, res) {
  readJson(pokedexPath, res, (pokemons) => {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const pokemon = pokemons[randomIndex];
    res.json(pokemon);
  });
  return;
}

function findOneById(pokedexPath, id, res, fileName) {
  const idNombre = parseInt(fileName, 10);

  readJson(pokedexPath, res, (pokemons) => {
    const pokemon = pokemons.find((entry) => entry.id === idNombre);
    if (!pokemon) {
      res.status(404).json({ error: 'Pokemon not found' });
      return;
    }
    res.json(pokemon);
  });
  return;
}

function findOneByName(pokedexPath, name, res) {
  readJson(pokedexPath, res, (pokemons) => {
    const pokemon = pokemons.find((entry) => {
      return entry.name.french.toLowerCase() === name.toLowerCase();
    });
    if (!pokemon) {
      res.status(404).json({ error: 'Pokemon not found' });
      return;
    }
    res.json(pokemon);
    return;
  });
}

function limitRequests(req, maxRequests = 10, timeWindow = 60000) {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!req.app.locals.requestCounts) {
    req.app.locals.requestCounts = {};
  }

  if (!req.app.locals.requestCounts[ip]) {
    req.app.locals.requestCounts[ip] = [];
  }

  req.app.locals.requestCounts[ip] = req.app.locals.requestCounts[ip].filter(
    (timestamp) => currentTime - timestamp < timeWindow
  );

  if (req.app.locals.requestCounts[ip].length >= maxRequests) {
    return false;
  }

  req.app.locals.requestCounts[ip].push(currentTime);
  return true;
}

function response(res, fileName) {
  const isDataset = fileNames.includes(fileName);
  const isNumericId = /^\d+$/.test(fileName);
  const isRandom = fileName === 'random';

  const pokedexPath = path.join("./DATA", 'pokedex.json');
  const filePath = path.join("./DATA", `${fileName}.json`);

  if (!isDataset && !isNumericId && !isRandom) {
    findOneByName(pokedexPath, fileName, res);
    return;
  }
  
  if (fileName === 'random') {
    findOneByRandom(pokedexPath, res);
    return;
  }

  if (/^\d+$/.test(fileName)) {
    findOneById(pokedexPath, fileName, res, fileName);
    return;
  }

  if (fileNames.includes(fileName)) {
    findAll(filePath, res);
    return;
  }
}

app.use((req, res, next) => {
  if (!limitRequests(req, 1, 1000)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }
  next();
});

app.get('/api/v1/pokemons', (req, res) => {
  response(res, 'pokedex');
});

app.get('/api/v1/pokemons/:fileName', (req, res) => {
  response(res, req.params.fileName.toLowerCase());
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server Pokedex is listening on ' + PORT);
});
