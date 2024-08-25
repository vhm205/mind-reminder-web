import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { BasicLayout } from "@/layouts/basic";
import { UserLayout } from "@/layouts/user";

import { NotFound } from "@/pages/error/NotFound";
import { HomePage } from "@/pages/home";

import { Loader } from "@/components/loader";

const LoginPage = lazy(() => import("@/pages/auth/Login"));

const ListTopicPage = lazy(() => import("@/pages/topic/ListTopic"));

const ListNotePage = lazy(() => import("@/pages/note/ListNote"));
const CreateNotePage = lazy(() => import("@/pages/note/CreateNote"));
const DetailNotePage = lazy(() => import("@/pages/note/DetailNote"));

const ListChannelPage = lazy(() => import("@/pages/channel/ListChannel"));

export const Router = () => {
  return (
    <Routes>
      <Route path="/auth" element={<BasicLayout />}>
        <Route
          path="login"
          element={
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          }
        />
      </Route>

      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />

        <Route path="topics" element={<ListTopicPage />} />
        <Route path="topic/:id" element={<ListNotePage />} />

        <Route path="note/:id/create" element={<CreateNotePage />} />
        <Route path="note/:id" element={<DetailNotePage />} />

        <Route path="channels" element={<ListChannelPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
