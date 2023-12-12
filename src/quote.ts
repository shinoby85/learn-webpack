const content = document.getElementById('content');
const author = document.getElementById('author');


export async function updateQuote(){
let url = `https://api.quotable.io/random`;
const request = await fetch(url);
const dataQuotes = await request.json();
    content.innerText = dataQuotes.content;
    author.innerText = dataQuotes.author;
}

(async function (){
    await updateQuote()
})();