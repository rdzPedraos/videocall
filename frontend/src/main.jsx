import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import Layout from './layouts/Layout';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Layout>
		<App />
	</Layout>
);
