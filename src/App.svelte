<script lang="ts">
  import "./styles/global.css";
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";

  let titleStyle;
  let canvasStyle;
  let scrollY;
  let html;
 
  const frameCount = 77;
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

  // const currentFrame = (index) => {
  //   const url = "./assets/";
  //   return `${url}${index.toString().padStart(5, "0")}.png`;
  // };

  const currentFrame = index => (
  `https://mg-portfolio.s3.amazonaws.com/face-shadow/${index.toString().padStart(5, '0')}.png`
)

  let imgSrc = currentFrame(1);
  const calculateScroll = () => {
    if (!html) return;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollY / maxScrollTop;

    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    const nextFrameIndex = frameIndex + 1;
    imgSrc = currentFrame(nextFrameIndex)
    setCanvasOpacity(nextFrameIndex);
    setTitleOpacity(nextFrameIndex);
  };
  $: scrollY && calculateScroll();

  onMount(() => {
    registerSW();
    html = document.documentElement;
  });

  const preloadImages = () =>[...Array(frameCount).keys()].forEach(index => fetch(currentFrame(index)))
  preloadImages()
</script>

<svelte:window bind:scrollY />
<div class="background" style={canvasStyle}>
  <img src={imgSrc} alt="Loading..." />
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
  .background {
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
</style>
