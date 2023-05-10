import PropTypes from 'prop-types';

function Layout({ children }) {
	return <div className='min-h-screen '>{children}</div>;
}

Layout.propTypes = {
	children: PropTypes.array,
};

export default Layout;
