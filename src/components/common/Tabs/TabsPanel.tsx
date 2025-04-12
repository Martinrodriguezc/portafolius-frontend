import React from "react";

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  selectedTab?: string; // Se inyecta desde el contenedor, por eso es opcional aquí
  className?: string;   // Prop opcional para clases de estilo
}

const TabsPanel: React.FC<TabsContentProps> = ({ value, children, selectedTab, className }) => {
  if (selectedTab !== value) return null;
  return <div className={className}>{children}</div>;
};

export default TabsPanel;
