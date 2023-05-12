import PropTypes from 'prop-types';

import { CallProvider } from '../context/CallContext';
import Header from './Header';

function Layout({ children }) {
	return (
		<div className='min-h-screen flex flex-col bg-base-900 text-white'>
			<CallProvider>
				<Header />
				<main>{children}</main>
			</CallProvider>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.object,
};

export default Layout;
