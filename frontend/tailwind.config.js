/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.jsx'],
	theme: {
		extend: {
			colors: {
				base: 'rgb( var(--base) / <alpha-value> )',
				primary: 'rgb( var(--primary) / <alpha-value> )',
				white: 'rgb( var(--white) / <alpha-value> )',
				success: 'rgb( var(--success) / <alpha-value> )',
				error: 'rgb( var(--error) / <alpha-value> )',
			},
		},
	},
	plugins: [],
};
