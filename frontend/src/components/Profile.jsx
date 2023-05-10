import PropTypes from 'prop-types';

import Video from './Video';
import TextEdit from './TextEdit';

function Profile({
	stream,
	name,
	onChangeName,
	editByDefault,
	mutedVideo,
	className,
}) {
	return (
		<div className={className}>
			<Video className='flex-1' muted={mutedVideo} stream={stream} />
			<TextEdit
				name={name}
				onChange={onChangeName}
				editByDefault={editByDefault}
			/>
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
};

Profile.defaultProps = {
	editByDefault: false,
	mutedVideo: false,
	className: '',
};

export default Profile;
