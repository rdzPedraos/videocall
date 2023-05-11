import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

import Logo from "../Components/Logo";
import TextEdit from "../Components/TextEdit";

function Header() {
    const { name, setName } = useContext(UserContext);

    return (
        <header className="flex justify-between items-center px-10">
            <Logo />
            <TextEdit
                className="max-w-[100px] lg:max-w-[150px]"
                text={name}
                onSaveText={setName}
            />
        </header>
    );
}

export default Header;
