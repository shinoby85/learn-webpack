import bcg1 from './assets/background/1.jpg';
import bcg2 from './assets/background/2.jpg';
import bcg3 from './assets/background/3.jpg';
import bcg4 from './assets/background/4.jpg';
import bcg5 from './assets/background/5.jpg';

import {updateQuote} from "./quote";

const images = [bcg1, bcg2, bcg3, bcg4, bcg5];
let imagePosition = 0;

const updateBtn = <HTMLButtonElement>document.getElementById('update');

document.body.style.backgroundImage = `url(${images[imagePosition]})`;

function updateImageIndex() {
    imagePosition++;
    if (imagePosition === images.length) {
        imagePosition = 0;
    }
}

function updateBackground() {
    updateImageIndex();
    const imgObj = new Image();
    imgObj.src = images[imagePosition];
    imgObj.addEventListener('load', () => {
        document.body.style.backgroundImage = `url(${imgObj.src})`;
    })

}

updateBtn.addEventListener('click', async () => {
    updateBackground();
    await updateQuote();
})


