<script lang="ts">
  import "./styles/global.css";
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";

  let titleStyle;
  let canvasStyle;
  let scrollStyle;
  let tbdStyle;
  let scrollY;
  let html;

  const frameCount = 77;
  const backgroundStart = 10;
  const titleEnd = 65;
  const frameLengths = 10;

  const setTitleStyle = (opacity) => {
    titleStyle = `--title-opacity: ${opacity};`;
  };

  const setCanvasStyle = (opacity) => {
    canvasStyle = `--canvas-opacity: ${opacity};`;
  };

  const setScrollStyle = (opacity) => {
    scrollStyle = `--scroll-opacity: ${opacity};`;
  };

  const setTBDStyle = (opacity) => {
    tbdStyle = `--tbd-opacity: ${opacity};`;
  };

  const setCanvasOpacity = (index) => {
    if (index > titleEnd && index < titleEnd + frameLengths) {
      const outroOpacity = Math.abs((titleEnd - index) / frameLengths + 1);
      setCanvasStyle(outroOpacity);
    } else if (index <= backgroundStart) {
      const intoOpacity = Math.abs((0 - index) / backgroundStart - 1) - 1;
      setCanvasStyle(intoOpacity);
    } else if (index >= titleEnd + frameLengths) {
      setCanvasStyle(0);
    } else setCanvasStyle(1);
  };

  const setScrollOpacity = (index) => {
    if (index > 0 && index < 8) {
      const outroOpacity = Math.abs((4 - index) / 4 + 1);
      setScrollStyle(outroOpacity);
    } else {
      setScrollStyle(0);
    }
  };

  const setTBDOpacity = (index) => {
    if (index > frameCount - 8 && index <= frameCount) {
      const outroOpacity = Math.abs((4 - index) / 4 + 1);
      setTBDStyle(outroOpacity);
    } else {
      setTBDStyle(0);
    }
  };

  const setTitleOpacity = (index) => {
    if (index > titleEnd && index <= titleEnd + frameLengths) {
      const outroOpacity = Math.abs((titleEnd - index) / frameLengths + 1);
      setTitleStyle(outroOpacity);
    } else if (index <= titleEnd) {
      setTitleStyle(1);
    } else {
      setTitleStyle(0);
    }
  };

  const getImageUrl = (index) =>
    `https://mg-portfolio.s3.amazonaws.com/face-shadow/${(index == 0
      ? 1
      : index
    )
      .toString()
      .padStart(5, "0")}-min.jpg`;

  let imgSrc = getImageUrl(1);
  const calculateScroll = () => {
    if (!html) return;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollY / maxScrollTop;

    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    const nextFrameIndex = frameIndex + 1;
    imgSrc = getImageUrl(nextFrameIndex);

    setCanvasOpacity(nextFrameIndex);
    setTitleOpacity(nextFrameIndex);
    setScrollOpacity(nextFrameIndex);
    setTBDOpacity(nextFrameIndex);
  };
  $: scrollY && calculateScroll();

  onMount(() => {
    registerSW();
    html = document.documentElement;
  });

  const preloadImages = () =>
    [...Array(frameCount).keys()].forEach((index) =>
      fetch(getImageUrl(index), {
        mode: "no-cors",
        method: "GET",
      })
    );
  preloadImages();
</script>

<svelte:window bind:scrollY />
<div class="background" style={canvasStyle}>
  <img src={imgSrc} alt="Loading..." referrerpolicy="no-referrer" />
</div>
<div class="surface">
  <div class="title" style={titleStyle}>Mike Gulik.</div>
  <div class="scroll-sign" style={scrollStyle}>(scroll)</div>
  <div class="tbd" style={tbdStyle}>
    <div class="tbd-header">
      To Be Continued - Refactor, bio, fast stats, fancier <button style="text-decoration: underline;"
        on:click={() => {
          window.location.href =
            "https://github.com/MikeyGInTheMorning/self-titled";
        }}>github links</button
      >, my biometrics.
    </div>
    <div class="header-bottom">
      <button
        on:click={() => {
          document.body.scrollIntoView();
        }}>(To Top)</button
      >
    </div>
  </div>
</div>

<style>
  .title {
    font-size: xx-large;
    opacity: var(--title-opacity, 1);
  }
  .tbd {
    position: fixed;
    bottom: 20vh;
    font-size: x-small;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    opacity: var(--tbd-opacity, 0);
  }
  .scroll-sign {
    position: fixed;
    bottom: 20vh;
    font-size: small;
    opacity: var(--scroll-opacity, 1);
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

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: none;
    outline: inherit;
  }
</style>
