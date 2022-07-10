<script lang="ts">
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";

  let titleStyle;
  let scrollY;

  const setTitleStyle = (opacity) => {
    titleStyle = `--title-opacity: ${opacity};`;
  };

  const setTitle = (index) => {
    const titleYStart = 17;
    const titleYEnd = 65;
    const frameLengths = 10;

    if (index >= titleYStart - frameLengths && index < titleYStart)
    {
      const opacity = (titleYStart - index) / frameLengths
      console.log(opacity)
      setTitleStyle(opacity);
    }
    else if(index <= titleYEnd + frameLengths && index > titleYEnd)
    { 
      console.log("this is outro")
      setTitleStyle((titleYEnd - index) / frameLengths / 100);
    }
    else if(index >= titleYStart && index <=titleYEnd)
    {
      console.log("this is 1")
      setTitleStyle(1)
    }
      else{
        console.log("this is 0")
        setTitleStyle(0)
      }
  };



  onMount(() => {
    registerSW();

    const html = document.documentElement;
    const canvas = document.getElementById(
      "hero-lightpass"
    ) as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    let url = `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass`;
    url = "./assets/";
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
      setTitle(frameIndex + 1)
    });

    preloadImages();
  });
</script>

<svelte:window bind:scrollY />
<div class="canvas-container">
  <canvas id="hero-lightpass" />
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

    display: flex;
    align-items: center;
    justify-content: center;
  }

  canvas {
    width: 810px;
    max-width: 810px;
  }
</style>
