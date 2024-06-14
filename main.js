import { showElement, hideElement, slideTitle } from './js/animations.js';
import {
  getNameFromUrl,
  searchCharacter,
  searchPlanet,
  spawnObiWan,
} from './js/services.js';

const resultTds = document.querySelectorAll('.show-result td');
const characterSection = document.querySelector('.sw-character');
const planetSection = document.querySelector('.sw-planet');
const searchResultSection = document.querySelector('.search-result');
const searchField = document.querySelector('.search-field');
const searchButton = document.querySelector('.search-button');
const clearButton = document.querySelector('.clear-button');
const radioButtonCharacter = document.querySelector('.search-radio-person');
const searchResultOutput = document.querySelector('.search-result ol');
const title = document.querySelector('.title');
const obiButton = document.querySelector('.obi-button');
searchButton.addEventListener('click', onClickSearch);
clearButton.addEventListener('click', onClickClearHistory);
obiButton.addEventListener("click", onClickObiButton)

async function onClickSearch() {
  const searchString = searchField.value;
  if (radioButtonCharacter.checked) {
    const resultsArray = await searchCharacter(searchString);
    listSearches(resultsArray, showCharacter);
  } else {
    const resultsArray = await searchPlanet(searchString);
    listSearches(resultsArray, showPlanet);
  }
  showElement(searchResultSection);
}

function onClickClearHistory() {
  hideElement(planetSection);
  hideElement(characterSection);
  hideElement(searchResultSection);
  searchField.value = '';
  while (searchResultOutput.firstChild) {
    searchResultOutput.removeChild(searchResultOutput.firstChild);
  }
  resultTds.forEach((td) => {
    if (td.className.includes('output')) {
      td.innerText = '';
    }
  });
}

async function onClickObiButton() {
const obiWan = await spawnObiWan();
showCharacter(obiWan);
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
      if (td.classList.contains('character-name')) {
        td.innerText = name;
      } else if (td.classList.contains('character-gender')) {
        td.innerText = gender;
      } else if (td.classList.contains('character-specie')) {
        td.innerText = specie;
      } else if (td.classList.contains('character-homeworld')) {
        td.innerText = homeworld;
      } else if (td.classList.contains('character-starship')) {
        td.innerText = starship;
      }
    });
  } else {
  }
  showElement(characterSection);
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
      if (td.classList.contains('planet-name')) {
        td.innerText = name;
      } else if (td.classList.contains('planet-population')) {
        td.innerText = population;
      } else if (td.classList.contains('planet-climate')) {
        td.innerText = climate;
      } else if (td.classList.contains('planet-terrain')) {
        td.innerText = terrain;
      } else if (td.classList.contains('planet-gravity')) {
        td.innerText = gravity;
      }
    });
  }
  showElement(planetSection);
}

//Tar in en array och vilken funktion som ska användas på click
function listSearches(searchResult, onClick) {
  const lineBreak = document.createElement('br');
  if (searchResult != null) {
    const searchMessage = document.createElement('li');
    searchMessage.className = 'search-message-li';
    searchMessage.innerText = `You searched for "${searchField.value}":`;
    searchResultOutput.appendChild(searchMessage);
    const searchDataArray = searchResult;
    searchDataArray.forEach((object) => {
      const searchResult = document.createElement('li');
      const name = object.name;
      searchResult.classList = 'search-result-li';
      searchResult.innerText = `- ${name}`;
      searchResult.addEventListener('click', () => onClick(object));
      searchResultOutput.appendChild(searchResult);
    });
    searchResultOutput.appendChild(lineBreak);
  } else {
    const message = document.createElement('li');
    message.className = 'message-li';
    message.innerText = `Your search for "${searchField.value}" gave no result...`;
    searchResultOutput.appendChild(message);
    searchResultOutput.appendChild(lineBreak);
  }
}

window.onload = slideTitle(title);
