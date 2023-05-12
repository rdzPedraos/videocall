import PropTypes from "prop-types";

import Video from "./Video";

function Profile({ stream, name, mutedVideo, showName, className }) {
    return (
        <div className={`relative ${className}`}>
            <Video muted={mutedVideo} stream={stream} />

            {showName && (
                <div
                    className="absolute bottom-0 w-full py-4 px-6"
                    style={{
                        background:
                            "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                        borderRadius: "0 0 0.5rem 0.5rem",
                    }}
                >
                    {name || "Buscando..."}
                </div>
            )}
        </div>
    );
}

Profile.propTypes = {
    stream: PropTypes.object,
    name: PropTypes.string.isRequired,
    mutedVideo: PropTypes.bool,
    showName: PropTypes.bool,
    className: PropTypes.string,
};

Profile.defaultProps = {
    mutedVideo: false,
    className: "",
    showName: false,
};

export default Profile;
