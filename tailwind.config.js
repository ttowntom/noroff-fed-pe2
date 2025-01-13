/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,jsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				info: "#14213D",
				warn: "#FCA311",
				success: "#4B8175",
				"success-light": "#DCEBE6",
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
		},
		screens: {
			xsm: "350px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
	},
	plugins: [],
};
