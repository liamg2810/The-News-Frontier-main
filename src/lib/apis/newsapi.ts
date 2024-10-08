import type { article } from "$lib/types";

const apiKey = import.meta.env.VITE_NEWSAPI_KEY;

const date = new Date();
date.setDate(date.getDate() - 7);
const dateWeekAgo = date.toISOString().split("T")[0];

const sources =
  "bbc-news,cnn,reuters,the-guardian,associated-press,techcrunch,bloomberg,forbes,ign,polygon,esports,ft-com,independent,financial-post";

export async function GetNewsArticles(keyword: string): Promise<article[]> {
  const url =
    "https://newsapi.org/v2/everything?" +
    `q=${keyword}&` +
    `from=${dateWeekAgo}&` +
    "language=en&" +
    "sortBy=popularity&" +
    `sources=${sources}&` +
    `apiKey=${apiKey}`;

  const ret = await fetch(url);
  const data = await ret.json();

  if (data.articles && Array.isArray(data.articles)) {
    const filteredArticles = data.articles.filter(
      (a: article) => a.source && a.source.id
    );

    return filteredArticles;
  } else {
    throw "No articles found or invalid response structure.";
  }
}
