import React from 'react'

interface ButtonProps{
    label:string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export const Button: React.FC<ButtonProps>= ({label, onClick}) => {
  return (
        <button onClick={onClick} className="   text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
            {label}
        </button>
  )
}
