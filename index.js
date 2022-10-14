
import pokedex from "./pokedex.json" assert {type: 'json'};
import express from 'express'
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send(pokedex)
});

app.get('/pokemon/:name', (req, res) => {
    let pokemonFound = findPokemonByName(req.params.name)
    res.send(pokemonFound)
});

app.put('/pokemon/:name', (req, res) => {
    const {name, type, base} = req.body;

    let pokemonFromJson = findPokemonByName(req.params.name);

    let newInfo = {
        "id": pokemonFromJson.id,
        "name": {
            "english": name
        },
        "type": type,
        "base": base
    }


    let pokemonFound = pokedex.find(pokemon => pokemon.name.english == req.params.name)
    pokemonFound = newInfo
    res.send()

})

app.post('/pokemon', (req, res) => {
    const {name, type, base} = req.body;
    const newPokemon = {
        "id": pokedex.length +1,
        "name": {
            "english": name.english
        },
        "type": type,
        "base": base
    }

    pokedex.push(newPokemon);
    res.send(req.body)
})

app.delete('pokemon/:name', (req, res) => {
    pokedex.find(pokemon => pokemon.name.english ==req.params.name) = null;
})

const findPokemonByName = (pokeName) => {
    return pokedex.filter((pokemon) => pokemon.name.english==pokeName)
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))