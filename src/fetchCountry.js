export function fetchCountry (countryForSearch){
    return fetch(`https://restcountries.com/v3.1/name/${countryForSearch}?fields=name,population,flags,languages,capital`)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response.json()
    });
    }