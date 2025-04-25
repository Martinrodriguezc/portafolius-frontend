import React from "react";
import { TabsButtonProps } from "../../../types/Props/Tabs/component/TabsButtonProps";

const TabsButton: React.FC<TabsButtonProps> = ({
  value,
  children,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <button
      onClick={() => setSelectedTab && setSelectedTab(value)}
      className={`px-4 py-2 text-sm font-medium cursor-pointer ${
        selectedTab === value
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-500 hover:text-blue-600"
      }`}
    >
      {children}
    </button>
  );
};

export default TabsButton;
