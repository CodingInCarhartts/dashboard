import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api/minimax': {
				target: 'https://api.minimax.io',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/minimax/, '/v1')
			}
		}
	}
});
