/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.jsx'],
	theme: {
		extend: {
			colors: {
				'base-900': 'rgb( var(--base-900) / <alpha-value> )',
				'base-700': 'rgb( var(--base-700) / <alpha-value> )',
				'base-500': 'rgb( var(--base-500) / <alpha-value> )',
				primary: 'rgb( var(--primary) / <alpha-value> )',
				white: 'rgb( var(--white) / <alpha-value> )',
				success: 'rgb( var(--success) / <alpha-value> )',
				danger: 'rgb( var(--danger) / <alpha-value> )',
			},
		},
	},
	plugins: [],
};
