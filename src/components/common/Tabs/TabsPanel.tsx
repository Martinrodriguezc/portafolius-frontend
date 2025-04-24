import React from "react";
import { TabsContentProps } from "../../../types/Props/Tabs/TabsContentProps";

const TabsPanel: React.FC<TabsContentProps> = ({ value, children, selectedTab, className }) => {
  if (selectedTab !== value) return null;
  return <div className={className}>{children}</div>;
};

export default TabsPanel;
