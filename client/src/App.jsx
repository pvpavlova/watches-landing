import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage/AdminPage";
import MainPage from "./pages/MainPage/MainPage";
import Root from "./Root";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import axiosInstance, { setAccessToken } from "./services/axiosInstance";
import SigninPage from "./pages/SigninPage/SigninPage";

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    axiosInstance
      .get(`/token/refresh`)
      .then(async (res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      });
  }, []);

  const loginHandler = async (e, formData, navigate) => {
    e.preventDefault();
    const response = await axiosInstance.post(
      `/api/auth/signin`,
      formData
    );
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
    navigate('/admin');
  };
  const logoutHandler = async () => {
    await axiosInstance.get('/api/auth/logout');
    setUser(null);
    setAccessToken('');
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} setUser={setUser} logoutHandler={logoutHandler}/>,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/signin",
          element: <SigninPage user={user} loginHandler={loginHandler}/>,
        },
        {
          path: "/admin",
          element: <AdminPage user={user} setUser={setUser} logoutHandler={logoutHandler}/>,
        },
      ],
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
