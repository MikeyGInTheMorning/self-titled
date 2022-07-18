<script type="ts">
  export let panelTitle = "";
</script>

<div class="flex flex-col w-full bg-background rounded p-1 ">
  {#if panelTitle && panelTitle != ""}
    <a class="text-3xl font-extrabold font-mono color-primary p-4 pt-6 pb-6 active:bg-transparent decoration-none active:decoration-none hover:decoration-none visited:decoration-none visited:underline-none" href="https://github.com/MikeyGInTheMorning">{panelTitle}</a>
  {/if}

  <div class="w-full h-full"><slot /></div>
</div>

