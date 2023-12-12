const clockFirst = document.getElementById('clockFirst')
const clockSecond = document.getElementById('clockSecond')
const pCity=document.getElementById('pCity')
let flagChangeCity=true
let flagPoopapCity=true
async function displayCanvas(idClock, city = null) {
    let dateTime;
    if (city) {
        let urlCity = 'https://worldtimeapi.org/api/timezone'
        const regionRequest = await fetch(urlCity)
        if (regionRequest.ok) {
            const regionMas = await regionRequest.json()
            if(flagPoopapCity){
                flagPoopapCity=false
                regionMas.forEach(item=>{
                    let city=item.split('/')
                    let poopapContent=`<li class="city">${city[city.length-1]}</li>`
                    pCity.insertAdjacentHTML('beforeend',poopapContent)
                })
            }
            let allRegion = regionMas.reduce((reg, item) => {
                let parseMas = item.split('/')
                if (parseMas[parseMas.length - 1].toLowerCase() === city.trim().toLowerCase()) {
                    return item
                }
                return reg
            }, '')
            urlCity += `/${allRegion}`
            let cityRequest = await fetch((urlCity))

            let cityMas = await cityRequest.json()
            if (cityMas.datetime) {
                let z = cityMas.datetime.split('.')[0].replace('T', ' ')
                dateTime = new Date(z)
                dateTime.setSeconds(new Date().getSeconds())

            } else {
                if(idClock==='myCanvas1'&&flagChangeCity) {
                    clockFirst.innerText = '[NAME OF CITY]'
                    flagChangeCity=false
                }
                else if(idClock==='myCanvas2'&&flagChangeCity){
                    clockSecond.innerText = '[NAME OF CITY]'
                    flagChangeCity=false
                }
            }
        }
    } else {
        dateTime = new Date()
    }

    var canvasHTML = document.getElementById(idClock);
    var contextHTML = canvasHTML.getContext('2d');
    contextHTML.strokeRect(0, 0, canvasHTML.width, canvasHTML.height);

    //Расчет координат центра и радиуса часов
    var radiusClock = canvasHTML.width / 2 - 10;
    var xCenterClock = canvasHTML.width / 2;
    var yCenterClock = canvasHTML.height / 2;

    //Очистка экрана.
    contextHTML.fillStyle = "#ffffff"; //заливка области рисунка
    contextHTML.fillRect(0, 0, canvasHTML.width, canvasHTML.height); //область рисунка

    //Рисуем контур часов
    contextHTML.strokeStyle = "#000000";
    contextHTML.lineWidth = 1;
    contextHTML.beginPath();
    contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2 * Math.PI, true);
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем рисочки часов
    var radiusNum = radiusClock - 7; //Радиус расположения рисочек
    var radiusPoint;
    for (var tm = 0; tm < 60; tm++) {
        contextHTML.beginPath();
        if (tm % 5 == 0) {
            radiusPoint = 3;
        } else {
            radiusPoint = 1;
        } //для выделения часовых рисочек
        var xPointM = xCenterClock + radiusNum * Math.cos(-6 * tm * (Math.PI / 180) + Math.PI / 2);
        var yPointM = yCenterClock - radiusNum * Math.sin(-6 * tm * (Math.PI / 180) + Math.PI / 2);
        contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2 * Math.PI, true);
        contextHTML.stroke();
        contextHTML.closePath();
    }

    //Оцифровка циферблата часов
    for (var th = 1; th <= 12; th++) {
        contextHTML.beginPath();
        contextHTML.font = 'bold 20px sans-serif';
        var xText = xCenterClock + (radiusNum - 20) * Math.cos(-30 * th * (Math.PI / 180) + Math.PI / 2);
        var yText = yCenterClock - (radiusNum - 20) * Math.sin(-30 * th * (Math.PI / 180) + Math.PI / 2);
        if (th <= 9) {
            contextHTML.strokeText(th, xText - 5, yText + 10);
        } else {
            contextHTML.strokeText(th, xText - 15, yText + 10);
        }
        contextHTML.stroke();
        contextHTML.closePath();
    }


    //Рисуем стрелки
    var lengthSeconds = radiusNum - 10;
    var lengthMinutes = radiusNum - 15;
    var lengthHour = lengthMinutes / 1.5;
    var d = new Date(dateTime);                //Получаем экземпляр даты
    var t_sec = 6 * d.getSeconds();                           //Определяем угол для секунд
    var t_min = 6 * (d.getMinutes() + (1 / 60) * d.getSeconds()); //Определяем угол для минут
    var t_hour = 30 * (d.getHours() + (1 / 60) * d.getMinutes()); //Определяем угол для часов

    //Рисуем секунды
    contextHTML.beginPath();
    contextHTML.strokeStyle = "#FF0000";
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthSeconds * Math.cos(Math.PI / 2 - t_sec * (Math.PI / 180)),
        yCenterClock - lengthSeconds * Math.sin(Math.PI / 2 - t_sec * (Math.PI / 180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем минуты
    contextHTML.beginPath();
    contextHTML.strokeStyle = "#000000";
    contextHTML.lineWidth = 3;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthMinutes * Math.cos(Math.PI / 2 - t_min * (Math.PI / 180)),
        yCenterClock - lengthMinutes * Math.sin(Math.PI / 2 - t_min * (Math.PI / 180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем часы
    contextHTML.beginPath();
    contextHTML.lineWidth = 5;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthHour * Math.cos(Math.PI / 2 - t_hour * (Math.PI / 180)),
        yCenterClock - lengthHour * Math.sin(Math.PI / 2 - t_hour * (Math.PI / 180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем центр часов
    contextHTML.beginPath();
    contextHTML.strokeStyle = "#000000";
    contextHTML.fillStyle = "#ffffff";
    contextHTML.lineWidth = 3;
    contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2 * Math.PI, true);
    contextHTML.stroke();
    contextHTML.fill();
    contextHTML.closePath();

    return;
}


window.onload = function () {
    window.setInterval(
        function () {
            if (localStorage.getItem('clockFirst')) {
                displayCanvas("myCanvas1", localStorage.getItem('clockFirst'))
            } else {
                displayCanvas("myCanvas1")

            }
            if (localStorage.getItem('clockSecond')) {
                displayCanvas("myCanvas2", localStorage.getItem('clockSecond'))
            } else {
                displayCanvas("myCanvas2")

            }
        }, 1000);
}

// async function findZone(city) {
//     let urlCity = 'http://worldtimeapi.org/api/timezone'
//     const regionRequest = await fetch(urlCity)
//     if (regionRequest.ok) {
//         const regionMas = await regionRequest.json()
//         let allRegion = regionMas.reduce((reg, item) => {
//             let parseMas = item.split('/')
//             if (parseMas[parseMas.length - 1].toLowerCase() === city.trim().toLowerCase()) {
//                 return item
//             }
//             return reg
//         }, '')
//         urlCity += `/${allRegion}`
//         let cityRequest = await fetch((urlCity))
//         // let cityMas = await cityRequest.json()
//         return await cityRequest.json()
//         // return String(cityMas.datetime)
//     }
// }

function getZone() {
    if (localStorage.getItem('clockFirst') === null) {
        clockFirst.textContent = '[NAME OF CITY]';
    } else {
        clockFirst.textContent = localStorage.getItem('clockFirst');
    }
    if (localStorage.getItem('clockSecond') === null) {
        clockSecond.textContent = '[NAME OF CITY]';
    } else {
        clockSecond.textContent = localStorage.getItem('clockSecond');
    }
}

// Set Focus
function setZone(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem(e.target.className, e.target.innerText);
            flagChangeCity=true
            e.target.blur();
        }
    } else {
        localStorage.setItem(e.target.id, e.target.innerText);
        flagChangeCity=true
    }
}

function safeOldParam(e) {
    let elem;
    if (e.target === clockFirst) {
        elem = 'safeClockFirst'
    } else if (e.target === clockSecond) {
        elem = 'safeClockSecond'
    }
    if (e.target.textContent !== '[Enter City]' && e.target.textContent.trim() !== '') {
        localStorage.setItem(elem, e.target.textContent)
    } else if (e.target.textContent.trim() === '' && localStorage.getItem(elem) !== null) {
        e.target.textContent = localStorage.getItem(elem)
        localStorage.setItem(e.target.id, e.target.innerText)
    }
}

function clearArea(e) {
    e.target.innerText = ' '
}

clockFirst.addEventListener('click', clearArea)
clockFirst.addEventListener('keypress', setZone)
clockFirst.addEventListener('blur', setZone)
clockFirst.addEventListener('blur', safeOldParam)
clockSecond.addEventListener('click', clearArea)
clockSecond.addEventListener('keypress', setZone)
clockSecond.addEventListener('blur', setZone)
clockSecond.addEventListener('blur', safeOldParam)

getZone()


