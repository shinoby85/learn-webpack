
const hours = document.querySelector('.hours');
const hours1 = document.querySelector('.hours1');
const minutes = document.querySelector('.minutes');
const minutes1 = document.querySelector('.minutes1');
const seconds = document.querySelector('.seconds');
const seconds1 = document.querySelector('.seconds1');
const toDay = document.querySelector('.toDay');
const greeting = document.querySelector('.greeting');
const userName = <HTMLElement>document.querySelector('.name');
const userFocus = <HTMLElement>document.querySelector('.focus');
let backupName: string;
let backupFocus: string;


const dayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function showTime() {
    let today = new Date();
    let hh = today.getHours();
    let min= today.getMinutes();
    let sec = today.getSeconds();

    hours.innerHTML = `${addZero(hh)}`;
    minutes.innerHTML = `${addZero(min)}`;
    seconds.innerHTML = `${addZero(sec)}`;

    if (toDay.innerHTML !== showDate(today)) {
        toDay.innerHTML = showDate(today);
    }
    setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function showDate(today: Date) {
    let day = today.getDate().toString();
    if (today.getDate() === 1 || today.getDate() === 21 || today.getDate() === 31) {
        day += 'st'
    } else if (today.getDate() === 2 || today.getDate() === 22) {
        day += 'nd'
    } else if (today.getDate() === 3 || today.getDate() === 23) {
        day += 'rd'
    } else {
        day += 'th'
    }
    return `${dayOfWeek[today.getDay()]}, ${day} of ${months[today.getMonth()]}`;
}

function getGreeting() {
    let hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
        greeting.textContent = 'Good Morning, ';
    } else if (hour >= 12 && hour < 18) {
        greeting.textContent = 'Good Afternoon, ';
    } else if (hour >= 18 && hour < 24) {
        greeting.textContent = 'Good Evening, ';
    } else {
        greeting.textContent = 'Good Night, '
    }
}

function init() {
    getDataFromLocalStorage();
    backupName = userName.textContent;
    backupFocus = userFocus.textContent;
}

function setName(e: KeyboardEvent) {
    const element = e.target as HTMLElement;
    if (e.keyCode === 13) {
        saveToLocalStorage('name', element.textContent);
        element.blur();
        backupName = element.textContent;
    }
    if (e.keyCode === 27) {
        element.textContent = backupName;
        element.blur();
    }
}
function setFocus(e: KeyboardEvent) {
    const element = e.target as HTMLElement;
    if (e.keyCode === 13) {
        saveToLocalStorage('focus', element.textContent);
        element.blur();
        backupFocus = element.textContent;
    }
    if (e.keyCode === 27) {
        element.textContent = backupFocus;
        element.blur();
    }
}


function saveToLocalStorage(name: string, value: string) {
    localStorage.setItem(name, value);
}

function getDataFromLocalStorage() {
    let nameData = localStorage.getItem("name");
    let focusData = localStorage.getItem("focus");
    if (nameData) {
        userName.textContent = nameData;
    }
    if (focusData) {
        userFocus.textContent = focusData;
    }
}
userName.addEventListener('blur',
    (e) => {
        const element = e.target as HTMLElement;
        backupName = element.textContent;
        saveToLocalStorage('name', element.textContent);
    });
userFocus.addEventListener('blur',
    (e) => {
        const element = e.target as HTMLElement;
        backupFocus = element.textContent;
        saveToLocalStorage('focus', element.textContent);
    });

function clearArea(e: MouseEvent) {
    const element = e.target as HTMLElement;
    if (backupName !== '') {
        element.textContent = '';
    } else {
        element.textContent = backupName;
    }
    if (backupFocus !== '') {
        element.textContent = '';
    } else {
        element.textContent = backupFocus;
    }
}
window.addEventListener('load', init);
userName.addEventListener('click', clearArea);
userFocus.addEventListener('click', clearArea);
userName.addEventListener('keyup', setName);
userFocus.addEventListener('keyup', setFocus);


showTime();
getGreeting();
