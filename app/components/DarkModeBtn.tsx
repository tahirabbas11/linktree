"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import useSound from "use-sound";
import { useSelector, useDispatch } from "@/lib/store"; // Import custom hooks
import { setDarkMode } from "@/lib/slices/themeSlice"; // Import action

const DarkModeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [play] = useSound("./sound/bubble-sound.mp3");
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    setMounted(true);
    if (theme === "system") {
      dispatch(setDarkMode(systemTheme === "dark"));
    } else {
      dispatch(setDarkMode(theme === "dark"));
    }
  }, [theme, systemTheme, dispatch]);

  if (!mounted) {
    return null;
  }

  function handlePlay() {
    play();
  }

  const handleThemeToggle = () => {
    handlePlay();
    if (isDarkMode) {
      setTheme("light");
      dispatch(setDarkMode(false));
    } else {
      setTheme("dark");
      dispatch(setDarkMode(true));
    }
  };

  return (
    <div>
      {isDarkMode ? (
        <SunIcon
          className="h-6 w-6 cursor-pointer text-yellow-400"
          onClick={handleThemeToggle}
        />
      ) : (
        <MoonIcon
          className="h-6 w-6 cursor-pointer text-slate-700"
          onClick={handleThemeToggle}
        />
      )}
    </div>
  );
};

export default DarkModeBtn;
