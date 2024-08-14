/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    // corePlugins: {
    //     // deshabilitar algunos plugins de Tailwind si no son necesarios
    //     preflight: false, // desactiva los estilos base de Tailwind
    // },
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#FEF1E7",
                    100: "#FDE7D3",
                    200: "#FBCEA7",
                    300: "#F9B67B",
                    400: "#F79B4A",
                    500: "#F58320",
                    600: "#D26709",
                    700: "#A14F07",
                    800: "#6B3505",
                    900: "#361A02",
                    950: "#180C01",
                },
            },
        },
    },
    plugins: [],
};
