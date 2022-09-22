'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforebegin', msg);

  // countriesContainer.style.fontSize = '30px';
};
///////////////////////////////////////

function renderCountry(data, className = '') {
  console.log(data);
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 100000
            ).toFixed(1)} People</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
}
// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country
//     renderCountry(data);

//     const [neighbour] = data.borders;
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       renderCountry(data, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbour('Austria');
// const request = fetch(`https://restcountries.com/v3.1/name/egypt`);
// console.log(request);
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data[0]);
//       renderCountry(data[0]);
//     });
// };

const request = fetch(`https://restcountries.com/v3.1/name/egypt`);
console.log(request);
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[1];
      if (!neighbour) return;
      console.log(neighbour);
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went Error ${err.message}`);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('egypt');
});

// function whereAmI(lat, lng) {
//   if (!lat || !lng) throw new Error('Enter truly values');
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       // console.log(response);
//       return response.json();
//     })
//     .then(data => console.log(data));
// }

// whereAmI(52.588, 13.381);
console.log(`Test start`);
setTimeout(() => console.log(`0 sec timer`), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');
