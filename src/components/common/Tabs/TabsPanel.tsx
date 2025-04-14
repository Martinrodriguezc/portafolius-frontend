import React from "react";

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  selectedTab?: string;
  className?: string;
}

const TabsPanel: React.FC<TabsContentProps> = ({ value, children, selectedTab, className }) => {
  if (selectedTab !== value) return null;
  return <div className={className}>{children}</div>;
};

export default TabsPanel;
