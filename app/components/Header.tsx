"use client";
import Cookies from "js-cookie";
import DarkModeBtn from "./DarkModeBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.set('accessToken', '', { expires: new Date(0) }); // Delete the accessToken cookie
    router.push('/'); // Refresh the current page to reflect the logout state
  };

  return (
    <header className="py-5 px-5 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-center flex justify-center items-center">
            <h1 className="text-4xl">LinkTree</h1>
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        <DarkModeBtn />

        <Link href="/login">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-4"
          >
            Login
          </button>
        </Link>

          {/* <button
            onClick={handleLogout}
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-4"
          >
            Logout
          </button> */}
      </div>
    </header>
  );
};

export default Header;

