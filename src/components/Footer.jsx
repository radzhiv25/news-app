import { useDarkMode } from "./DarkModeContext"

const Footer = () => {
  const { darkMode } = useDarkMode()
  return (
    <div className='mt-auto p-5 text-gray-500 text-center'>
            <p>&copy; 2024 Aconews. All Rights Reserved.</p>
    </div>
  )
}

export default Footer