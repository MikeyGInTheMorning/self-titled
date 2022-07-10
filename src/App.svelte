<script lang="ts">
  import "./styles/global.css";
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";

  let titleStyle;
  let canvasStyle;
  let scrollY;

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

  const currentFrame = (index) => {
    const url = "./assets/";
    return `${url}${index.toString().padStart(5, "0")}.png`;
  };

  let imgSrc = currentFrame(1);
  onMount(() => {
    registerSW();

    const html = document.documentElement;
    // const canvas = document.getElementById(
    //   "hero-lightpass"
    // ) as HTMLCanvasElement;
    // const context = canvas.getContext("2d");

    const frameCount = 77;

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        //imgSrc = currentFrame(i);
      }
    };

    // const img = new Image();
    // img.src = currentFrame(1);
    // canvas.width = html.offsetWidth > 810 ? 810 : html.offsetWidth;
    // canvas.height = html.offsetHeight > 1080 ? 1080 : html.offsetHeight;

    // img.onload = function () {
    //   context.drawImage(img, 0, 0);
    // };

    const updateImage = (index) => {
      // img.src = currentFrame(index);
      imgSrc = currentFrame(index);
      // context.drawImage(img, 0, 0);
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
  });
</script>

<svelte:window bind:scrollY />
<div class="canvas-container" style={canvasStyle}>
  <img src={imgSrc} alt="Loading..." />
  <!-- <canvas id="hero-lightpass" /> -->
</div>
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
