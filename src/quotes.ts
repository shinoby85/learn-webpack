'use strict'
const qText=document.getElementById('qText')
const qAutor=document.getElementById('qAutor')
const qUpdate=document.getElementById('qUpdate')


async function updateQuotes(){
    // let url=`http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`
    let url=`https://quote-garden.herokuapp.com/api/v2/quotes/random`
    const request=await fetch(url)
    const dataQuotes=await request.json()
    if(dataQuotes.cod!=='404'){
        qText.innerText=dataQuotes.quote.quoteText
        qAutor.innerText=dataQuotes.quote.quoteAuthor
    }

}
function updateText(){
    updateQuotes()
    qUpdate.classList.add('rotate')
    setTimeout(function (){
        qUpdate.classList.remove('rotate')

    },1000)
}

qUpdate.addEventListener('click',updateText)

updateQuotes()