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
  countriesContainer.style.opacity = 1;
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

// const request = fetch(`https://restcountries.com/v3.1/name/egypt`);
// console.log(request);

// -----------------------------------
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[2];
//       if (!neighbour) return;
//       console.log(neighbour);
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(err);
//       renderError(`Something went Error ${err.message}`);
//     })
//     .finally(function () {
//       countriesContainer.style.opacity = 1;
//     });
// };
// ----------------------

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
// console.log(`Test start`);
// setTimeout(() => console.log(`0 sec timer`), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test end');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('lotter draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You will win 💰');
//     } else {
//       reject(new Error('You lost your mony ya norm 🌝'));
//     }
//   }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// //promisifing setTime
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('waited 2 sconds');
//     return wait(1);
//   })
//   .then(() => console.log('waited 1 seconds'));

// const whereAmI = async function (country) {
//   const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//   console.log(res);
//   const data = await res.json();
//   renderCountry(data[0]);

//   const neighbour = data[0].borders[2];
//   const res1 = await fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//   console.log(res1);
//   const res2 = await res1.json();
//   renderCountry(res2[0], 'neighbour');
// };

// btn.addEventListener('click', function () {
//   whereAmI('egypt');
// });
const getJSON = function (url, errorMsg = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await ;
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    const prom = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(...prom);
    // console.log([...data1.capital, ...data2.capital, ...data3.capital]);
  } catch (err) {
    console.log(err);
  }
};
get3Countries('egypt', 'israel', `israel`);
