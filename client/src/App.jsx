import MainPage from "./pages/MainPage/MainPage";
import Root from "./Root";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
