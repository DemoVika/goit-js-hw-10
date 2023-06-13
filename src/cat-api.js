const API_KEY =
  'live_WbDwVvDnPqB8K3hpmEaNW5MUelVeXoKdg3A1ZObwv9jzFMg7sgxiv3ePbO8t3cUV';

export const fetchBreeds = function () {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export const fetchCatByBreed = function (breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
