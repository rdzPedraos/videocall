import { useContext } from 'react';
import { CallContext } from './context/CallContext';

import Profile from './components/Profile';
import ButtonsGroup from './partials/ButtonsGroup';
import Error from './partials/Error';

import { FaceFrownIcon } from '@heroicons/react/24/outline';

function App() {
	const {
		stream: localStream,
		remoteUser,
		mediaEnabled,
		stopStreaming,
	} = useContext(CallContext);

	return mediaEnabled ? (
		<>
			<section
				className='
					grid grid-rows-2 
					h-full max-w-xl mx-auto 
					lg:h-auto lg:pt-16 lg:gap-4
					xl:grid-cols-2 xl:grid-rows-1 xl:max-w-none xl:mx-16
				'
			>
				{stopStreaming ? (
					<div className='lg:order-2 bg-base-500 rounded-md grid place-items-center'>
						<div className='flex flex-col items-center animate-pulse'>
							<FaceFrownIcon className='w-20 h-20' />
							<p>No estás en vivo</p>
						</div>
					</div>
				) : (
					<Profile
						name={remoteUser?.name}
						stream={remoteUser?.stream}
						className='lg:order-2'
					/>
				)}

				<Profile stream={localStream} mutedVideo />
			</section>

			<section
				className='
				absolute bottom-0 right-0 left-0
				lg:static lg:grid lg:place-items-center lg:mt-4 xl:mt-10
			'
			>
				<ButtonsGroup className='rounded-none lg:rounded-2xl' />
			</section>
		</>
	) : (
		<Error
			http={400}
			description='No se puede mostrar el contenido si no autorizas el acceso a la cámara y el micrófono :('
		/>
	);
}

export default App;
