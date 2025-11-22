import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'glass';
  onClick?: () => void;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'glass', onClick, href }) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1";
  
  const variants = {
    primary: "bg-white text-indigo-900 hover:bg-indigo-50 shadow-lg hover:shadow-xl",
    glass: "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 hover:border-white/50"
  };

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
};

export default Button;