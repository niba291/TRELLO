/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend					: {
            colors				: {
                "black-base" 	: "#222222",
                "gray-base" 	: "#E7E7E7",
            }
        },
    },
    plugins: [],
}