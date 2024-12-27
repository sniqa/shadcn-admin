import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/main-layout";
import { lazy, Suspense } from "react";
import Loading from "./components/loading";
import Test from "@/pages/Test";

const LoginPage = lazy(() => import("@/pages/Login"));

const NetworkPage = lazy(() => import("@/pages/network"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "home", element: <></> },
      { path: "network", element: <NetworkPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
