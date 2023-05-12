import PropTypes from 'prop-types';

import Video from './Video';

function Profile({ stream, name, mutedVideo, showName, className }) {
	return (
		<div className={`relative ${className}`}>
			<Video muted={mutedVideo} stream={stream} />

			{showName && (
				<div
					className='absolute bottom-0 w-full py-4 px-6'
					style={{
						background:
							'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
						borderRadius: '0 0 0.5rem 0.5rem',
					}}
				>
					{name || 'Buscando...'}
				</div>
			)}
		</div>
	);
}

Profile.propTypes = {
	stream: PropTypes.object,
	name: PropTypes.string.isRequired,
	onChangeName: PropTypes.func,
	editByDefault: PropTypes.bool,
	mutedVideo: PropTypes.bool,
	className: PropTypes.string,
	showName: PropTypes.bool,
};

Profile.defaultProps = {
	editByDefault: false,
	mutedVideo: false,
	className: '',
	showName: false,
};

export default Profile;
