import Notiflix from 'notiflix';
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,population,flags,capital,languages`,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 1) {
        const lang = Object.values(data[0].languages).join(', ');
        countryInfo.innerHTML = `
                <div class="country-header">
                    <img class="country-flag" src="${data[0].flags.svg}" alt="${data[0].name.official}">
                    <span class="country-name">${data[0].name.official}</span>
                </div>
                <ul class="country-list">
                    <li class="country-list-item">
                        <b>Capital:</b> ${data[0].capital}
                    </li>
                    <li class="country-list-item">
                        <b>Population:</b> ${data[0].population}
                    </li>
                    <li class="country-list-item">
                        <b>Languages:</b> ${lang}
                    </li>
                </ul>`;

        countryList.innerHTML = '';
      } else if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else {
        let elements = data
          .map(e => {
            const item = `<li class="country-list-item">               
                <img class="country-list-flag" src="${e.flags.svg}" alt="${e.name.official}">
                ${e.name.official}            
            </li>`;
            return item;
          })
          .join(' ');
        countryList.innerHTML = elements;
        countryInfo.innerHTML = '';
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

export default fetchCountries;
