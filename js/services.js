const starWarsBaseUrl = 'https://swapi.dev/api';
let saveArray = [];

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
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

//lägger till i saveArray... kolla så inte lägger i samma fler ggr
//Kolla arrayen innan fetchData()...
export async function spawnObiWan() {
  const url = `${starWarsBaseUrl}/people/10`;
  const obiWan = await fetchData(url);
  saveArray.push(obiWan);
  console.log(saveArray);
  return obiWan;
}
