import {IOpenWeatherResponse} from "./interfaces";
import clear from './assets/weather/clear.png';
import cloud from './assets/weather/cloud.png';
import mist from './assets/weather/mist.png';
import rain from './assets/weather/rain.png';

const weather:HTMLElement = document.querySelector('.weather');
const search = document.querySelector('.search-container button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = 'd1d077490e83c5a92ea9d3cef5eb5c44';
    const city = (document.querySelector('.search-container input') as HTMLInputElement).value;

    if (city === '') {
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${APIkey}`)
        .then(response => response.json())
        .then((json: IOpenWeatherResponse) => {
            console.log(json);
            if (json.cod === 404) {
                weather.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                notFound.classList.add('active');
                return;
            }
            weather.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            notFound.classList.remove('active');

            const image: HTMLImageElement = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temp');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = clear;
                    break;
                case 'Clouds':
                    image.src = cloud;
                    break;
                case 'Mist':
                    image.src = mist;
                    break;
                case 'Rain':
                    image.src = rain;
                    break;
                case 'Snow':
                    image.src = 'assets/weather/snow.png';
                    break;
                case 'Haze':
                    image.src = 'assets/weather/mist.png';
                    break;
                default:
                    image.src = 'assets/weather/cloud.png';
            }

            temperature.innerHTML = `${json.main.temp}<span>&#8451;</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} Km/h`;
        })
})