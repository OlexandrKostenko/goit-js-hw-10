/* import './css/styles.css'; */
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountry } from './fetchCountry';


const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')

input.addEventListener('input', debounce(() => {
    const countryForSearch = input.value.trim().toLowerCase();
    if(countryForSearch.length > 0){
    fetchCountry(countryForSearch).then(showCountry).catch(error)
} else {
    Notiflix.Notify.failure("Oops, there is no country with that name")
}
}, DEBOUNCE_DELAY));


function fetchCountry (countryForSearch){
return fetch(`https://restcountries.com/v3.1/name/${countryForSearch}?fields=name,population,flags,languages,capital`)
.then(response => {
    if(!response.ok) {
        throw Error(response.statusText);
    }
    return response.json()
});
};

function showCountry(country) {
    
    if (country.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        clearMarkUp();
    };
    if (country.length > 1 && country.length <=10) {
        countryInfo.innerHTML ='';
        countryList.innerHTML = renderList(country);
    };
    if (country.length === 1) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = renderInfo(country[0]);
    };

};

function error() {
    Notiflix.Notify.failure("Oops, there is no country with that name")
};

function renderList(country) {
    const {name, flags} = country;
    return country.map(({flags, name}) => {return `<li class='country-item'><img src ='${flags.svg}' alt = '${name.official}' class='flag' width =50px height 40px>${name.official}</li>`}).join('');
};

function renderInfo(country) {
    const {name, flags, capital, population, languages} = country;
    return `<div class='country-inform'>
    <img src ='${flags.svg}' alt = '${name.official}' width =60px height 40px>
    <h1 class='title'>${name.official}</h1>
    </div>
    <div>
    <p class='description'>Capital : ${capital}</p>
    <p class='description'>Population : ${population}</p>
    <p class='description'>Languages : ${Object.values(languages)}</p>
    </div>`;
};

function clearMarkUp() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
};

