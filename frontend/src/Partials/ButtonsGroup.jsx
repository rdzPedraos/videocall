import PropTypes from "prop-types";
import Button from "../Components/Button";
import {
    PhoneXMarkIcon,
    MicrophoneIcon,
    VideoCameraIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

function ButtonsGroup({ className, ...props }) {
    return (
        <section
            className={`flex items-center p-5  rounded-2xl border-2 border-base-500 bg-base-500 bg-opacity-30 ${className}`}
            {...props}
        >
            <div className="text-gray-500 max-w-[250px]">
                <p className="font-bold">Ahora mismo estás en vivo</p>
                <p>Asegurate de no compartir tus datos personales</p>
            </div>

            <div className="flex gap-2">
                <Button variant="danger">
                    <PhoneXMarkIcon className="w-6 h-6" />
                </Button>
                <Button variant="success">
                    <ArrowPathIcon className="w-6 h-6" />
                </Button>
                <Button>
                    <MicrophoneIcon className="w-6 h-6" />
                </Button>
                <Button>
                    <VideoCameraIcon className="w-6 h-6" />
                </Button>
            </div>
        </section>
    );
}

ButtonsGroup.propTypes = {
    className: PropTypes.string,
};

ButtonsGroup.defaultProps = {
    className: "",
};

export default ButtonsGroup;
