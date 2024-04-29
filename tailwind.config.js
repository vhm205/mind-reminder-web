/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"brand-primary": "#7FACAC",
				"brand-secondary": "#6A6965",
				"brand-third": "#FFF4E2",
        "telegram-100": "#24A1DE",
				"telegram-200": "#0077b6",
				"messenger-100": "#a855f7",
				"messenger-200": "#A334FA",
			},
		},
	},
	plugins: [],
};
