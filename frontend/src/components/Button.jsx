import PropTypes from 'prop-types';

function Button({ variant, children, ...props }) {
	const colors = {
		primary: 'bg-primary hover:bg-[#2561aa]',
		danger: 'bg-danger hover:bg-red-700',
		success: 'bg-success hover:bg-green-700',
		[undefined]: 'bg-base-500 hover:bg-base-700',
	};

	return (
		<button
			className={`p-4 rounded-lg text-white ${colors[variant]} focus:outline-none`}
			{...props}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	variant: PropTypes.oneOf(['primary', 'danger', 'success', undefined]),
	children: PropTypes.node.isRequired,
};

export default Button;
