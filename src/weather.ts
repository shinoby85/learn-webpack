'use strict'
const wCity = document.getElementById('wCity')
const wImg = document.getElementById('wImg')
const wTemperature = document.getElementById('wTemperature')
const wHumidity = document.getElementById('wHumidity')
const wSpeedWind = document.getElementById('wSpeedWind')

async function updateWeather(lang = 'ru', units = 'metric') {
    if(wCity.innerText==='' && localStorage.getItem('safeCity')!==null){
        localStorage.setItem('wCity', localStorage.getItem('safeCity'));
    }
    getCity();
    if (wCity.innerText === '[Enter City]') {
        wImg.style.display = 'none'
        return;
    }
    wImg.style.display = 'block'

    let city = wCity.innerText;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=621b956eda4a85205fe44caea6213113&units=${units}`
    const request = await fetch(url)
    const dataWeather = await request.json();
    if (dataWeather.cod !== '404') {
        let wId = dataWeather.weather[0].id
        if (wId >= 200 && wId <= 299) {
            if (wId === 201 || wId === 211 || wId === 231) {
                wImg.style.backgroundPositionX = '-150px'
                wImg.style.backgroundPositionY = '-350px'
            } else if (wId === 201 || wId === 211 || wId === 231) {
                wImg.style.backgroundPositionX = '-310px'
                wImg.style.backgroundPositionY = '-350px'
            } else {
                wImg.style.backgroundPositionX = '0'
                wImg.style.backgroundPositionY = '-350px'
            }

        }
        if ((wId >= 300 && wId <= 399) || (wId >= 500 && wId <= 599)) {
            if (wId === 302 || wId === 502 || wId === 503 || wId === 504 || wId === 520 || wId === 522 || wId === 531) {
                wImg.style.backgroundPositionX = '-315px'
                wImg.style.backgroundPositionY = '-180px'
            } else if (wId === 321 || wId === 511) {
                wImg.style.backgroundPositionX = '-470px'
                wImg.style.backgroundPositionY = '-350px'
            } else if (wId === 313 || wId === 314) {
                wImg.style.backgroundPositionX = '-470px'
                wImg.style.backgroundPositionY = '-180px'
            } else {
                wImg.style.backgroundPositionX = '-155px'
                wImg.style.backgroundPositionY = '-180px'
            }


        }
        if (wId >= 600 && wId <= 699) {
            if (wId === 611 || wId === 612 || wId === 613 || wId === 615) {
                wImg.style.backgroundPositionX = '-470px'
                wImg.style.backgroundPositionY = '-350px'
            } else if (wId === 616 || wId === 621) {
                wImg.style.backgroundPositionX = '-470px'
                wImg.style.backgroundPositionY = '-180px'
            } else if (wId === 602 || wId === 622) {
                wImg.style.backgroundPositionX = '-795px'
                wImg.style.backgroundPositionY = '-350px'
            } else {
                wImg.style.backgroundPositionX = '-635px'
                wImg.style.backgroundPositionY = '-350px'
            }

        }
        if (wId >= 700 && wId <= 799) {
            if (wId === 731 || wId === 762 || wId === 771 || wId === 781) {
                wImg.style.backgroundPositionX = '-795px'
                wImg.style.backgroundPositionY = '-180px'
            } else {
                wImg.style.backgroundPositionX = '-635px'
                wImg.style.backgroundPositionY = '-180px'
            }


        }
        if (wId >= 800 && wId <= 899) {
            if (wId === 804) {
                wImg.style.backgroundPositionX = '0'
                wImg.style.backgroundPositionY = '-180px'
            } else if (wId === 803) {
                wImg.style.backgroundPositionX = '-795px'
                wImg.style.backgroundPositionY = '-20px'
            } else if (wId === 802) {
                wImg.style.backgroundPositionX = '-325px'
                wImg.style.backgroundPositionY = '-20px'
            } else if (wId === 801) {
                wImg.style.backgroundPositionX = '-160px'
                wImg.style.backgroundPositionY = '-20px'
            } else {
                wImg.style.backgroundPositionX = '0'
                wImg.style.backgroundPositionY = '-20px'
            }

        }
        wTemperature.innerHTML = `${Math.round(dataWeather.main.temp)} C&#176;, ${dataWeather.weather[0].description}`
        wHumidity.innerText = `Влажность: ${dataWeather.main.humidity} %`
        wSpeedWind.innerText = `Скорость ветра: ${dataWeather.wind.speed} метр / сек`
        safeOldCity()
    }
    else{
        wTemperature.innerHTML = `!!!! ВНИМАНИЕ !!!!`
        wHumidity.innerText = `Введенный город отсутствует, либо данные не корректны`
        wSpeedWind.innerText = ``
        wImg.style.display = 'none'
    }


}

function getCity() {
    if (localStorage.getItem('wCity') === null) {
        wCity.textContent = '[Enter City]';
    } else {
        wCity.textContent = localStorage.getItem('wCity');
    }
}

function setCity(e) {

    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('wCity', e.target.innerText);
            wCity.blur();
        }
    } else {
        localStorage.setItem('wCity', e.target.innerText);
    }
}
function safeOldCity(){
    if (wCity.textContent !== '[Enter City]' && wCity.textContent.trim() !== '') {
        localStorage.setItem('safeCity', wCity.textContent)
    }

}

wCity.addEventListener('click',function (){
    wCity.innerText=''
})
wCity.addEventListener('keypress', setCity);
wCity.addEventListener('blur', setCity);


wCity.addEventListener('blur', function (e) {
    updateWeather();
})


updateWeather();


