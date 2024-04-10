/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{svelte,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'green': {
                    light: '#DCE5DA',
                    dark: '#506352',
                }
            }
        },
    },
    plugins: [],
}

