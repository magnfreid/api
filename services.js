const starWarsBaseUrl = 'https://swapi.dev/api';

export async function searchPerson(searchString) {
  const url = `${starWarsBaseUrl}/people/?search=${searchString}`;
  console.log(url);
  const response = await fetch(url, settings);
  const data = await response.json;
  console.log(data);
  return data;
}

export async function searchPlanet(searchString) {
  const url = `${starWarsBaseUrl}/planet/?search=${searchString}`;
  const response = await fetch(url);
  const data = await response.json;
  console.log(data);
  return data;
}
