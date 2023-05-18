import PropTypes from 'prop-types';

import { CallProvider } from '../context/CallContext';
import Header from './Header';
import { SocketProvider } from '../context/SocketContext';

function Layout({ children }) {
	return (
		<div className='min-h-screen flex flex-col bg-base-900 text-white'>
			<SocketProvider>
				<CallProvider>
					<Header className='h-[100px]' />
					<main className='h-[calc(100vh-80px)] bg-base-900'>{children}</main>
				</CallProvider>
			</SocketProvider>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.object,
};

export default Layout;
