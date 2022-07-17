<script lang="ts">
  import "./styles/global.css"
  import { onMount } from "svelte"
  import { registerSW } from "virtual:pwa-register"
  import Scroller from "./lib/components/panels/Scroller.svelte"
  import Github from "./lib/components/panels/Github.svelte"

  onMount(() => {
    registerSW()
  })
</script>

<div class="flex flex-col">
  <Scroller />
  <Github />
</div>
