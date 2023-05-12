import { useContext } from 'react';
import { CallContext } from '../context/CallContext';

import Logo from '../components/Logo';
import TextEdit from '../components/TextEdit';

function Header() {
	const { name, setName } = useContext(CallContext);

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
