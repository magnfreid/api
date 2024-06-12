import { getNameFromUrl, searchCharacter, searchPlanet } from './services.js';

const resultTds = document.querySelectorAll('.show-result td');
const searchField = document.querySelector('.search-field');
const searchButton = document.querySelector('.search-button');
const clearButton = document.querySelector('.clear-button');
const radioButtonCharacter = document.querySelector('.search-radio-person');
const radioButtonPlanet = document.querySelector('.search-radio-planet');
const searchResultOutput = document.querySelector('.search-result ol');
searchButton.addEventListener('click', onClickSearch);
clearButton.addEventListener('click', onClickClear);

/* 
Searcherna returnerar en array... ett element behöver väljas ut innnan den petas in i show-funktionerna
Kanske via en lista av sök-resultat?
*/

async function onClickSearch() {
  const searchString = searchField.value;
  clearSearchHistory();
  if (radioButtonCharacter.checked) {
    const resultsArray = await searchCharacter(searchString);
    console.log(resultsArray);
    listSearches(resultsArray, showCharacter);
  } else if (radioButtonPlanet.checked) {
    const resultsArray = await searchPlanet(searchString);
    listSearches(resultsArray, showPlanet);
  }
}

function clearSearchHistory() {
  while (searchResultOutput.firstChild) {
    searchResultOutput.removeChild(searchResultOutput.firstChild);
  }
}

function onClickClear() {
  searchField.value = '';
  clearSearchHistory();
}

async function showCharacter(characterData) {
  if (characterData != null) {
    const character = characterData;
    const name = character.name;
    const gender = character.gender;
    const specie =
      character.species.length > 0
        ? await getNameFromUrl(character.species[0])
        : 'Unknown';
    const homeworld = await getNameFromUrl(character.homeworld);
    const starship =
      character.starships.length > 0
        ? await getNameFromUrl(character.starships[0])
        : 'None';
    resultTds.forEach((td) => {
      switch (td.className) {
        case 'character-name':
          td.innerText = name;
          break;
        case 'character-gender':
          td.innerText = gender;
          break;
        case 'character-specie':
          td.innerText = specie;
          break;
        case 'character-homeworld':
          td.innerText = homeworld;
          break;
        case 'character-starship':
          td.innerText = starship;
          break;
        default:
          break;
      }
    });
  } else {
  }
}

function showPlanet(planetData) {
  if (planetData != null) {
    const planet = planetData;
    const name = planet.name;
    const population = planet.population;
    const climate = planet.climate;
    const terrain = planet.terrain;
    const gravity = planet.gravity;
    resultTds.forEach((td) => {
      switch (td.className) {
        case 'planet-name':
          td.innerText = name;
          break;
        case 'planet-population':
          td.innerText = population;
          break;
        case 'planet-climate':
          td.innerText = climate;
          break;
        case 'planet-terrain':
          td.innerText = terrain;
          break;
        case 'planet-gravity':
          td.innerText = gravity;
          break;
        default:
          break;
      }
    });
  }
}

//Tar in en array och vilken funktion som ska användas på click
function listSearches(searchResult, onClick) {
  if (searchResult != null) {
    const searchDataArray = searchResult;
    searchDataArray.forEach((object) => {
      const searchResult = document.createElement('li');
      const name = object.name;
      searchResult.innerText = name;
      searchResult.addEventListener('click', () => onClick(object));
      searchResultOutput.appendChild(searchResult);
    });
  } else {
    const message = document.createElement('li');
    message.innerText = 'Nothing found';
    searchResultOutput.appendChild(message);
  }
}
