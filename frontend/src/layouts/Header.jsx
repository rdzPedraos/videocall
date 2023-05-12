import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

import Logo from '../components/Logo';
import TextEdit from '../components/TextEdit';

function Header() {
	const { name, setName } = useContext(UserContext);

	return (
		<header className='flex justify-between items-center px-10'>
			<Logo />
			<TextEdit
				className='max-w-[100px] lg:max-w-[150px]'
				text={name}
				onSaveText={setName}
			/>
		</header>
	);
}

export default Header;
