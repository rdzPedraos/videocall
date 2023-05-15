import PropTypes from 'prop-types';

import Button from '../components/Button';

import {
	PhoneXMarkIcon,
	MicrophoneIcon,
	VideoCameraIcon,
	ArrowPathIcon,
	PhoneIcon,
} from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { CallContext } from '../context/CallContext';

function ButtonsGroup({ className, ...props }) {
	const { remoteUser, setRemoteUser, stopStreaming, setStopStreaming } =
		useContext(CallContext);

	const iconSize = 'w-6 h-6';

	return (
		<section
			className={`flex items-center p-5  rounded-2xl border-2 border-base-500 bg-base-500 bg-opacity-30 ${className}`}
			{...props}
		>
			<div className='text-gray-500 max-w-[250px] px-3'>
				{stopStreaming ? (
					<>
						<p className='font-bold'> No estás en vivo! </p>
						<p> Inicia tú transmisión pulsando en el botón de llamar </p>
					</>
				) : (
					<>
						<p className='font-bold'>Ahora mismo estás en vivo</p>
						<p>Asegurate de no compartir tus datos personales</p>
					</>
				)}
			</div>

			<div className='flex gap-2'>
				{stopStreaming ? (
					<Button variant='success' onClick={() => setStopStreaming(false)}>
						<PhoneIcon className={iconSize + ' animate-bounce'} />
					</Button>
				) : (
					<>
						{remoteUser && (
							<Button variant='danger' onClick={() => setStopStreaming(true)}>
								<PhoneXMarkIcon className={iconSize} />
							</Button>
						)}

						<Button variant='success' onClick={() => setRemoteUser(null)}>
							<ArrowPathIcon
								className={iconSize + (remoteUser ? '' : ' animate-spin')}
							/>
						</Button>
					</>
				)}

				<Button>
					<MicrophoneIcon className={iconSize} />
				</Button>

				<Button>
					<VideoCameraIcon className={iconSize} />
				</Button>
			</div>
		</section>
	);
}

ButtonsGroup.propTypes = {
	className: PropTypes.string,
};

ButtonsGroup.defaultProps = {
	className: '',
};

export default ButtonsGroup;
