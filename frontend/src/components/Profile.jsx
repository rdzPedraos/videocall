import PropTypes from 'prop-types';

import Video from './Video';
import TextEdit from './TextEdit';

function Profile({ stream, name, mutedVideo, className }) {
	return (
		<div className={className}>
			<Video muted={mutedVideo} stream={stream} />
			<div>{name}</div>
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
