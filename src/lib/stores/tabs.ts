import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { TabState } from '../types';

// Default state
const defaultState: TabState = {
  activeTab: 'home',
};

// Create the store
export const tabStore = writable<TabState>(defaultState);

// Initialize from localStorage if in browser
if (browser) {
  const stored = localStorage.getItem('dashboard_tab_state');
  if (stored) {
    try {
      const parsedState = JSON.parse(stored);
      tabStore.set({ ...defaultState, ...parsedState });
    } catch (error) {
      console.error('Error parsing stored tab state:', error);
    }
  }

  // Subscribe to changes and save to localStorage
  tabStore.subscribe((state) => {
    localStorage.setItem('dashboard_tab_state', JSON.stringify(state));
  });
}

// Helper functions
export function setActiveTab(tabId: string) {
  tabStore.update((state) => ({ ...state, activeTab: tabId }));
}

export function getActiveTab(): string {
  let currentTab = 'home';
  tabStore.subscribe((state) => {
    currentTab = state.activeTab;
  })();
  return currentTab;
}
