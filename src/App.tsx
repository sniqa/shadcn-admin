import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/main-layout";
import { lazy, Suspense } from "react";
import Loading from "./components/loading";
import Test from "@/Test";

const LoginPage = lazy(() => import("@/feature/auth/login"));

const NetworkPage = lazy(() => import("@/feature/network/pages"));
const WorkOrderPage = lazy(() => import("@/feature/work-order/pages"));
const UserPage = lazy(() => import("@/feature/user/pages"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "home", element: <></> },
      { path: "network", element: <NetworkPage /> },
      {
        path: "order",
        element: <WorkOrderPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
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
