import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Explicitly tell Vitest where the test files are located
        include: ['src/**/*.{test,spec}.ts'],
        // Explicitly declare the environment; although it defaults to node, writing it out helps IDE recognition
        environment: 'node',
    },
});