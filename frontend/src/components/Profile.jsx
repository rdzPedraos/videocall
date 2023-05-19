import PropTypes from 'prop-types';

import Video from './Video';
import {
	SpeakerXMarkIcon,
	VideoCameraSlashIcon,
} from '@heroicons/react/24/outline';

function Profile({ stream, name, mutedVideo, showVideo, showData, className }) {
	return (
		<div className={`relative h-full lg:h-[400px] ${className}`}>
			<Video showVideo={showVideo} muted={mutedVideo} stream={stream} />

			{showData && (
				<div
					className='absolute bottom-0 w-full py-4 px-6'
					style={{
						background:
							'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
						borderRadius: '0 0 0.5rem 0.5rem',
					}}
				>
					{name ? (
						<>
							<span>{name}</span>
							{mutedVideo && <SpeakerXMarkIcon className='w-10 h-10' />}
							{!showVideo && <VideoCameraSlashIcon className='w-10 h-10' />}
						</>
					) : (
						<span>Buscando...</span>
					)}
				</div>
			)}
		</div>
	);
}

Profile.propTypes = {
	name: PropTypes.string,
	stream: PropTypes.object,

	mutedVideo: PropTypes.bool,
	showVideo: PropTypes.bool,
	showData: PropTypes.bool,

	className: PropTypes.string,
};

Profile.defaultProps = {
	className: '',
	mutedVideo: false,
	noVideo: false,
	showData: false,
};

export default Profile;
