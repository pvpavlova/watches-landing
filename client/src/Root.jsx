import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';

export default function Root() {
  return (
    <>
   {/*    <Navbar /> */}
      <div>
        <Outlet />
      </div>
    </>
  );
}
