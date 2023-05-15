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
			<section className='lg:flex lg:w-2/3 lg:min-h-[300px] lg:gap-4 m-auto mt-16'>
				<Profile stream={localStream} mutedVideo className='flex-1' />

				{stopStreaming ? (
					<div className='flex-1 bg-base-500 rounded-md grid place-items-center'>
						<div className='flex flex-col items-center animate-pulse'>
							<FaceFrownIcon className='w-20 h-20' />
							<p>No estás en vivo</p>
						</div>
					</div>
				) : (
					<Profile
						mutedVideo
						className='flex-1'
						name={remoteUser?.name}
						stream={remoteUser?.stream}
						showName
					/>
				)}
			</section>

			<section className='flex justify-center mt-16'>
				<ButtonsGroup />
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
