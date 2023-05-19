import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

import img from '../assets/capibara_v2.png';

function Video({ stream, showVideo, className, ...props }) {
	const videoRef = useRef();

	useEffect(() => {
		if (showVideo && videoRef.current && stream) {
			videoRef.current.srcObject = stream;
		}
	}, [stream, showVideo]);

	return (
		<div
			className={`grid h-full place-items-center rounded-lg overflow-hidden bg-base-500 border-2 border-base-700 ${className}`}
		>
			{stream ? (
				showVideo ? (
					<video
						className='w-full h-full object-cover'
						playsInline
						autoPlay
						ref={videoRef}
						{...props}
					/>
				) : (
					<div className='absolute h-full w-full bg-base-700 grid place-items-center'>
						<img src={img} className='h-1/2' />
					</div>
				)
			) : (
				<Spinner />
			)}
		</div>
	);
}

Video.propTypes = {
	stream: PropTypes.object,
	showVideo: PropTypes.bool,
	className: PropTypes.string,
};

Video.defaultProps = {
	className: '',
	props: {
		muted: false,
	},
};

export default Video;
