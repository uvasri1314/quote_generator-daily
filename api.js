const quoteText = document.getElementById('quote-text');
const author = document.getElementById('author');


async function getQuote() {
    try {
        const response = await fetch('https://quotable.io/random');
        const data = await response.json();

        quoteText.textContent = data.content;
        author.textContent = `- ${data.author}`;
        
        
        const currentDate = new Date().toDateString();
        const newQuoteData = {
            quote: data.content,
            author: data.author,
            date: currentDate
        };
        localStorage.setItem('dailyQuote', JSON.stringify(newQuoteData));
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}


function updateQuoteIfNewDay() {
    const storedQuoteData = JSON.parse(localStorage.getItem('dailyQuote'));

    if (!storedQuoteData || storedQuoteData.date !== new Date().toDateString()) {
        getQuote();
    } else {
        
        quoteText.textContent = storedQuoteData.quote;
        author.textContent = `- ${storedQuoteData.author}`;
    }
}


updateQuoteIfNewDay();


const intervalInMilliseconds = 60 * 1000; 
setInterval(updateQuoteIfNewDay, intervalInMilliseconds);
