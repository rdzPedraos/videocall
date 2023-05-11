import React, { useState } from "react";
import PropTypes from "prop-types";

import {
    PencilSquareIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

function TextEdit({ text, onSaveText, ...props }) {
    const [edit, setEdit] = useState(!text);
    const [textInput, setTextInput] = useState(text);

    const onEdit = () => {
        setTextInput(text);
        setEdit(true);
    };

    const onSave = (e) => {
        e.preventDefault();
        onSaveText(textInput);
        setEdit(false);
    };

    return (
        <div {...props}>
            {edit ? (
                <form onSubmit={onSave} className="flex gap-2">
                    <input
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="max-w-full bg-transparent outline-none border-b-2"
                    />
                    <button type="submit">
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </form>
            ) : (
                <p onClick={onEdit} className="flex gap-2 cursor-pointer">
                    <span>{text}</span>
                    <button>
                        <PencilSquareIcon className="w-5 h-5" />
                    </button>
                </p>
            )}
        </div>
    );
}

TextEdit.propTypes = {
    text: PropTypes.string,
    onSaveText: PropTypes.func,
};

TextEdit.defaultProps = {
    text: "",
};

export default TextEdit;
