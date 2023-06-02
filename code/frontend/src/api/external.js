import axios from "axios";

const NEWS_API_ENDPOINT =
  "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";
  
export const getNews = async () => {
  let response;

  try {
    response = await axios.get(NEWS_API_ENDPOINT);
    response = response.data.articles.slice(0, 15);
  } catch (error) {
    return error;
  }

  return response;
};