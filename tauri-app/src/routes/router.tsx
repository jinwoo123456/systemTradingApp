import { createHashRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home.tsx";
import Users from "@/pages/Users.tsx";
import Settings from "@/pages/Settings.tsx";
import { paths } from "@/routes/paths";
import Auth from "@/pages/Auth";

function NotFound() {
  return (
    <main className="container">
      <h2>404 Not Found</h2>
      <p>요청한 페이지를 찾을 수 없습니다.</p>
    </main>
  );
}

function RouteError() {
  return (
    <main className="container">
      <h2>Something went wrong</h2>
      <p>잠시 후 다시 시도해 주세요.</p>
    </main>
  );
}

export const router = createHashRouter([
  {
    path: paths.root,
    element: <App />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: paths.users.slice(1), element: <Users /> },
      { path: paths.settings.slice(1), element: <Settings /> },
  { path: paths.login.slice(1), element: <Auth /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
