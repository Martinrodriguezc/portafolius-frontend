import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  const baseClasses =
    "rounded-lg border border-gray-200 bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300";

  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;