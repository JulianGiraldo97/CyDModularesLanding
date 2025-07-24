/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./**/*.{html,js}"
    ],
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
                'poppins': ['Poppins', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#0599a9',
                    600: '#047a87',
                    700: '#0d9488',
                    800: '#115e59',
                    900: '#134e4a',
                }
            },
            backgroundImage: {
                'hero-pattern': "url('/img/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash.jpg')",
            }
        },
    },
    plugins: [],
}