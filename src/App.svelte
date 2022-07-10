<script lang="ts">
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";

  let titleStyle;
  let canvasStyle;
  let scrollY;
  let areImagesLoaded = false;

  const canvasYStart = 10;
  const titleYEnd = 65;
  const frameLengths = 10;
  const setTitleStyle = (opacity) => {
    titleStyle = `--title-opacity: ${opacity};`;
  };

  const setCanvasStyle = (opacity) => {
    canvasStyle = `--canvas-opacity: ${opacity};`;
  };

  const setCanvasOpacity = (index) => {
    if (index > titleYEnd && index < titleYEnd + frameLengths) {
      const outroOpacity = Math.abs((titleYEnd - index) / frameLengths + 1);
      setCanvasStyle(outroOpacity);
    } else if (index <= canvasYStart) {
      const intoOpacity = Math.abs((0 - index) / canvasYStart - 1) - 1;
      setCanvasStyle(intoOpacity);
    } else if (index >= titleYEnd + frameLengths) {
      setCanvasStyle(0);
    } else setCanvasStyle(1);
  };

  const setTitleOpacity = (index) => {
    if (index > titleYEnd && index <= titleYEnd + frameLengths) {
      const outroOpacity = Math.abs((titleYEnd - index) / frameLengths + 1);
      setTitleStyle(outroOpacity);
    } else if (index <= titleYEnd) {
      setTitleStyle(1);
    } else {
      setTitleStyle(0);
    }
  };

  onMount(() => {
    registerSW({
      onOfflineReady() {
        console.log('hi')
        areImagesLoaded = true
        const myTimeout = setTimeout(setCanvasData, 250);
        
      }
    });
    setCanvasData()
  });

  const setCanvasData = () => {
    if(!areImagesLoaded)
      return

    const html = document.documentElement;
    const canvas = document.getElementById(
      "hero-lightpass"
    ) as HTMLCanvasElement;

    const context = canvas.getContext("2d");

    const url = "./assets/";
    const frameCount = 77;
    const currentFrame = (index) =>
      `${url}${index.toString().padStart(5, "0")}.png`;

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };

    const img = new Image();
    img.src = currentFrame(1);
    canvas.width = html.offsetWidth > 810 ? 810 : html.offsetWidth;
    canvas.height = html.offsetHeight > 1080 ? 1080 : html.offsetHeight;

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
      setCanvasOpacity(frameIndex + 1);
      setTitleOpacity(frameIndex + 1);
    });

    preloadImages();
  };
</script>

<svelte:window bind:scrollY />
{#if areImagesLoaded}
  <div class="canvas-container" style={canvasStyle}>
    <canvas id="hero-lightpass" />
  </div>
{/if}
<div class="surface" style={titleStyle}>
  <div class="on-surface title">Mike Gulik.</div>
</div>

<style>
  .title {
    opacity: var(--title-opacity, 1);
  }
  .surface {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 255, 0.15);
    color: white;
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

  .canvas-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    opacity: var(--canvas-opacity, 0);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  canvas {
    min-width: 210px;
    max-width: 810px;
  }
</style>
