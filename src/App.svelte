<script lang="ts">
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";

  let scrollY;

  onMount(() => {
    registerSW();

    const html = document.documentElement;
    const canvas = document.getElementById(
      "hero-lightpass"
    ) as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    const frameCount = 147;
    const currentFrame = (index) =>
      `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
        .toString()
        .padStart(4, "0")}.jpg`;

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };

    const img = new Image();
    img.src = currentFrame(1);
    canvas.width = html.offsetWidth;
    canvas.height = html.offsetHeight;
    img.onload = function () {
      context.drawImage(img, 0, 0);
    };

    const updateImage = (index) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0);
    };

    window.addEventListener("scroll", () => {
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollY / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => updateImage(frameIndex + 1));
    });

    preloadImages();
  });
</script>

<svelte:window bind:scrollY />
<canvas id="hero-lightpass" />
<div class="surface">
  Mike Gulik
</div>

<style>
  .surface{
    position: fixed;
    top: 0px;
    left:0px;
    right:0px;
    bottom: 0px;

    background-color: rgba(0, 0, 255, .25);
  }
  :global(html) {
    background: rgba(0, 0, 0, 1) !important;
    height: 100vh;
  }
  :global(body) {
    background: rgba(0, 0, 0, 1) !important;
    height: 500vh;
  }
  :global(body::-webkit-scrollbar) {
    width: 12px; /* width of the entire scrollbar */
    background: rgba(0, 0, 0, 0);
  }

  :global(body::-webkit-scrollbar-track) {
    background: rgba(0, 0, 0, 0); /* color of the tracking area */
  }

  :global(body::-webkit-scrollbar-thumb) {
    background-color: rgb(70, 70, 70); /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 0px solid rgb(175, 175, 175); /* creates padding around scroll thumb */
  }
  canvas {
    position: fixed;
    left: calc(100vw / 3);
    top: 20vh;
    max-height: 100vh;
    max-width: 100vw;
  }
</style>
