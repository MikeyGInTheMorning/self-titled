<script lang="ts">
  import "./styles/global.css";
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";
  import ImageScroller from "./lib/components/ImageScroller.svelte";

  const baseUrl = "https://mg-portfolio.s3.amazonaws.com/github/MikeyGInTheMorning-2022.stl"
    //"https://viewscreen.githubusercontent.com/view/solid?color_mode=dark&url=https%3a%2f%2fraw.githubusercontent.com/MikeyGInTheMorning";

  let iFrameSrc = () => "/MikeyGInTheMorning";
  onMount(() => {
    registerSW();
  });
</script>

<div class="flex flex-col">
  <div class="relative h-500vh">
    <ImageScroller />
  </div>
  <div class="h-50vh">
    sadf
    <iframe
      title="Github Skyline"
      id="mikes-github-skyline"
      frameborder="0"
      scrolling="no"
      src="https://viewscreen.githubusercontent.com/view/solid?color_mode=dark&url=https%3A%2F%2Fmg-portfolio.s3.amazonaws.com%2Fgithub%2FMikeyGInTheMorning-2022.stl"
    />

  </div>

  <div class="bg-yellow">dsf</div>
  <div class="bg-green">adsf</div>
</div>
