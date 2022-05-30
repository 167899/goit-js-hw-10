import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(() => {
    if (input.value.trim() !== '') {
      fetchCountries(input.value.trim());
    } else {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    }
  }, DEBOUNCE_DELAY),
);
