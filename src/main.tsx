import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import "./styles/index.css";
import "./styles/loader.css";

const component =
	import.meta.env.VITE_ENV === "development" ? (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	) : (
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	);

ReactDOM.createRoot(document.getElementById("root")!).render(component);
