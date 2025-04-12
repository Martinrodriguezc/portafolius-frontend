import React from "react";

interface CardProps {
  title: string;
  description: string;
  amount: number;
}

const Card: React.FC<CardProps> = ({ title, description, amount }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="mt-4">
          <span className="block text-2xl font-bold text-blue-600">{amount}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
