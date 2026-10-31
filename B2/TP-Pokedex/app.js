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

function response(res, fileName) {
  const isDataset = fileNames.includes(fileName);
  const isNumericId = /^\d+$/.test(fileName);
  const isRandom = fileName === 'random';

  if (!isDataset && !isNumericId && !isRandom) {
    res.status(404).json({ error: 'Dataset not found' });
    return;
  }
  const filePath = path.join("./DATA", `${fileName}.json`);

  if (fileName === 'random') {
    const pokedexPath = path.join("./DATA", 'pokedex.json');

    readJson(pokedexPath, res, (pokemons) => {
      const randomIndex = Math.floor(Math.random() * pokemons.length);
      const pokemon = pokemons[randomIndex];
      res.json(pokemon);
    });
    return;
  }

  if (/^\d+$/.test(fileName)) {
    const idNombre = parseInt(fileName, 10);
    const pokedexPath = path.join("./DATA", 'pokedex.json');

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

  if (fileNames.includes(fileName)) {
    readJson(filePath, res, (dataset) => {
      res.json(dataset);
    });
  }
}

app.get('/api/v1/pokemons', (req, res) => {
  response(res, 'pokedex');
});

app.get('/api/v1/pokemons/:fileName', (req, res) => {
  response(res, req.params.fileName.toLowerCase());
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server Pokedex is listening on ' + PORT);
});