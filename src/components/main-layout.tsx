import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import Loading from "@/components/loading";
import CustomAvatar from "@/components/custom-avatar";

const MainLayout = () => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      {/* haader navigattion */}
      <header className="h-14 min-h-14 border-b w-full flex justify-between items-center px-4 bg-white dark:bg-slate-800">
        <div className="">Shadcn Admin</div>

        <nav className="flex items-center gap-2">
          <Link to={"/user"}>user</Link>
          <Link to={"/login"}>login</Link>
          <Link to={"/assets"}>assets</Link>
          <Link to={"/network"}>network</Link>
          <Link to={"/order"}>order</Link>
          <CustomAvatar />
        </nav>
      </header>

      {/* main content */}
      <main className="h-full w-full overflow-hidden">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
