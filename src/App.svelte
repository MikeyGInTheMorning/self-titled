<script lang="ts">
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";

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
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => updateImage(frameIndex + 1));
    });

    preloadImages();
  });
</script>

<canvas id="hero-lightpass" />

<style>
  :global(html) {
    background: rgba(0, 0, 0, 1) !important;
    height: 100vh;
  }
  :global(body) {
    background: rgba(0, 0, 0, 1) !important;
    height: 500vh;
  }
  canvas {
    position: fixed;
    left: calc(100vw / 3);
    top: 20vh;
    max-height: 100vh;
    max-width: 100vw;
  }
</style>
