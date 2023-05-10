import PropTypes from 'prop-types';

function Button({ variant, children, ...props }) {
	const colors = {
		primary: 'bg-primary hover:bg-red-700',
		danger: 'bg-error hover:bg-red-700',
		success: 'bg-success hover:bg-green-700',
		info: 'bg-blue-600 hover:bg-blue-700',
		warning: 'bg-yellow-600 hover:bg-yellow-700',
	};

	return (
		<button
			className={`text-white px-4 py-2 rounded ${colors[variant]} focus:outline-none`}
			{...props}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	variant: PropTypes.oneOf(['danger', 'success', 'info', 'warning']),
	children: PropTypes.node.isRequired,
};

export default Button;
