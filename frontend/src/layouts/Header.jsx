import { useContext } from 'react';
import { CallContext } from '../context/CallContext';

import Logo from '../components/Logo';
import TextEdit from '../components/TextEdit';

function Header() {
	const { user, setUser } = useContext(CallContext);

	return (
		<header className='flex justify-between items-center px-10'>
			<Logo />
			<TextEdit
				className='max-w-[100px] lg:max-w-[150px]'
				text={user.name}
				onSaveText={name => setUser(user => ({ ...user, name }))}
			/>
		</header>
	);
}

export default Header;
