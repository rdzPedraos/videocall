import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [name, setName] = useState("Carlitos");

    const onChangeName = (name) => {
        setName(name);
    };

    return (
        <UserContext.Provider
            value={{
                name: name,
                setName: onChangeName,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.array,
};

export default UserProvider;
