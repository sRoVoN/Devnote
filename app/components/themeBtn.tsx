import { useTheme } from "next-themes";
import { FaCloudMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";

export interface themeProps {
  handleToggle: () => void
}

export default function ThemeBtn({ handleToggle }: themeProps) {
    const {theme, setTheme}= useTheme();
  return (
    <>
      <button
        onClick={handleToggle}
        className="cursor-pointer hover:opacity-10"
      >
        {theme === "dark" ? (
          <FaCloudMoon size={30} color="yellow" />
        ) : (
          <IoIosSunny size={30} color="yellow" />
        )}
      </button>
    </>
  );
}
