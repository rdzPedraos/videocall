import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

function Video({ stream, className, ...props }) {
	const videoRef = useRef();

	useEffect(() => {
		if (videoRef.current && stream) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<div
			className={`grid h-full place-items-center rounded-lg overflow-hidden bg-base-500 border-2 border-base-700 ${className}`}
		>
			{stream ? (
				<video
					className='w-full h-full object-cover'
					playsInline
					autoPlay
					ref={videoRef}
					{...props}
				/>
			) : (
				<Spinner />
			)}
		</div>
	);
}

Video.propTypes = {
	stream: PropTypes.object,
	className: PropTypes.string,
};

Video.defaultProps = {
	className: '',
	props: {
		muted: false,
	},
};

export default Video;
