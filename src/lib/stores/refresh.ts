import { writable } from 'svelte/store';

export const refreshStore = writable<{ type: 'markets' | 'all' } | null>(null);

export function triggerRefresh(type: 'markets' | 'all' = 'all') {
  refreshStore.set({ type });
}
