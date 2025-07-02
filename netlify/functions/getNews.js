// netlify/functions/getNews.js
export async function handler(event, context) {
    const apiKey = process.env.VITE_NEWS_API_KEY;
    const { category = "general", country = "us", page = 1, pageSize = 12 } = event.queryStringParameters;
  
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      return {
        statusCode: response.status,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch news." }),
      };
    }
  }
  