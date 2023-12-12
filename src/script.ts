// DOM Elements
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');
const tDay = document.querySelector('#tDay')
const updBack=document.getElementById('updBack')
const masTimeZone = ['morning','day', 'evening', 'night']
const images = ['01.jpg', '02.jpg', '03.jpg','04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const dayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let stepImages=0; //Отвечает за переход между временными зонами при ручно просмотре background
const pWindow=document.getElementById('pWindow')
const wcLabel=document.getElementById('wcLabel')
const pKey=document.getElementById('pKey')
const pBack=document.getElementById('pBack')

pBack.addEventListener('click',function (){
    pWindow.classList.remove('animate__zoomIn')
    pWindow.classList.add('animate__zoomOut')
    setTimeout(function (){
        pWindow.style.display='none'
    },500)
})

wcLabel.addEventListener('click',function (){

        pWindow.classList.remove('animate__zoomOut')
        pWindow.style.display='block'
        pWindow.classList.add('animate__zoomIn')

})



// Options
const showAmPm = true;

function changeBackground() {

}

// Show Time
function showTime() {

    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = today.toLocaleTimeString()
    if (tDay.innerHTML !== updateDate(today)) {
        tDay.innerHTML = updateDate(today)
    }
    if(min===0 && sec===0){
        setBgGreet()
    }

    setTimeout(showTime, 1000);
}

// Get day of week
function updateDate(today) {
    let day = today.getDate()
    if (today.getDate() === 1 || today.getDate() === 21) {
        day += 'st'
    } else if (today.getDate() === 2 || today.getDate() === 22) {
        day += 'nd'
    } else if (today.getDate() === 3 || today.getDate() === 23) {
        day += 'rd'
    } else {
        day += 'th'
    }
    return `${dayOfWeek[today.getDay()]}, ${day}&nbsp;of&nbsp;${monthsOfYear[today.getMonth()]}`
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet(time='def') {
    let imgPosition;
    if (localStorage.getItem('imgDay') === null) {
        localStorage.setItem('imgDay', '1')
        imgPosition = 0
    } else {
        imgPosition = Number(localStorage.getItem('imgDay'))
        if (imgPosition + 1 > 20) {
            localStorage.setItem('imgDay', '1')
            imgPosition = 0
        } else {
            localStorage.setItem('imgDay', String(imgPosition + 1))
        }

    }
    if(time==='def') {
        let bgImg=new Image();
        let today = new Date(),
            hour = today.getHours();

        if (hour < 12 && hour >= 6) {
            // Morning
            bgImg.onload=()=> {
                document.body.style.backgroundImage =
                    `url('${bgImg.src}')`;
            }
            bgImg.src=`assets/images/morning/${images[imgPosition]}`
            greeting.textContent = 'Good Morning, ';
        } else if (hour >= 12 && hour < 18) {
            // Afternoon
            bgImg.onload=()=> {
                document.body.style.backgroundImage =
                    `url('${bgImg.src}')`;
            }
            bgImg.src=`assets/images/day/${images[imgPosition]}`
            greeting.textContent = 'Good Afternoon, ';
        } else if (hour >= 18 && hour < 24) {
            // Evening
            bgImg.onload=()=> {
                document.body.style.backgroundImage =
                    `url('${bgImg.src}')`;
            }
            bgImg.src=`assets/images/evening/${images[imgPosition]}`
            greeting.textContent = 'Good Evening, ';
            document.querySelector('.poopap__window').style.color='black'
            document.body.style.color = 'white';
        } else {
            // Night
            bgImg.onload=()=> {
                document.body.style.backgroundImage =
                    `url('${bgImg.src}')`;
            }
            bgImg.src=`assets/images/night/${images[imgPosition]}`
            greeting.textContent = 'Good Night, ';
            document.querySelector('.poopap__window').style.color='black'
            document.body.style.color = 'white';
        }
    }
    else {
        let bgImg=new Image();
        bgImg.onload=()=> {
            document.body.style.backgroundImage =
                `url('${bgImg.src}')`;
        }
        bgImg.src=`assets/images/${masTimeZone[time]}/${images[imgPosition]}`
        if(imgPosition===19){
            return 1;
        }
    }
    return 0;
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

function safeOldParam(e) {
    let elem;
    if (e.target === name) {
        elem = 'safeName'
    } else if (e.target === focus) {
        elem = 'safeFocus'
    }
    if (e.target.textContent !== '[Enter City]' && e.target.textContent.trim() !== '') {
        localStorage.setItem(elem, e.target.textContent)
    } else if (e.target.textContent.trim() === '' && localStorage.getItem(elem) !== null) {
        e.target.textContent = localStorage.getItem(elem)
        localStorage.setItem(e.target.className, e.target.innerText)
    }
}


function clearArea(e) {
    e.target.innerText = ' '
}

function updateBackground(){
    stepImages+=setBgGreet(stepImages)
    if(stepImages>3){
        stepImages=0
    }
    updBack.classList.add('rotate')
    setTimeout(function (){
        updBack.classList.remove('rotate')

    },1000)


}

name.addEventListener('click', clearArea)
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('blur', safeOldParam);
focus.addEventListener('click', clearArea)
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('blur', safeOldParam);
updBack.addEventListener('click',updateBackground)
// Run
showTime();
setBgGreet();
getName();
getFocus();