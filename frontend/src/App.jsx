import { useContext } from 'react';
import { CallContext } from './context/CallContext';

import Profile from './components/Profile';
import ButtonsGroup from './partials/ButtonsGroup';
import Error from './partials/Error';

function App() {
	const {
		stream: localStream,
		remoteUser,
		enabled,
		waiting,
	} = useContext(CallContext);

	console.log(waiting);
	return enabled ? (
		<>
			<section className='lg:flex lg:w-2/3 lg:min-h-[300px] lg:gap-4 m-auto mt-16'>
				<Profile stream={localStream} mutedVideo className='flex-1' />

				<Profile
					className='flex-1'
					name={remoteUser?.name}
					stream={remoteUser?.stream}
					showName
				/>
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
