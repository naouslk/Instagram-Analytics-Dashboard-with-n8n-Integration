import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#050505] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: "bg-brand-orange text-black hover:bg-[#ff9d42] hover:shadow-[0_0_30px_rgba(251,139,36,0.6)] active:bg-[#c05611] active:scale-[0.98] focus:ring-brand-orange disabled:hover:bg-brand-orange disabled:hover:shadow-none",
    secondary: "bg-brand-teal text-white hover:bg-[#135d70] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] active:bg-[#06242d] active:scale-[0.98] focus:ring-brand-teal disabled:hover:bg-brand-teal disabled:hover:shadow-none",
    outline: "border-2 border-brand-orange text-brand-orange hover:bg-brand-orange/10 hover:border-brand-burnt hover:text-brand-burnt active:bg-brand-orange/20 active:scale-[0.98] focus:ring-brand-orange disabled:hover:bg-transparent disabled:hover:border-brand-orange disabled:hover:text-brand-orange",
    ghost: "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 active:bg-gray-300 dark:active:bg-white/20 active:scale-[0.98] focus:ring-gray-500 disabled:hover:bg-transparent disabled:hover:text-gray-400"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
};