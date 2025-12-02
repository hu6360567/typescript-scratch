import { expect, test, describe } from 'vitest';
import { add, sayHello } from './index.js';

describe('Index Module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('sayHello returns correct string', () => {
        expect(sayHello('Gemini')).toBe('Hello, Gemini!');
    });
});