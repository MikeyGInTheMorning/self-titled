<script lang="ts">
  import "./styles/global.css";
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";
  import Scroller from "./lib/components/panels/Scroller.svelte";
  import Github from "./lib/components/panels/Github.svelte";
  import About from "./lib/components/panels/About.svelte";

  onMount(() => {
    registerSW();
  });
</script>

<div class="grid grid-cols-1 gap-50 pb-20">
  <Scroller />
  <Github />
  <About />
</div>
