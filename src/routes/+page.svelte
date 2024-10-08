<script lang="ts">
  import { GetNewsArticles } from "$lib/apis/newsapi";
  import type { article } from "$lib/types";
  import { onMount } from "svelte";

  let articles: article[] = [];
  let keyword: string = "bitcoin";

  async function getArticles() {
    articles = await GetNewsArticles(keyword);

    console.log(articles);
  }

  onMount(() => {
    getArticles();
  });
</script>

<div class="flex flex-col">
  <label for="keyword-input">Keyword</label>
<div class="flex gap-3">
    <input class="border-black border-2 rounded-lg text-lg px-3" id="keyword-input" type="text" bind:value={keyword} />
    <button class="bg-blue-400 p-2 rounded-full font-bold text-white" on:click={getArticles}>Search</button>
  </div>
</div>

<h2>News Articles</h2>

<div class="grid grid-cols-3 gap-10 mx-16 mt-12">
  {#each articles as article}
    <a class="bg-neutral-400 rounded-lg overflow-hidden flex flex-col align-middle p-3" role="button" href={article.url}>
      {#if article.urlToImage}
      <div class="flex justify-center">
        <img src={article.urlToImage} alt={article.title} class="w-3/4" />
      </div>
      {/if}
      <h3 class="text-lg font-bold px-4 py-2">{article.title}</h3>
      <p class="px-4 py-2">{article.description}</p>

    </a>
  {/each}
</div>

<br/>