import { useDarkMode } from "./DarkModeContext";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className="md:w-3/4 md:mx-auto mx-5 my-5 py-2 px-3 border border-dashed rounded-md flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="md:size-10 size-8 rounded-full bg-gradient-to-br from-gray-300 to-black animate-gradient"></div>
        <div className="">
          <h1 className="bg-gradient-to-br from-gray-300 dark:from-white via-black dark:via gray-500 bg-clip-text text-transparent md:text-2xl text-xl font-semibold leading-none">
            NewsX
          </h1>
          <p className="text-xs leading-none text-gray-500 dark:text-gray-200">news at one place</p>
        </div>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full"
      >
        {darkMode ? <FaRegSun className="text-white" /> : <FaRegMoon className="text-black" />}
      </button>
    </div>
  );
};

export default Navbar;