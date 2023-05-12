import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

function UserProvider({ children }) {
	const [name, setName] = useState(null);

	return (
		<UserContext.Provider
			value={{
				name: name,
				setName,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

UserProvider.propTypes = {
	children: PropTypes.array,
};

export { UserProvider, UserContext };
