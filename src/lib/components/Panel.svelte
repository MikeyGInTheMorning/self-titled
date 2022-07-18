<script type="ts">
  export let panelTitle = "";
</script>

<div class="flex flex-col w-full bg-background rounded p-1">
  {#if panelTitle && panelTitle != ""}
    <div class="text-3xl font-extrabold font-mono color-primary p-4 pt-6 pb-6">{panelTitle}</div>
  {/if}

  <div class="w-full h-full"><slot /></div>
</div>

