<script type="ts">
  export let panelTitle = ''
  
</script>

<div class="flex flex-col w-full">
    {#if panelTitle && panelTitle != ""}
    <div class="text-xl">{panelTitle}</div>
  {/if}
  
  <div class="w-full h-full"><slot /></div>
</div>

