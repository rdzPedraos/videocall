import PropTypes from 'prop-types';

import img from '../assets/capibara_v3.png';

function Logo({ className, ...props }) {
	return (
		<div className={`h-20 ${className}`} {...props}>
			<div className='h-full flex items-center'>
				<img src={img} className='h-full' />
				<p className="-ml-1 text-primary font-['Carter One'] italic font-bold text-2xl">
					Capibara
				</p>
			</div>
		</div>
	);
}

Logo.propTypes = {
	className: PropTypes.string,
};

Logo.defaultProps = {
	className: '',
};

export default Logo;
