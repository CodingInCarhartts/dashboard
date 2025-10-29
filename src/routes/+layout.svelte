<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

 <div class="grid h-screen w-full">
   <div class="flex flex-col">
     <main class="grid flex-1 gap-4 overflow-auto h-full w-full">
      {@render children?.()}
    </main>
  </div>
</div>
