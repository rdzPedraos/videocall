import PropTypes from "prop-types";

import UserProvider from "../Context/UserContext";
import Header from "../Layouts/Header";

function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-base-900 text-white">
            <UserProvider>
                <Header />
                <main>{children}</main>
            </UserProvider>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
