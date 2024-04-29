import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useState,
} from "react";

interface AuthPayload {
	uid: string;
}

export interface AuthContextProps {
	user: AuthPayload;
	isAuthenticated: boolean;
	setIsAuthenticated?: Dispatch<SetStateAction<boolean>>;
}

const defaultAuthContext = {
	user: { uid: "" },
	isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const uid = localStorage.getItem("uid") || "";

	return (
		<AuthContext.Provider
			value={{ user: { uid }, isAuthenticated, setIsAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};
