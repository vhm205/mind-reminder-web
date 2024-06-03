import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { BasicLayout } from "@/layouts/basic";
import { UserLayout } from "@/layouts/user";

import { NotFound } from "@/pages/error/NotFound";
import { HomePage } from "@/pages/home";

import { Loader } from "@/components/loader";

const LoginPage = lazy(() => import("@/pages/auth/Login"));

const ListNotePage = lazy(() => import("@/pages/note/ListNote"));
const CreateNotePage = lazy(() => import("@/pages/note/CreateNote"));

const ListChannelPage = lazy(() => import("@/pages/channel/ListChannel"));

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route element={<BasicLayout />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route
              index
              path="login"
              element={
                <Suspense fallback={<Loader />}>
                  <LoginPage />
                </Suspense>
              }
            />
          </Route>

          <Route path="notes" element={<UserLayout />}>
            <Route path="new" element={<CreateNotePage />} />
            <Route index element={<ListNotePage />} />
          </Route>

          <Route path="channels" element={<UserLayout />}>
            <Route index element={<ListChannelPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
