import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const Button =
  (
    {
      children,
      href,
      to,
      type,
      onClick,
      disabled,
      inverse,
      danger,
      blue

    }
  ) => {

    // renders an anchor
    if (href) {
      return (
        <a
          className={`px-6 py-2 rounded-md  
          ${inverse && `  hover:bg-yellow-600 ${disabled ? 'bg-yellow-200 text-gray-400' : `bg-yellow-800 text-white`}`} 
          ${danger && ` hover:bg-red-600 ${disabled ? 'bg-red-200 text-red-700 hover:text-white' : `bg-red-800 text-white`}`}
          ${!inverse && !danger && (` hover:bg-gray-400 ${disabled ? ' text-gray-400 hover:text-white' : ` text-gray-900`}`)}
           ${blue && `  hover:bg-blue-600 ${disabled ? 'bg-blue-200 text-gray-800' : `bg-blue-800 text-white`}`} 


          `}
          href={href}
        >
          {children}
        </a>

      );
    }

    // renders a Link 
    // sample use - link to the edit page
    if (to) {
      return (
        <Link
          to={to}
          className={`px-6 py-2 rounded-md  
            ${inverse && `  hover:bg-yellow-600 ${disabled ? 'bg-yellow-200 text-gray-400' : `bg-yellow-800 text-white`}`} 
            ${danger && ` hover:bg-red-600 ${disabled ? 'bg-red-200 text-red-700 hover:text-white' : `bg-red-800 text-white`}`}
            ${!inverse && !danger && (` hover:bg-gray-400 ${disabled ? ' text-gray-400 hover:text-white' : ` text-gray-900`}`)}
           ${blue && `  hover:bg-blue-600 ${disabled ? 'bg-blue-200 text-gray-800' : `bg-blue-800 text-white`}`} 

            `}

        >
          {children}
        </Link>

      );
    }


    return (
      // renders a button
      <button
        className={`px-6 py-2 rounded-md  
           ${inverse && `  hover:bg-yellow-600 ${disabled ? 'bg-yellow-200 text-gray-400' : `bg-yellow-800 text-white`}`} 
           ${danger && ` hover:bg-red-600 ${disabled ? 'bg-red-300 text-red-700 hover:text-white' : `bg-red-800 text-white`}`}
           ${!inverse && !danger && (` hover:bg-gray-400 ${disabled ? ' text-gray-400 hover:text-white' : ` text-gray-900`}`)}
           ${blue && `  hover:bg-blue-600 ${disabled ? 'bg-blue-200 text-gray-800' : `bg-blue-800 text-white`}`} 


           `}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }