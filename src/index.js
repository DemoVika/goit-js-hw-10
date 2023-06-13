import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

Notify.init({
  width: '520px',
  position: 'center-top',
  clickToClose: true,
  fontSize: '18px',
});

hideBreedSelect();
showLoader();
hideError();
fetchBreeds()
  .then(cats => {
    showBreedSelect();
    hideLoader();
    for (const cat of cats) {
      let option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.name;
      breedSelectEl.append(option);
    }

    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(error => {
    console.log(error);
    hideLoader();
    showError();
  });

breedSelectEl.addEventListener('change', onChoseBreed);

function onChoseBreed() {
  showLoader();
  hideCatInfo();
  hideError();

  fetchCatByBreed(breedSelectEl.value)
    .then(data => {
      drawCatInfo(data);
      console.log(data);
      hideLoader();
      showCatInfo();
    })
    .catch(error => {
      console.log(error);
      hideLoader();
      showError();
    });
}

function showLoader() {
  loaderEl.classList.remove('hidden');
}
function hideLoader() {
  loaderEl.classList.add('hidden');
}
function showCatInfo() {
  catInfoEl.classList.remove('hidden');
}
function hideCatInfo() {
  catInfoEl.classList.add('hidden');
}
function showBreedSelect() {
  breedSelectEl.classList.remove('hidden');
}
function hideBreedSelect() {
  breedSelectEl.classList.add('hidden');
}
function hideError() {
  //errorEl.classList.add('hidden');
}
function showError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function drawCatInfo(data) {
  const { description, temperament, name } = data[0].breeds[0];
  const image = data[0].url;

  const markup = `<img class= "img_cat" src='${image}' alt='cats photo' style="border-radius: 6px"  height=800px/>
  <p><b>Breed</b>: ${name}</p> 
  <p><b>Temperament</b>: ${temperament}</p>
  <p><b>Description</b>: ${description}</p>`;

  catInfoEl.innerHTML = markup;
}
