/*/pokemons/1
/pokemons/2
/pokemons/3
/pokemons/4
/pokemons/5
/pokemons/aerodactyl
/pokemons/page/1
/pokemons/page/2
/pokemons/page/3
/pokemons/page/4
/pokemons/page/5*/

const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;

// https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44980285#content
( async() => {

    const fs = require('fs');

    // Ids de Pokemons
    const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
    let fileContent = pokemonIds.map(
        id =>  `/pokemons/${id}`
    ).join('\n');

   // Paginas de Pokemons
   for (let index = 1; index <= TOTAL_PAGES; index++) {
    fileContent += `\n/pokemons/page/${index}`
   }

   // Por nombres de Pokemons
   const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(res => res.json());

   fileContent += '\n';
   fileContent += pokemonNameList.results.map(
    pokemon => `/pokemons/${pokemon.name}`
   ).join('\n');

    fs.writeFileSync('routes.txt', fileContent);

    console.log('routes.txt Generated')

})();