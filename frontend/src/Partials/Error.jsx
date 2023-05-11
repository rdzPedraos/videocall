import React from 'react';
import PropTypes from 'prop-types';

function Error({ http, description }) {
	return (
		<div>
			<h2>{http}</h2>
			<p>{description}</p>
		</div>
	);
}

Error.propTypes = {
	http: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	description: PropTypes.string,
};

export default Error;
