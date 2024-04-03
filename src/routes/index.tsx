import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AdminLayout } from "@/layouts/admin";
import { NotFound } from "@/pages/error/NotFound";
import { HomePage } from "@/pages/home";
import { Loader } from "@/components/loader";

// const CreateProduct = lazy(() => import("@/pages/product/CreateProduct"));

export const Router = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<AdminLayout />}>
					<Route index element={<HomePage />} />
					<Route
						path="create"
						element={
							<Suspense fallback={<Loader />}>
                <h1>Hello Page</h1>
							</Suspense>
						}
					/>

					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
};
