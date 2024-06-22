'use client';
import Cookies from 'js-cookie';
import DarkModeBtn from './DarkModeBtn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from '@/lib/store'; // Import custom hooks
import { logoutSuccess } from '@/lib/slices/mainSlice'; // Import action
import { PiSignOutBold } from 'react-icons/pi';
import { clearUserDetails } from '@/lib/slices/userSlice'; // Import action to clear user details

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Access the login state

  const handleLogout = () => {
    Cookies.set('accessToken', '', { expires: new Date(0) }); // Delete the accessToken cookie
    dispatch(logoutSuccess(false));
    dispatch(clearUserDetails());
    router.push('/'); // Redirect to home
  };

  return (
    <header className="mt-3 py-6 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-center flex justify-center items-center">
            <h1 className="text-4xl">LinkTree</h1>
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        <DarkModeBtn />

        {!isLoggedIn ? (
          <Link href="/login">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-4 w-24" // Set a fixed width
            >
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-4 w-24" // Set a fixed width
          >
            Logout
          </button>
          //           <button
          //   onClick={handleLogout}
          //   type="button"
          //   className="bg-transparent text-green-500 hover:text-green-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-end"
          //   style={{ width: '100px' }}
          // >
          //   <PiSignOutBold className="w-6 h-6" />
          // </button>
        )}
      </div>
    </header>
  );
};

export default Header;
