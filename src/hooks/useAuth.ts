import { AuthContext, AuthContextProps } from "@/contexts";
import { useContext } from "react";

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
  const uid = localStorage.getItem('uid');
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
