<script lang="ts">
  import "./styles/global.css";
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";
  import ImageScroller from "./lib/components/ImageScroller.svelte";


  const BASE_EMBED_URL =
    "https://viewscreen.githubusercontent.com/view/solid?color_mode=dark&url=https%3a%2f%2fraw.githubusercontent.com";
    
  const myRepoUrl = `${BASE_EMBED_URL}/MikeyGInTheMorning/self-titled/dev/public/github/MikeyGInTheMorning-2022.stl`;

  onMount(() => {
    registerSW();
  });
</script>

<div class="flex flex-col">
  <div class="relative h-500vh">
    <ImageScroller />
  </div>
  <div class="w-full z-10">
    <iframe
      width="50%"
      height="500rem"
      title="Github Skyline"
      id="mikes-github-skyline"
      frameborder="0"
      scrolling="no"
      src={myRepoUrl}
    />
  </div>

  <div class="bg-yellow">dsf</div>
  <div class="bg-green">adsf</div>
</div>
