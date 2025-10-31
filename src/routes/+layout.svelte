<script lang="ts">
  import '../app.css'
  import AppShell from '$lib/components/layout/AppShell.svelte'
  let { children } = $props()
</script>

<svelte:head>
  <title>Dashboard</title>
  <script>
    try { var t = localStorage.getItem('theme'); if (t === 'dark') document.documentElement.classList.add('dark') } catch (e) {}
  </script>
</svelte:head>

<AppShell {children} />
