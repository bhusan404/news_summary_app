// Define your GPT-3 API key
const apiKey = 'YOUR_GPT3_API_KEY';

// Function to fetch news articles
async function fetchNews() {
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_NEWS_API_KEY');
        const data = await response.json();
        const articles = data.articles;
        return articles;
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Function to summarize news articles using GPT-3
async function summarizeArticleWithGPT3(article) {
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: `Summarize the following news article:\n\n${article.title}\n\n${article.description}`,
                max_tokens: 100, // You can adjust this for longer or shorter summaries
            }),
        });

        const data = await response.json();
        const summary = data.choices[0].text;
        return summary;
    } catch (error) {
        console.error('Error summarizing article:', error);
    }
}

// Function to display news and summaries
async function displayNews() {
    const newsList = document.getElementById('newsList');
    const articles = await fetchNews();

    if (!articles) {
        return;
    }

    newsList.innerHTML = '';

    for (const article of articles) {
        const summary = await summarizeArticleWithGPT3(article);
        const articleElement = document.createElement('div');
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${summary}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsList.appendChild(articleElement);
    }
}

// Call the displayNews function to start the app
displayNews();
