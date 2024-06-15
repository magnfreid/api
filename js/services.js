const starWarsBaseUrl = 'https://swapi.dev/api';
let saveObiWan = [];

async function fetchData(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Error: ${response.statusText}`);
  }
}

//returnerar en array
export async function searchCharacter(searchString) {
  const url = `${starWarsBaseUrl}/people/?search=${searchString}`;
  const data = await fetchData(url);
  if (data.results.length > 0) {
    return data.results;
  } else {
    return null;
  }
}

//returnerar en array
export async function searchPlanet(searchString) {
  const url = `${starWarsBaseUrl}/planets/?search=${searchString}`;
  const data = await fetchData(url);
  if (data.results.length > 0) {
    return data.results;
  } else {
    return null;
  }
}

export async function getNameFromUrl(url) {
  const data = await fetchData(url);
  const name = data.name;
  return name;
}


export async function spawnObiWan() {
  const found = saveObiWan.find(({ name }) => name === 'Obi-Wan Kenobi');
  if (found) {
    console.log(`${found} was found!`);
    return found;
  } else {
    const url = `${starWarsBaseUrl}/people/10`;
    const obiWan = await fetchData(url);
    saveObiWan.push(obiWan);
    return obiWan;
  }
}
