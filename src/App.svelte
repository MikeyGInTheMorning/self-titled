<script lang="ts">
  import "./styles/global.css"
  import { onMount } from "svelte"
  import { registerSW } from "virtual:pwa-register"
  import ImageScroller from "./lib/components/ImageScroller.svelte"

  onMount(() => {
    registerSW()
  })
</script>

<div class="flex flex-col">
  <div class="relative h-500vh">
    <ImageScroller />
  </div>
  <div class="bg-yellow">dsf</div>
  <div class="bg-green">adsf</div>
</div>
