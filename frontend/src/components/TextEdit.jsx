import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TextEdit({ text, editByDefault, ...props }) {
	const [edit, setEdit] = useState(editByDefault);

	return edit ? <>Editar</> : <p>{text}</p>;
}

TextEdit.propTypes = {
	text: PropTypes.string,
	editByDefault: PropTypes.bool,
};

TextEdit.defaultProps = {
	text: '',
	editByDefault: false,
};

export default TextEdit;
