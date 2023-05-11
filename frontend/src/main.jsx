import ReactDOM from "react-dom/client";
import "./../public/styles.css";

import App from "./App.jsx";
import Layout from "./layouts/Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Layout>
        <App />
    </Layout>
);
