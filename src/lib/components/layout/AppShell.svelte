<script lang="ts">
  import Sidebar from './Sidebar.svelte'
  import Header from './Header.svelte'
  import CalendarWidget from '../features/calendar/CalendarWidget.svelte'
  let { children } = $props()
</script>

<div class="h-screen w-full grid surface-gradient" style="grid-template-columns: auto 1fr">
  <Sidebar />
  <div class="flex flex-col min-h-0">
    <Header />
     <main class="flex-1 overflow-auto">
       <div class="p-4 md:p-6 pb-20">
         {@render children?.()}
       </div>
     </main>
     <footer class="border-t bg-background w-full">
       <div class="p-4 w-3/4 mx-auto">
         <CalendarWidget />
       </div>
     </footer>
   </div>
</div>
