import React, { ReactNode, ComponentType } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";

interface PrivateRouteProps {
	Layout?: ComponentType<{ children: ReactNode }>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Layout }) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	if (Layout) {
		return (
			<Layout>
				<Outlet />
			</Layout>
		);
	}

	return <Outlet />;
};

export default PrivateRoute;
