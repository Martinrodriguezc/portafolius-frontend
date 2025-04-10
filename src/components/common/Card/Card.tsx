import React from "react";

interface CardProps {
  title: string;
  description: string;
  amount: number;
}

const Card: React.FC<CardProps> = ({ title, description, amount }) => {
  return (
    <div className="rounded-lg border bg-white shadow p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <h5 className="text-lg text-gray-400">{description}</h5>
      <p className="text-lg font-bold">{amount}</p>
    </div>
  );
};

export default Card;
