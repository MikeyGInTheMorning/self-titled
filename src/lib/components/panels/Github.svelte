<script>
  import Panel from "../Panel.svelte";

  const BASE_EMBED_URL =
    "https://viewscreen.githubusercontent.com/view/solid?color_mode=dark&url=https%3a%2f%2fraw.githubusercontent.com";

  const myRepoUrl = `${BASE_EMBED_URL}/MikeyGInTheMorning/self-titled/dev/public/github/MikeyGInTheMorning-2022.stl`;
</script>

<div class="">
  <Panel panelTitle="Github">
    <iframe
      width="100%"
      height="400px"
      title="Github Skyline"
      id="mikes-github-skyline"
      frameborder="0"
      scrolling="no"
      src={myRepoUrl}
    />
  </Panel>
</div>
