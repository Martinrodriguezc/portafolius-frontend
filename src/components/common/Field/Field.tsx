import React from "react";

interface FieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function Field({ label, children, className = "" }: FieldProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-[13px] text-[#A0A0A0]">{label}</p>
      <p className="text-[16px] font-medium text-[#333333]">{children}</p>
    </div>
  );
}