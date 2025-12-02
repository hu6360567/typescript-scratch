/**
 * A simple addition function to demonstrate type checking.
 */
export function add(a: number, b: number): number {
    return a + b;
}

/**
 * Hello World printing function.
 */
export function sayHello(name: string): string {
    const message = `Hello, ${name}!`;
    console.log(message);
    return message;
}

// Execute if this file is run directly (e.g. via tsx src/index.ts)
if (import.meta.url === `file://${process.argv[1]}`) {
    sayHello('TypeScript World');
}