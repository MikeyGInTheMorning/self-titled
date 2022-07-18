<script lang="ts">
  import { onMount } from "svelte";
  import Panel from "../Panel.svelte";

  let titleStyle;
  let canvasStyle;
  let scrollStyle;
  let frameIndex;
  let scrollY;
  let html;

  const frameCount = 77;
  const backgroundStart = 10;
  const titleEnd = 55;
  const frameLengths = 10;

  const setTitleStyle = (opacity) => {
    titleStyle = `opacity: ${opacity};`;
  };

  const setCanvasStyle = (opacity) => {
    canvasStyle = `opacity: ${opacity};`;
  };

  const setScrollStyle = (opacity) => {
    scrollStyle = `opacity: ${opacity};`;
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

    frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    const nextFrameIndex = frameIndex + 1;
    imgSrc = getImageUrl(nextFrameIndex);

    setCanvasOpacity(nextFrameIndex);
    setTitleOpacity(nextFrameIndex);
    setScrollOpacity(nextFrameIndex);
  };
  $: scrollY && calculateScroll();

  onMount(() => {
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

<div id="scroller-container" class="relative h-150vh z-0">
  <div
    class="fixed left-0 right-0 bottom-0 top-0 flex items-center justify-center"
    style={canvasStyle}
  >
    <img src={imgSrc} alt="Loading..." referrerpolicy="no-referrer" />
  </div>
  <div class="flex items-center justify-center color-surface">
    <div class="top-50 text-2xl" style={titleStyle}>Mike Gulik.</div>
    <div class="fixed bottom-20vh text-sm" style={scrollStyle}>(scroll)</div>
  </div>
</div>
