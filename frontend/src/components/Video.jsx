import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

function Video({ stream, className, ...props }) {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className={`rounded-lg overflow-hidden bg-base-500 ${className}`}>
            {stream ? (
                <video
                    className="w-full h-full object-cover"
                    playsInline
                    autoPlay
                    ref={videoRef}
                    {...props}
                />
            ) : (
                <div className="w-full h-full grid place-items-center">
                    <Spinner />
                </div>
            )}
        </div>
    );
}

Video.propTypes = {
    stream: PropTypes.object,
    className: PropTypes.string,
};

Video.defaultProps = {
    className: "",
    props: {
        muted: false,
    },
};

export default Video;
